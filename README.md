# Anti-Social Media Platform

## Overview:

How do we break into the over-saturated market of social media platforms? :thinking: Simple. Appeal to the one demographic overlooked by the very nature of social media: **the anti-social**. :sunglasses: What if there existed a platform where people could show off how anti-social they really are? Competitive video games are a prime example where the urge to compete overtakes one's anti-social nature. Therefore, by allowing people to display their anti-social habits like TV hours watched or singleplayer video games completed, we can gain access to a previously untapped market.

This project uses ReactJS as the front-end with Axios for REST requests and Material UI for premade components. The back-end consists of Spring Boot alongside a MySQL database to store user info. :grinning:

## Data:

The datasets used are below. Any data cleaning can be found under data/data_cleaning.py.

[TV Shows](https://www.kaggle.com/datasets/jackjaehwankim/top-100-tv-shows)

[Movies](https://gist.github.com/stungeye/a3af50385215b758637e73eaacac93a3)

[Video Games](https://corgis-edu.github.io/corgis/csv/video_games/)

## Try it out!

If you want to try it for yourself, you can download this repository.

### Database:

To start the MySQL database, just make sure you have Docker installed and run the following commands:

    docker run --name=anti_social_container -d -p 13306:3306 colebusa/anti_social_repository:anti_social_image

    docker exec -it anti_social_container bash

    mysql -uroot -p

Then enter the password: "Password".

Next create the database from the following commands:

    CREATE DATABASE anti_social_database;

    USE anti_social_database;

    SOURCE /anti_social_database.sql;

Now the database is up and running on port 13306.

### Spring Boot:

To start the Spring Boot application, navigate to the anti-social-media-spring folder and run

    ./mvnw spring-boot:run

### React:

To start the React application, navigate to the anti-social-media-react folder and run

    npm start



TODO: Update the total anti-social score. Add login authentication to the login page.