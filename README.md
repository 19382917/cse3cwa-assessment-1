CSE3CWA Assessment 1: Phoneme Game Builder

This project is a frontend builder interface designed for Speech Pathology teachers to create phoneme-based classroom activities. It allows teachers to configure a Wordle or Word Search game using HCE phoneme symbols and generate a standalone, playable HTML file.
Purpose

The builder focuses on frontend design, usability, and accessibility. Teachers can select target phonemes, preview the activity, and download a single HTML file that runs in any normal web browser without requiring a server or database.
Features

    Wordle Builder: Select from a 90-word HCE phoneme corpus. Adjust difficulty based on word length and max guesses.
    Word Search Builder: Automatically generates a 10x10 interactive grid from a fixed 5-word phoneme list.
    Phoneme Hints: Hover over any phoneme symbol (e.g., /θ/) to see the English equivalent (e.g., "TH (as in thin)").
    Responsive Design: Mobile-friendly layout with a hamburger menu for compact navigation.
    Dark/Light Mode: Theme preference saved in local storage and cookies.
    Standalone HTML Generation: Uses JavaScript Blob URLs to download lightweight, playable game files.

Tech Stack

    Framework: Next.js (App Router)
    Language: TypeScript
    Styling: Tailwind CSS
    AI Assistance: Used for code generation and debugging (AI Acknowledgement submitted via LMS).

Getting Started

First, install the dependencies:

npm install

Run the development server:
bash
 
  
 
 
npm run dev
 
 

Open http://localhost:3000 with your browser to see the result.
Developer

William Younan
Student ID: 19382917