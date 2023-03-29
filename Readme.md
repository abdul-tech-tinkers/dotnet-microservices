# Monolithic applications
- UI, Application Logic, Data Access, database
- scaling data layer
- updating application logic require updating entire database
- not possible to have different database
- deployed to single server
- not possible to update independently
- all the services are tightly coupled.
- easier to build, debug, fewer moving parts
- tightly coupled, difficult to change


# Microservices
- architecture pattern for building application
- should work with other m.service to achieve the goal of the application
- can talk to other services
- has a isolated process, with memory and processing capabilities with it, for e.g. docker container
- has independent database.
- complex and Robust, technology agnostic - doe-snt matter what tech stack is used by client
- cloud native with containerization.
- microservices are api's at the end of the day! - hosted on the web. 
- docker - orchestrators to run the microservice - take care of the container complexity

### Benefits
- own database 
- can be independently developed and updated and deployed.
- can be in different technology. (java, c# or python etc.)
- broken into small tiny independent services i.e. api's
- client can be anything mobile, desktop or web.
- communicate to each other using some inter microservice communication - share data b/w microservices not database.
- evolve independently
- scale independently
- development cycle become faster - release to market
- isolated and more tolerant of failure
- single service that fails will not bring down the entire application
- testing become more coherent and consistent
- can be accessed using single api gateway.
- 70% of the application code is in api's
- front end with Angular or React - technology agnostic
  
![Microservice](docs/microservices-logical.png)  

[Microservice Architecture Reference](https://learn.microsoft.com/en-us/azure/architecture/microservices/)

### API Gateway
- authenticate users at gateway level
- routing api calls to microservices
- caching support - with time to leave capability
- change request and response type
- keep track of api's being called
- monetize the calls


Steps
- Create a blank solution
- Create webapi 

  ```cs
  dotnet new webapi -n CustomerAPI
  ```

  or Add ASP.NET Core web API project
   - VehicleAPI
   - CustomerAPI
   - ReservationAPI
 - Include entity framework nuget packages for each project
   - Microsoft.EntityFrameworkCore - core
   - Microsoft.EntityFrameworkCore.SqlServer - sql server connection
   - Microsoft.EntityFrameworkCore.Tools - sql database migrtion

![Entity Framework Core db support](docs/2023-03-28%2014_47_48-CarDrivenApp%20-%20Microsoft%20Visual%20Studio.png)

- SQL Database Connection String
  
  ```cs
  Server =(localdb)\MSSQLLocalDB;database=vehiclesdb;
  optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;database=vehiclesdb;");
  ```
 ### adding migration

 ```cs
 add-migration intiailcreate
 update-database
 ```
