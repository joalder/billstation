#!/bin/sh

cd frontend
npm install --production
ng build --target=production --aot

cd ..
python manage.py migrate
python manage.py collectstatic
