# OSPS-BE
## Current Development map

## User Stories
As a user, I want to:
1. Create a new receipt so that I can record an expense that I paid and who it should be split with
2. View all my receipts so I can see my expenses
3. View a single receipt details so I can see what was purchased
4. Update a receipt I created
5. Delete a receipt
6. View my balance summary to see how much I owe and others owe me

## Auth Routes
POST /auth/signup
POST /auth/signin

## Receipt Routes
POST /receipts | Create new receipt
GET /receipts | Get all my receipts
GET /receipts/:id | Get a single receipt
PUT /receipts/:id | Update receipt
DELETE /receipts/:id | Delete Receipt
GET /receipt/balance | Get balance summary