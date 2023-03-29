# Developing Microservices with .NET 6

## Web Development

- MVC template supported by visual studio - Model View Controller
- UI in the mvc can be treated as microservice and can be deployed
![ASP.NET MVC Template](docs/2023-03-29%2010_01_17-WebDevelopment%20-%20Microsoft%20Visual%20Studio.png)  

- Use app.setting for configuration
- application handler
- http based handler
- ASP.NET web api template to create api's

### WCF Vs WebAPI
- WCF is used for developing soap based services whereas web api is used for both soap-based and restful services
- WCF doesn't not offer any for mvc feature, where web api supports mvc features
- WCF supports http, udp and custom transport protocol whereas web api supports only http protocol

## Monolithic applications
- UI, Application Logic, Data Access, database
- scaling data layer
- updating application logic require updating entire database
- not possible to have different database
- deployed to single server
- not possible to update independently
- all the services are tightly coupled.
- easier to build, debug, fewer moving parts
- tightly coupled, difficult to change


## Microservices

`Microservices` are an architectural approach to building applications where each core function, or service, is built and deployed independently. Microservice architecture is distributed and loosely coupled, so one component’s failure won’t break the whole app. Independent components work together and communicate with well-defined API contracts. Build microservice applications to meet rapidly changing business needs and bring new functionalities to market faster.

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

1. [Microservice Architecture Reference](https://learn.microsoft.com/en-us/azure/architecture/microservices/)
1. [Microservices on Azure](https://azure.microsoft.com/en-us/solutions/microservice-applications/#solution-architectures)

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
   - Microsoft.EntityFrameworkCore.Tools - sql database migration
   - use EF in-memory database for testing [Ef Core With InMemory Database](https://www.infoworld.com/article/3672154/how-to-use-ef-core-as-an-in-memory-database-in-asp-net-core-6.html)

![Entity Framework Core db support](docs/2023-03-28%2014_47_48-CarDrivenApp%20-%20Microsoft%20Visual%20Studio.png)

- SQL Database Connection String
  
  ```cs
  Server =(localdb)\MSSQLLocalDB;database=vehiclesdb;
  optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;database=vehiclesdb;");
  ```
 ## adding migration

 ```cs
 add-migration initialcreate
 update-database
 ```
