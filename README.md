## Bug Tracker  

### Overview
[The WebApi](https://github.com/ahmed-git-tn/BugTracker/tree/main/WebApi)  is a backend system, I developed using **ASP.Net Core**  in order to handles different requests   
such as get,post,put and delete methods. It uses **Entity Framework Core** to communicate with the database.  
[The clientApp](https://github.com/ahmed-git-tn/BugTracker/tree/main/clientApp) is an **Angular** project that consumes the requests from my web api project.  
#
### Requirements
- [.Net Core 5](https://dotnet.microsoft.com/download/dotnet/5.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads?rtc=1)  
- [Node.js  v14.18.1](https://nodejs.org/en/download/)
- [Angular CLI: 12.2.9](https://angular.io/guide/setup-local#install-the-angular-cli)

#
### Setup
##### clone this project.  
````
git clone https://github.com/ahmed-git-tn/BugTracker.git
````
##### navigate to the webapi folder path:
````
cd .\WebApi\
````


##### restore the project dependencies:
````
dotnet restore 
````  
##### build the project:
````
dotnet build
````  
##### create your database: 
````
dotnet ef database update
````
##### run the application:
````
dotnet run 
````

##### navigate to the clientApp folder path:  
````
  cd .\clientApp\ 
````
  
#### install the dependencies: 
````
npm install 
````  
#### run the application:
````
npm start 
```` 
#### open your browser to:
````
http://localhost:4200/
````
  
#### admin credentials:

##### username:  
````
admin  
````
##### password:
````
admin 
````

#

### Demo Video 

https://user-images.githubusercontent.com/82724393/144414489-6078dee2-bc0c-4c8b-9051-19045fea1fdc.mp4
