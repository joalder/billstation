# billstation
web based bill sharing app - also serves as an experimental playground

currently uses Django 1.11 + Angular 5

## Development

### Getting started
- download Python 3.5+
- download node (6+) + npm (3+)
- checkout this project
- install virtualenv: `pip install virtualenv`
- create virtualenv: `py -m virtualenv venvBillstation` in your local vEnv-folder
- activate virtualenv: `venvBillstation\Scripts\activate.bat`
- install python packages: `pip install -r requirements.txt` at project root
- download JS dependencies: `cd frontend` & `npm install`
- install angular cli globally to enable the ng command `npm install -g @angluar/cli`
- setup local DB: `python manage.py migrate` at project root

Run on CLI
- run local server: `python manage.py runserver`
- run local server: `cd frontend && ng build -w`

or alternatively shared run configs in the `.idea` folder

Project should now be available under [http://localhost:8000](http://localhost:8000) and be rebuilt continously