🌸 Period Tracker — COMP2068 Assignment 2
📌 Project Description

This application is a Period Tracker built using Express, MongoDB/Mongoose, Passport Authentication, and HBS templating.
It allows users to log their menstrual cycles, view their personal history, track symptoms, and see their cycle phases visually on a calendar.

The interface uses custom CSS and Bootstrap to create a soft, supportive, and aesthetic design inspired by self-care  period content.

This project demonstrates CRUD functionality, authentication, routing, template rendering, and cloud deployment for COMP2068 Assignment 2.

🌐 Live Site

Hosted on Render:
👉 https://period-app-ykj5.onrender.com

🛠️ Key Features
✔ Public Splash Page

A home page explaining the app and inviting users to register or log in.

✔ Shared Header & Footer

Reusable navigation bar and footer included across all pages.

✔ User Authentication

Users can sign in using:

Email + Password

Google OAuth ✔ (additional feature)

GitHub OAuth

Non-authenticated users can only view the public sections.

✔ CRUD Functionality

Logged-in users can:

Create menstrual cycle entries

Read all personal cycle logs

Update existing entries

Delete entries (with confirmation)

All entries are tied to the user’s ID.

✔ Read-Only Public Page

Displays anonymous cycles (no names/emails).
Meets assignment requirement for a public, read-only data page.

✔ Dashboard

Shows:

Current cycle day

Cycle phase

Wellness tip

✔ Interactive Calendar (Additional Feature #2)

The app includes a fully interactive calendar using FullCalendar.js and Day.js.

The calendar feature includes:

Highlighted period dates

Clickable dates

Modal pop-ups showing:

Cycle day

Phase name (menstrual, follicular, ovulation, luteal)

Emoji indicators

Automatic estimation of cycle phases if no data is logged yet

This feature required independent learning, including:

Working with an interactive JavaScript library

Passing server data to the calendar

Handling date math with Day.js

Integrating modals with Bootstrap

This goes beyond basic CRUD and significantly enhances UX.

⭐ Additional Features (Required by Assignment)
1️⃣ Google OAuth Login

Implemented using Passport Google Strategy.
Users can log in instantly, and accounts merge automatically if emails match.

What I learned:

OAuth callback flow

Linking OAuth accounts

Handling missing passwords

Saving avatar photos

2️⃣ Interactive Cycle Calendar (FullCalendar.js + Day.js)

Provides a modern, visual way to understand cycle timing, symptoms, and phases.

What I learned:

Event rendering

Handling date clicks

Creating modal pop-ups

Cycle phase calculation logic

🗄️ Technologies Used

Node.js + Express

MongoDB + Mongoose

Passport.js (Local, Google, GitHub)

HBS Templating Engine

Bootstrap 5 + Icons

Custom CSS

FullCalendar.js

Day.js

🙋‍♀️ Author

ANN MARY SWETILNA
COMP 2068 – JavaScript Frameworks
Georgian College
