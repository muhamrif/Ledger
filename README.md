
<div align="center">

# Ledger App
The Ledger App is a Fullstack application built with SpringBoot (Backend) and React.js (Frontend), for managing personal transactions, providing features for tracking income, expenses, and generating financial awareness.
The App is designed to help users manage their finances effectively. It provides a user-friendly interface to add, edit, and delete transactions, as well as view summarized reports of their financial activities.

</div>


## High Level Design
![highlevelcodebreakdown.png](graphics%2Fhighlevelcodebreakdown.png)

## Technologies Used
<div align="center">

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Spring Boot](https://img.shields.io/badge/springboot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![react-router](https://img.shields.io/badge/reactrouter-%2361DAFB.svg?style=for-the-badge&logo=reactrouter&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Postman](https://img.shields.io/badge/postman-%23F24E1E.svg?style=for-the-badge&logo=postman&logoColor=white)
![Maven](https://img.shields.io/badge/maven-%23F24E1E.svg?style=for-the-badge&logo=maven&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23F24E1E.svg?style=for-the-badge&logo=markdown&logoColor=white)
![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)
![Pluralsight](https://img.shields.io/badge/Pluralsight-EE3057?style=for-the-badge&logo=pluralsight&logoColor=white)
</div>

## Features

- Add, edit, and delete transactions
- Categorize transactions (income, expenses, etc.)
- Sort the transactions by date, category, and amount
- Filter transactions by date
- Responsive design for optimal use on various devices

## API Endpoints
| HTTP Method | Endpoint | Description | Body        |
| ----------- | -------- | ----------- |-------------|
| GET | /transactions | Get all transactions | None        |
| GET | /transactions/{id} | Get transaction by id | None        |
| POST | /transactions | Add a new transaction | Transaction |
| PUT | /transactions/{id} | Update transaction by id | Transaction |
| DELETE | /transactions/{id} | Delete transaction by id | None        |
| POST | /login | Login user | LoginDto        |
| POST | /register | Register user | RegisterUserDto        |
| GET | /profile | Get user profile | None        |
| PUT | /profile | Update user profile | Profile     |


## Screenshots
#### Ledger page
![Transactions.png](graphics%2FTransactions.png)
#### Add Transaction page
![Add Transaction.png](graphics%2FAdd%20Transaction.png)
#### Update Transaction page
![Update Transaction.png](graphics%2FUpdate%20Transaction.png)
#### Login page
![login.png](graphics%2Flogin.png)

## Installation

Follow these steps to install and run the Backend part of the Ledger App locally:

```bash
# Clone the repository
git clone https://github.com/your-username/ledger-app.git

# Seed the database
run the databaseSchema.sql file in MySQL Workbench

# Navigate to the project directory
cd LedgerServer/src/main/java/com/accounting/ledger/LedgerApplication.java

# Run the application (Server will start on port 8080)
Java -jar LedgerApplication.java
```


Follow these steps to install and run the Frontend part of the Ledger App locally:

```bash
# Clone the repository
git clone https://github.com/your-username/ledger-app.git

# Navigate to the project directory
cd LedgerClientFrontend
cd ledger-app

# Install dependencies
npm install

# Start the development server
npm start
```

## Contributing Team Members
- [@muhmarif](https://www.github.com/muhamrif)
- [@JalesiaGriffin](https://www.github.com/JalesiaGriffin)
- [@swilson813](https://www.github.com/swilson813)
- [@JadeZinHarris](https://www.github.com/JadeZinHarris)


