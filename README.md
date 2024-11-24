# Skakovskyi-Pershko-66App
Навчальний проект Скаковського Дмитра та Першка Святослава з ІПС-22. Програма для розвитку та розробки звичок, яка містить самі звички, таймери завдань (Помодоро) та трекер задач. На випрацювання звичок в середньому треба 66 днів, тому й програма називатиметься 66App

# 66App - Habit Building and Productivity Tracker

## Overview
66App is a full-stack web application designed to help users build habits, track progress, and improve productivity with tools like a Pomodoro timer and task management.

## Features
- **Pomodoro Timer:** Focus on tasks with time management techniques.
- **To-Do List:** Manage and organize daily tasks effectively.
- **Habit Tracker:** Build and track habits over 66 days.

## Project Structure
The project is organized into client-side and server-side code:

### Client-Side (`src/`)
- `components/`: Reusable UI components for the app, including:
  - `PomodoroTimer.tsx`: Component for the Pomodoro timer feature.
  - `TodoList.tsx`: Component for managing tasks in the to-do list.
  - `RegistrationForm.tsx`: Form for user registration.
- `pages/`: Page components that structure the app's routes, including:
  - `PomodoroPage.tsx`: Page displaying the Pomodoro timer.
  - `TodoPage.tsx`: Page for managing to-dos.
  - `RegistrationPage.tsx`: Page for user registration.
- `styles/`: Shared CSS files for global and modular styling.
- `assets/`: Central folder for static resources (images, icons, etc.).

### Server-Side (`server/`)
- `src/`:
  - `components/`: Backend modules for handling features like login and Pomodoro sessions.
  - `models/`: Database models for habits, tasks, and users.
  - `routes/`: API endpoints for authentication, tasks, and habits.
  - `middleware/`: Functions for handling authentication and authorization.
- `migrations/`: Database migration files for schema setup and updates.
- `config/`: Configuration files for database and ORM setup.

### TODO
- **Backend:**
  - Implement user registration in `Register.js`.
  - Complete task list handling logic in `TaskList.js`.
- **Frontend:**
  - Add interactive styles to `PomodoroTimer` and `TodoList`.
  - Improve responsiveness for smaller devices.

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/DimSkakovskyi/Skakovskyi-Pershko-66App.git
   cd Skakovskyi-Pershko-66App
