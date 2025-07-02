# Full Stack Project: Student Fee Tracker

This project is a full-stack web application designed to efficiently manage student fee records. It enables users to add, update, view, and deactivate student information, all within a user-friendly UI. Built using Angular for the frontend, Node.js (Express) for the backend, and MS SQL Server for data storage, the app demonstrates seamless integration between modern web technologies and enterprise databases.

---

## Repository Structure

Student-Fee-Management-System/  
│  
├── backend/  
│   ├── db.js                      # Database configuration and connection  
│   ├── server.js                  # Express server entry point  
│   └── routes/  
│       └── studentRoutes.js       # API routes for CRUD operations  
│  
├── frontend/  
│   └── src/app/  
│       ├── studentdash/  
│       │   ├── studentdash.component.ts   # Component logic  
│       │   ├── studentdash.component.html # Component template  
│       └── shared/api.service.ts         # API communication service  
│  
└── README.md                     # Project overview and setup documentation  

---

## Tech Stack

- **Frontend:** Angular 12, Bootstrap 5  
- **Backend:** Node.js, Express.js  
- **Database:** Microsoft SQL Server  
- **API:** RESTful services with HttpClient  

---

## Project Objectives

- Enable users to manage student records efficiently via a clean UI  
- Support Create, Read, Update, and Deactivate operations  
- Maintain data integrity using validations and real-time notifications  
- Display active/inactive student status using visual indicators  

---

## Key Features

- Add new student details  
- Update and edit student records  
- Deactivate or activate students  
- Display success/error toasts for all operations  
- Modal-based forms and confirmation dialogs  
- Bootstrap styling with responsive layout  

---
