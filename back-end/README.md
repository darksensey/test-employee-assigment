
```bash
$ npm install
$ docker-compose up -d
$ npm typeorm:migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

## Description
The backend application is running on port 3000
The database is running on port 5432

In the AppService I created a db seeder for test needs. 
So when you run the app it will create some data in the database.

Here you can see a polimorphic relation between the entities assigment, employee and contractors.
I did all related to Employee and assigment according to the task but some place I ignored contractors

TypeORM does not support polimorphic relations so I found a way to implement it.
For that needs I add one more field to the Contractor and Employee entities called connectableType 
to be able to join relations rom typeorm entities.
I left some comments in the code to explain what I did and why.

I attached the postman collection to test the api.
Please keep in mind that BeforeUpdate hook when I recalculate totals works only if you provide a new value
in case you update twice the same value it will not recalculate totals.

You can find the sql migration file in the src/migrations/scripts folder

In case you have some questions please contact me.
## License

Nest is [MIT licensed](LICENSE).
