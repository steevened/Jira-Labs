# Next js Jira Labs App

To run on localhost, you need the database

```
docker-compose up -d
```

- -d means _detached_

- MongoDB Local Url:

```
mongodb://localhost:27017/entriesdb
```

###Configure env variables

Rename the file **.env.example** to **.env**

###Fill the database with test data

```
Fetch http://localhost:3000/api/seed
```
