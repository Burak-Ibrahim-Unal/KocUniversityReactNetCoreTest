# Koc University Test Web App Codes 2023 Edition

## Table of contents
* [General info](#general-info)
* [Main Technologies](#main-technologies)
* [Backend Technologies](#backend-packages)
* [FrontEnd Technologies](#frontend-packages)
* [Setup and Usage](#setup)
* [Notes](#notes)

## General Info
This project is made with Net Core and Angular.
	
## Main Technologies
Project is created with: (Net Core 6 CQRS Architecture- React 17 Redux Hook)
* React Typescript 17.0.2
* Net Core: 6.0.12
* Nodejs : 16.18.x
* Docker Desktop 4.13.1
* Posgtresql 14
* Visual Studio 2022 - Net SDK6.0

## Backend Packages
Project is created with: (Net Core 6 CQRS Architecture- React 17 Redux Hook)
* Microsoft.AspNetCore.Identity.EntityFrameworkCore 6.0.12
* Microsoft.AspNetCore.Authentication.JwtBearer 6.0.12
* Microsoft.AspNetCore.Mvc.Core 2.2.5
* Microsoft.EntityFrameworkCore.Design 6.0.12
* Microsoft.Extensions.Caching.Abstractions 6.0.0
* Microsoft.Extensions.Configuration.Binder 6.0.0
* Npgsql.EntityFrameworkCore.PostgreSQL 6.0.0
* Newtonsoft.Json: 13.0.2
* Automapper: 12.0.0
* Fluent Validation: 11.4.0
* MediatR : 16.18.x
* Serilog : 2.12.0

## FrontEnd Packages
Project is created with: (Net Core 6 CQRS Architecture- React 17 Redux Hook)
* "@devexpress/dx-react-core": "^3.0.4",
* "@devexpress/dx-react-grid": "^3.0.4",
* "@devexpress/dx-react-grid-export": "^3.0.4",
* "@devexpress/dx-react-grid-material-ui": "^3.0.4",
* "@emotion/react": "^11.10.5",
* "@emotion/styled": "^11.10.5",
* "@fontsource/roboto": "^4.5.8",
* "@hookform/resolvers": "^2.9.10",
* "@mui/icons-material": "^5.10.16",
* "@mui/lab": "^5.0.0-alpha.109",
* "@mui/material": "^5.10.17",
* "@mui/styled-engine-sc": "^5.10.16",
* "@reduxjs/toolkit": "^1.9.0",
* "@testing-library/jest-dom": "^5.16.5",
* "@testing-library/react": "^12.1.5",
* "@testing-library/user-event": "^13.5.0",
* "@types/file-saver": "^2.0.5",
* "@types/history": "^4.7.11",
* "@types/jest": "^27.5.2",
* "@types/node": "^16.18.6",
* "@types/react": "^17.0.39",
* "@types/react-dom": "^17.0.11",
* "@types/react-router-dom": "^5.3.3",
* "@types/react-slick": "^0.23.10",
* "axios": "^1.1.3",
* "file-saver": "^2.0.5",
* "history": "^4.10.1",
* "react": "^17.0.2",
* "react-dom": "^17.0.2",
* "react-hook-form": "^7.39.5",
* "react-redux": "^8.0.5",
* "react-router-dom": "^5.3.3",
* "react-scripts": "5.0.0",
* "react-slick": "^0.29.0",
* "react-toastify": "^9.1.1",
* "redux": "^4.2.0",
* "slick-carousel": "^1.8.1",
* "styled-components": "^5.3.6",
* "typescript": "^4.9.3",
* "web-vitals": "^2.1.4",
* "yup": "^0.32.11"
	
## Setup 
To run this project's,firstly install Docker Desktop,open cmd and run this command for Postgresql

```
$ docker run --name dev -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest
```

Optional: Frontend build files implemented into wwwroot folder in Backend... After start backend with Visual Studio,just connect http://localhost:5207/ 
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

## Notes
* 1-  When you run software,you will not see any data.When you logged in, request will be sent. Only admin user can see admin menu and all users can see data. And dont forget to run Docker Desktop
```
#Admin Login
{
  "username": "Burak",
  "password": "Burak1234!"
}


#User Login
{
  "username": "testuser",
  "password": "Burak1234!"
}
```
* 2- If you don't login,you cant see any data.Data are not anonymous.