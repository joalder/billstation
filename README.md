# billstation
web based bill sharing app - also serves as an experimental playground

currently uses Django 1.10 + Angular 2

# Development - Getting started

- download Python 3.5+
- download node (6+) + npm (3+)
- checkout this project
- create virtualenv: `py -m virtualenv venvBillstation` at the desired location
- activate virtualenv: `venvBillstation/Scripts/actvate`
- install python packages: `pip install -r requires.txt` at project root
- download JS dependencies: `cd station/static; npm install`'
- setup local DB: `python manage.py migrate`
- run local server: `python manage.py runserver localhost:8000`