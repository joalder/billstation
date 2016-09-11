# billstation
web based bill sharing app - also serves as an experimental playground


# Development - Getting started

- download Python 3.5+
- checkout this project
- create virtualenv: `py -m virtualenv venvBillstation` at the desired location
- activate virtualenv: `venvBillstation/Scripts/actvate`
- install python packages: `pip install -r requires.txt` at project root
- setup local DB: `python manage.py migrate`
- run local server: `python manage.py runserver localhost:8000`