# Hexlet Chat

Single-page web application (SPA) for real-time messaging, built as a final project for the Hexlet Frontend Development program.

**[Live Demo](https://frontend-project-12-zxlx.onrender.com/)**

## Overview

* **Real-time Communication:** Instant messaging and channel updates powered by WebSockets (`Socket.io`).
* **State Management:** Centralized Redux Toolkit store with dedicated slices for channels, messages, and UI state.
* **Authentication:** User registration and authorization using JWT tokens.
* **Form Handling:** Client-side form validation (`Formik` + `Yup`) and profanity filtering (`leo-profanity`).
* **Localization:** Multi-language interface support via `i18next`.
* **Error Monitoring:** Application error tracking integration with `Rollbar`.

## Tech Stack

* **Frontend:** React, Redux Toolkit, React Router
* **Real-time:** Socket.io-client
* **UI & Styles:** Bootstrap, React-Bootstrap
* **Forms & Validation:** Formik, Yup
* **Localization:** i18next
* **Monitoring:** Rollbar
* **Build Tool:** Vite

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm

### Installation & Run

1. Clone the repository:  
   git clone https://github.com/moisova/frontend-project-12.git  
   cd frontend-project-12

2. Install dependencies:  
   make install

3. Start the application:  
   make start
