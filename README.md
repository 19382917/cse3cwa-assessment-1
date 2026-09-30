CSE3CWA Assessment 3: Phoneme Game Builder (Data-Driven & Testing)

This project is a full-stack web application builder designed for Speech Pathology teachers to create phoneme-based classroom activities. It extends the frontend (Assessment 1) and backend/Docker (Assessment 2) by introducing a data-driven dashboard, observability metrics, database tracking, and comprehensive testing (Playwright, JMeter, Lighthouse).
Purpose

The builder allows teachers to configure Wordle and Word Search games using HCE phoneme symbols, save their word lists to a database, and generate standalone, playable HTML files. Assessment 3 adds an operational dashboard to monitor system health, track successful/failed generations, and ensure the system is reliable and accessible.
Features

    Operational Dashboard: Live data-driven view showing system health (200 OK), total activities generated, success/fail rates, and most-used activity types.
    Admin Dashboard: Full CRUD functionality for managing phoneme word lists and activity settings, saved permanently via Prisma ORM.
    Game Builders: Wordle and Word Search builders pull dynamically from the database to generate standalone HTML files.
    Observability & Instrumentation: Every game generation is logged to the database as a "Success" or "Failed" metric.
    Dark/Light Mode: Theme preference saved in local storage and cookies.
    Responsive Design: Mobile-friendly layout with a hamburger menu and semantic HTML.

Tech Stack

    Framework: Next.js (App Router)
    Language: TypeScript
    Styling: Tailwind CSS
    Database: Prisma ORM (SQLite)
    Testing: Playwright (E2E), JMeter (Load), Lighthouse (Accessibility)
    Containerization: Docker & Docker Compose

Testing & Accessibility

    Playwright: End-to-end tests included in the /tests folder. Run using npx playwright test. Covers Admin CRUD and Wordle generation workflows.
    JMeter: Load testing performed against /api/words simulating up to 1000 concurrent users.
    Lighthouse: Evaluated for accessibility, achieving a 100/100 score. High-contrast themes and ARIA labels were used to ensure usability for all teachers.

Getting Started

First, install the dependencies:

npm install

Set up the database:
bash
 
  
 
 
npx prisma db push
npx prisma generate
 
 

Run the development server:
bash
 
  
 
 
npm run dev
 
 

Open http://localhost:3000 with your browser to see the result.
Developer

William Younan
Student ID: 19382917