# ELEMES - Back End Test

## Local Installation

- Create a new `.env` file on the root folder
- Copy the content of the `.env.example` to the `.env`
- After configuring the environment variables, run `npm install`
- Run `npx sequelize-cli db:migrate` to migrate the database, then run `npx sequelize-cli db:seed:all` to run the seeder
- Run `npm run dev` to start using the application
- By default, a user with administrator privilege is created when the seeder is run. The email is `admin@mail.com` and the password is `password`
