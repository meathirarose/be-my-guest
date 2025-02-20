# Be My Guest

A platform connecting foreign visitors to countryside experiences in Kerala, India, with features for customers, property owners, and brokers.

## Description

**Be My Guest** is a microservices-based application that connects travelers with countryside property owners and brokers in Kerala. It allows users to search for properties, manage bookings, and make payments securely, while offering property owners the ability to feature their properties for extra visibility.

## Features

### Customer Features:
- Search properties by location and availability.
- Book properties and make payments securely.

### Property Owner Features:
- Add new properties.
- Manage bookings and receive payments.
- Option to feature properties for extra visibility.

### Broker Features:
- Manage property listings on behalf of owners.
- Assist customers with booking and inquiries.

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Frontend:** React, TypeScript, Redux
- **Database:** MongoDB (for each microservice)
- **Inter-Service Communication:** RabbitMQ
- **Other Tools:** Docker, Kubernetes (for containerization and deployment)

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/athirarosejohn/be-my-guest.git
    ```

2. Install dependencies for backend and frontend:
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. Configure environment variables (e.g., for MongoDB, RabbitMQ, etc.).

4. Run the backend and frontend:
    - Backend:
      ```bash
      cd backend
      npm run start:dev
      ```
    - Frontend:
      ```bash
      cd frontend
      npm start
      ```

## License

This project is licensed under the MIT License.
