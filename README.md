# BugTracker  




### Overview
The **WebApi** is a backend system, I developed using **ASP.Net Core**  in order to handles different requests such as get,post,put and delete methods.  
The **clientApp** is an **Angular** project that consumes the requests from our web api project.  
_____
### Requirements
- .Net Core 5  
- SQL Server  
- Node.js  v14.18.1  
- Angular CLI: 12.2.9

---
### Setup
- clone this project  
- Navigate to the webapi folder path :
````
cd .\WebApi\
````


#### do the following:   

````
dotnet restore 
````
````
dotnet build
````
````
dotnet ef database update
````
````
dotnet run 
````

- Navigate to the clientApp folder path :  
````
  cd .\clientApp\ 
````
  
#### do the following:  
````
npm install 
````
````
npm start 
````
open your browser to 
````
http://localhost:4200/
````
  
#### admin credentials :
> username : admin  
> password : admin


### Demo Video 
[link](https://www.loom.com/share/014b730c53ab43f7b1d1468dbf349ab6)