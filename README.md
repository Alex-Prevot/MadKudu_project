# Technical Document

## Antelope Species Visualizer

## Project Overview
This web application visualizes data related to antelope species, providing interactive and informative insights through a user-friendly interface. It allows users to manage their personal collection of antelopes and explore various data aspects using dynamic charts and tables.

## Technologies Used
- **Frontend**: React.js, Chakra UI
- **Backend**: Node.js, ExpressJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma

## Data Source
The application utilizes data from the following dataset for antelope species: [Antelope Species Data](https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json)

## Features
- **User Account Management**: Users can create, and manage their personal user accounts.
- **Data Visualization**: Antelope data is presented in a structured table and through various charts.
- **CRUD Operations**: Users have the ability to add, modify, and delete antelopes in their collections.
- **Search Filters**: Functionalities to filter antelopes by attributes such as species, habitat, or conservation status.
- **Interactive UI**: Interactive elements like buttons and dropdowns enhance the user experience.

## Installation
To set up the project on your local machine, follow these steps:

```bash
git clone git@github.com:Alex-Prevot/MadKudu_project.git
cd MadKudu_project

# Setup environment variables
# Ensure you have a .env file at the root and backend directory

# Start the application using Docker
docker compose up -d

# In the first terminal, navigate to the backend directory
cd backend
npm install
npm start

# In the second terminal, start the frontend
cd frontend
npm install
npm start

# The application will be available at http://localhost:3000
```
