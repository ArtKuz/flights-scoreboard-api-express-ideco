API для табло рейсов в аэропорту на основе ExpressJs и MongoDB
==============================================================

##Установка
```bash
npm i -g gulp
npm i
```

###Как развернуть БД с тестовыми данными
Через **Tertminal** заходим в корень проекта.  
```bash
mongo
load('./migrations/init.js')
quit()
```

###Запуск проекта
```bash
gulp
```
или
```bash
node app.js
```

###Запуск тестов
```bash
gulp test
```

###Документация к API
При запуске через `gulp` доступна по адресу:  
[http://localhost:8000/api-docs/#/Flights](http://localhost:8000/api-docs/#/Flights)  

