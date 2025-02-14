# HRM App

A full-stack Human Resource Management (HRM) application built with Next.js, Prisma, NextAuth, Tailwind CSS, and MongoDB. This app supports employee management, attendance tracking, leave requests, and role‑based authentication and authorization.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)

## Demo

Check out the live demo: [HRM System Demo](https://hrm-agrim-pradhanangas-projects.vercel.app)

## Features

- **Employee Management:**

  - Create, read, update, and delete employee records.
  - Manage employee details including name, email, role, employee type, department, and salary.

- **Authentication & Authorization:**

  - Secure authentication using NextAuth with credentials.
  - Role-based access control (SUPER_ADMIN, HR, MANAGER, EMPLOYEE).

- **Attendance Tracking:**

  - Record employee check-ins and check-outs.
  - Store additional metadata such as IP address and image URL.

- **Leave Requests:**

  - Employees can submit leave requests.
  - Managers and HR can review, approve, or decline leave requests.
  - Track leave status (REVIEW, APPROVED, DECLINED) and leave type (SICK, UNPAID, VACATION).

- **Prisma & MongoDB:**

  - Uses Prisma ORM to interact with a MongoDB database.
  - Supports schema relations (e.g. User–Attendance, User–LeaveRequests).

- **API Routes:**

  - Built with Next.js App Router, offering API endpoints for employee CRUD operations, attendance, leave requests, etc.

## Tech Stack

- **Frontend:**

  - Next.js (App Router)
  - React
  - Tailwind CSS

- **Backend:**

  - Next.js API Routes
  - NextAuth for authentication
  - Prisma ORM

- **Database:**

  - MongoDB

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Agrimzz/hrm.git
   cd hrm
   ```

2. **Install Dependencies**

   Use npm (or yarn/pnpm). If you run into peer dependency conflicts (especially with React versions), consider using `--legacy-peer-deps`:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Generate Prisma Client**

   Ensure that Prisma Client is generated after installing dependencies. This is especially important on Vercel where caching might cause outdated Prisma Clients. You can add a postinstall script in your package.json:

   ```json
   "scripts": {
     "postinstall": "prisma generate",
     "dev": "next dev",
     "build": "next build"
   }
   ```

   Or run manually:

   ```bash
   npx prisma generate
   ```

## Configuration

1. **Prisma Schema**

   The Prisma schema is located in `prisma/schema.prisma`. It defines your data models for User, Attendance, LeaveRequest, etc. Review and adjust the schema if needed.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Any changes you make will trigger a hot reload.

### API Routes

- **Employees:**

  - `GET /api/user` — fetch all employees.
  - `POST /api/users/add` — add a new employee.
  - `DELETE /api/user/[id]` — delete an employee (ensure your API route accepts an ID).

- **Attendance, Leave Requests, etc.:**

  - Additional endpoints are available under `/api/attendance`, `/api/leave-request`, etc.

##

##
