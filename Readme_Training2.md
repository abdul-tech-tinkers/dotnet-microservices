- [Monolithic](#monolithic)
- [SOA](#soa)
- [Microservices](#microservices)
    - [NetStar](#netstar)
    - [Messages](#messages)

# Monolithic
**Disadvantages/Challenges**
- size of the application can also affect the deployment 
- cannot scale independently
- cannot be technology agnostic
- fixing and deployment need to be done all at one
- independent module cannot scale 
- cannot store structured and unstructured data
- unstructured - each product can have its own data structure phone, washing machine etc.
- polyglot persistance is difficult, support for different type of storage is difficult
- adding support to `containerization` is difficult / not suitable
- used before 2000

# SOA
- WCF for SOA
- 2000 to 2010 - SOA
- functional module as independent services
- individual services like basket module, product module,
- communicate each other with ESB - Enterprise Service Bus including presentation layer
- use one or more database but they are shared
- can add or scale module independently
- can fix and redeploy if we have any issue with any module . e.g. payment module
- can use different language for different module.

# Microservices

Simplified version of SOA

A method of developing software systems
that tries to focus on building single function
modules with well defined interfaces and
operations.

Each service has its own database.

Services communicates each other using a
well defined communication
protocol/channel.

Better support for integrating with cloud
services

Uses API Gateway(Optional) to connect to individual service

Each service can talk to each other

Every module is deployed as independently service

Application size is smaller

cross communication between database is not required

Easy to deploy test, developed and can use any language

can use different database - polyglot persistance 

very complex in-terms of communication between service

![](docs/download.png)

### NetStar
- Customer Plans Management
- Movies Management
- User Management
  - register with email and gets a confirmation
  - on register send a message to queue
- Email Sender - serverless service azure function or aws lambda used for background job

### Messages
- HTTP Based 
  -  Request/Response Pattern 
  -  sync by default
  -  one to one communication
  -  always response is expected
  -  near real time communication
- Message Based
   - fallows publish/subscribe pattern
   - Queue is a message broker services - store and forward service
   - asynchronous
   - one to many pattern
   - Queue - one to one
   - Topic - one to many - e.g WhatsAppGroup
   - no guarantee for real time processing of the request
   - not a real time communication
- Event Driven
   - for real time communication like OTP generation that needs to be done - time limit
   - event publisher and subscriber
   - use EventBroker - e.g. EventGrid or Event Hub
   - not using the store and forward mechanism
   - async and no response
   - near real time
   - support one to many

| HTTP | Message | Event Driven|
|------|---------|-------------|
|sync  | async    | async      |
|1-1  | 1-many    | 1-many      |
|near realtime  | not realtime    | near realtime      |
|request-response  | pub-sub    | pub-sub      |
|storage  | store and forward    | no storage      |



