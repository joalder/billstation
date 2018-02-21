import {Component, OnDestroy, OnInit} from '@angular/core';
import {Debt} from "../debt.service";
import {HttpClient} from "@angular/common/http";
import {Bill} from "../bill.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent implements OnInit {

  // private recentActivities:any[] = [];
  private billUrl: string = "api/bills/";
  private bills:Bill[] = [];
  private loading:boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.initData();
  }

  //fetch bills
  initData () {
    this.loading = true;
    this.http.get<Bill[]>(this.billUrl)
      .subscribe((bills) =>{
        this.bills = bills;
        this.loading = false;
      })
  }

}
