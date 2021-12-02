## Bug Tracker  

### Overview
The **WebApi** is a backend system, I developed using **ASP.Net Core**  in order to handles different requests such as get,post,put and delete methods.  
The **clientApp** is an **Angular** project that consumes the requests from my web api project.  
#
### Requirements
- .Net Core 5  
- SQL Server  
- Node.js  v14.18.1  
- Angular CLI: 12.2.9

#
### Setup
#### clone this project.  
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
