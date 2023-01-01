# Friendship Web App Codes 2022 Edition

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is made with Net Core and Angular.
	
## Technologies
Project is created with: (Net Core 6 CQRS Architecture- React 17)
* React Typescript 17.0.2
* Net Core: 6.0.12
* Nodejs : 16.18.x
* Docker Desktop 4.13.1
* Posgtresql 14
* Visual Studio 2022 - Net SDK6.0
	
## Setup 
To run this project's,first create your free Cloudinary account from [here](https://cloudinary.com/console/c-409de846ac7abee975808cc197afe7/)
Than add your informations in appsettings.json file:

```
  "CloudinarySettings": {
    "CloudName": "xxxxx",
    "ApiKey" : "xxxxx",
    "ApiSecret" : "xxxxx"
  },
```

After installing Docker Desktop run this command for Postgresql

```
docker run --name dev -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest
```

Frontend build files implemented into wwwroot folder in Backend... After start backend with Visual Studio,just connect http://localhost:5207/ 
(or To run this project's frontend side, install it locally using:)

```
$ cd client
$ npm install (or npm i)
$ npm start
```

If you use Visual Studio Code, (run this project's backend side) firstly install dotnet sdk 6 and than open Api folder with your ide's terminal:
Postgresql Database will be create and insert student and course records automaticaly...
```
$ cd ~\KocUniversityReactNetCoreTest\server\KocUniversityDemo\src\KUSYSDemo\API
$ dotnet run

```

Addionally you can add Course Match records with sql file which is placed root folder.You can use any open source db view tool like Dbviewer (Coursematches__Records.sql)
```
$ INSERT INTO public."Coursematches" ("StudentId","CourseId") VALUES
	 (1,1),
	 (1,2),
	 (1,3),
	 (1,4),
	 (2,4),
	 (2,3),
	 (2,2),
	 (3,1),
	 (3,3),
	 (4,2),
	 (4,1),
	 (5,1),
	 (5,2),
	 (5,4),
	 (6,3),
	 (6,2),
	 (4,3);
```