
- [Laboratory Inventory Management for Reagents and Consumables](#laboratory-inventory-management-for-reagents-and-consumables)
  - [Requirement Analysis and Design](#requirement-analysis-and-design)
    - [Key Features](#key-features)
    - [Products](#products)
    - [Inventory Management](#inventory-management)
    - [Cart Management](#cart-management)
    - [UserManagement](#usermanagement)
  - [Pending items](#pending-items)
    - [docker commands](#docker-commands)
    - [Reference](#reference)

# Laboratory Inventory Management for Reagents and Consumables
## Requirement Analysis and Design

### Key Features
1. A catalog of qualified reagent and consumable products to be used in the laboratory.
2. Tracking of inventory usage through ‘Check-in’ and ‘Check-out’ of product items.
3. Provide insights into inventory usage through various reports and dashboards.
4. Track Inventory needs with a cart - cache database

### Products
  - Two categories of products, consumable and reagents, can be differentiated by `productcategory` in database
  - Each product has a unique id i.e. GTIN - Global Trade Item Number
  - Other properties include Name, Material Number, Vendor, Description, Unit Of Measure
  - Operations Performed on the product include
    - Registration of product - add product to product database.
    - DeRegister product - de register product from the product catalog, the de register should not remove the product from catalog, 
    - mark the product as active or inactive based on registration or De registration 
    - deregister should also mark the product item as checked out and no more available for usage.  = PENDING
  - Include a service api to support CRUD operation for products **ProductsAPI**
    - Create a product
    - Get Active Products
    - Get By Id
    - Get All - include active and inactive
    - deregister product - update product 
### Inventory Management
  - Keeps track of product items in the lab
  - product item life start when we receive it from vendor and `loads into system` i.e check-in of product item
    - can we check-in a product item whose product is already de register in the system
    - check if the product exist and then check-in the product into inventory.
  - product item can be checked out from the system with various reasons  
    - consumption
    - expiry
    - lost and not found
    - leakage
  - monitor inventory levels in the system with report and dashboard
    - daily inventory status
    - expiring today or in next few days
    - expiring in current week

### Cart Management
  - Keep track of the product items that need to be refilled in the system soon.
  - maintains the list of product items in the cart that need to be acquired and filled into the system
  - support CRUD operation on Cart item
  - support Add, Update, Delete, Get by id, Get All, Clear All cart items, Add All to cart
  - Cart Item
    - Product Id 
    - quantity 
    - Product name
    - vendor name 
  - since the cart items are managed on need basis, a simple cache storage like redis can help to have items cached
  
### UserManagement
  - operator login and logout support 
  - support token based authentication
  - GET, Post, PUT and Delete operations of product and product item needs to be authorized with a token
  - support with simenesinternal - G0 and labmanager user
  - SiemensInternal(G0 user type)has privilege to add product and product items
  - LabManager(G1 user type) can manage product items
  - both has access to view products and product items
  - login with name and password
  - stored in a sql server
  - both has access to manage CART

  ![](design.png)

## Pending items

- seed data and add-migration in program.cs
- deregister a product should checkout automatically with a queue 
- login and logout with various tokens G0, G1
- create ocelot service for api gateway
- create docker for each api
- create docker for sql
- deploy on docker and test on postman

### docker commands

  ```docker
  docker pull redis
  docker run -d -p 6379:6379 redis
  ```


  ### Reference
  - [Using Redis with ASP.NET Core, and Docker Container for Basket Microservices](https://medium.com/aspnetrun/using-redis-with-asp-net-core-and-docker-container-for-basket-microservices-715ff739186e)
  - [Connect to a Redis container hosted in Docker from a .NET Core application](https://jeremylindsayni.wordpress.com/2016/11/24/connect-to-a-redis-container-hosted-in-docker-from-a-net-core-application/)
  - [Multiple Authentication Scheme](https://medium.com/@lucas.rafael.araujo/asp-net-core-3-1-multiple-authentication-schemes-with-jwt-c860d673a71f)
  - [Adding JWT Authentication & Authorization in ASP.NET Core](https://youtu.be/mgeuh8k3I4g)
  - [Using Redis with ASP.NET Core, and Docker Container for Basket Microservices](https://medium.com/aspnetrun/using-redis-with-asp-net-core-and-docker-container-for-basket-microservices-715ff739186e)


