# EShop

## Description

Mern Ecommerce App for selling Electronics

### Backend

Backend Rest Api is powered by

- ExpressJS for restful Api
- MongodDB used as Database
- Mongoose used as ORM
- joi for validation
- Redis for Caching Users Orders
- Cypress for End-to-End Testing
- Jest as Test Runner

### Frontend

Frontend SPA is build using

- React (SPA)
- Redux (State Managment)
- Reat-Router-Dom (Routing)
- React-Testing-Library for Testing

## Functionalities

1. User can Register/Login as both regular or admin users
2. Admin users can manage other User(Delete,assign admin role to other users)
3. Admin Users can create/delete/update Products
4. Admin Users can mark Orders as Paid/Delivered
5. Users can orders products using both COD or PAYPAL

# How to Start Application

1. cd ./EShop && npm install
2. cd ./frontend && yarn
3. define your development.json file as inside config directory Example(production.json)
4. run npm run dev inside of root Directory(EShop)
