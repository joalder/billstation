from decimal import Decimal
from django.test import TestCase

# Create your tests here.
from station.models import Dude, Bill, Payment, TWOPLACES


class BillAndPaymentTests(TestCase):
    def setUp(self):
        self.dude_one = Dude.objects.create(name="Test Dude")
        self.dude_two = Dude.objects.create(name="Happo One")
        self.dude_three = Dude.objects.create(name="Another Guy")
        self.bill_even = Bill.objects.create(description="Migros", amount=12.22, owner=self.dude_one)
        self.bill_even.affected_dudes = [self.dude_one, self.dude_two]
        self.bill_even.save()

        self.bill_odd = Bill.objects.create(description="Coop", amount=27.20, owner=self.dude_two, )
        self.bill_odd.affected_dudes = [self.dude_one, self.dude_two, self.dude_three]
        self.bill_odd.save()

    def test_bill_basic_split(self):
        self.assertEqual(self.bill_even.total_remaining(), Decimal(self.bill_even.amount / 2).quantize(TWOPLACES))
        self.assertEqual(self.bill_even.remaining(self.dude_one), Decimal(0))
        self.assertEqual(self.bill_even.remaining(self.dude_two),
                         Decimal(self.bill_even.amount / 2).quantize(TWOPLACES))
        self.assertFalse(self.bill_even.is_paid())

        Payment.objects.create(bill=self.bill_even, by=self.dude_two, amount=self.bill_even.remaining(self.dude_two))

        self.assertEqual(self.bill_even.total_remaining(), Decimal(0))
        self.assertEqual(self.bill_even.remaining(self.dude_one), Decimal(0))
        self.assertEqual(self.bill_even.remaining(self.dude_two), Decimal(0))
        self.assertTrue(self.bill_even.is_paid())

    def test_bill_three_way_split(self):
        self.assertEqual(self.bill_odd.total_remaining(),
                         (Decimal(self.bill_odd.amount) - Decimal(self.bill_odd.amount / 3)).quantize(TWOPLACES))
        self.assertEqual(self.bill_odd.remaining(self.dude_two), Decimal(0))
        self.assertEqual(self.bill_odd.remaining(self.dude_one), Decimal(self.bill_odd.amount / 3).quantize(TWOPLACES))
        self.assertEqual(self.bill_odd.remaining(self.dude_three),
                         Decimal(self.bill_odd.amount / 3).quantize(TWOPLACES))
        self.assertFalse(self.bill_odd.is_paid())

        Payment.objects.create(bill=self.bill_odd, by=self.dude_one, amount=self.bill_odd.remaining(self.dude_one))
        self.assertAlmostEqual(self.bill_odd.total_remaining(), Decimal(self.bill_odd.amount / 3).quantize(TWOPLACES),
                               places=1)
        self.assertEqual(self.bill_odd.remaining(self.dude_one), Decimal(0))
        self.assertEqual(self.bill_odd.remaining(self.dude_two), Decimal(0))
        self.assertFalse(self.bill_odd.is_paid())

        Payment.objects.create(bill=self.bill_odd, by=self.dude_three, amount=self.bill_odd.remaining(self.dude_three))
        self.assertAlmostEqual(self.bill_odd.total_remaining(), Decimal(0), places=1)
        self.assertEqual(self.bill_odd.remaining(self.dude_one), Decimal(0))
        self.assertEqual(self.bill_odd.remaining(self.dude_two), Decimal(0))
        self.assertEqual(self.bill_odd.remaining(self.dude_three), Decimal(0))
        self.assertTrue(self.bill_odd.is_paid())
