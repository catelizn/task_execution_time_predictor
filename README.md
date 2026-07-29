# 📊 Task Execution Time Predictor

**Full-stack application for managing projects and tasks with AI‑powered time estimation.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-2ea44f?style=for-the-badge&logo=render)](https://tetp-task-execution-time-predictor.onrender.com)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

## Overview

**Task Execution Time Predictor** is a production‑ready project management tool that helps teams estimate task completion time using intelligent heuristics. It combines a clean task‑management interface with a scalable REST API, making it easy to track projects, assign tasks, and get data‑driven time predictions.

Built with a modern full‑stack architecture, this application serves as a solid foundation for integrating advanced AI models (e.g., OpenAI) to deliver even more accurate forecasts.

---

## Key Features

- **Project & Task Management** – Create, organise, and track projects and tasks effortlessly.
- **Intelligent Time Estimation** – A custom heuristic algorithm predicts completion time based on task description complexity.
- **Full CRUD Operations** – Complete Create, Read, Update, and Delete functionality for all resources.
- **Modern Tech Stack** – Built with Next.js 16, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.
- **Responsive UI** – Clean, user‑friendly interface that works on any device.

---

## Tech Stack

| Category     | Technology                     |
|--------------|--------------------------------|
| Framework    | Next.js 16 (App Router)        |
| Language     | TypeScript                     |
| Styling      | Tailwind CSS                   |
| Database     | PostgreSQL                     |
| ORM          | Prisma                         |
| Deployment   | Render                         |

---

## Quick Start

### Prerequisites

- Node.js (v18 or later)
- Docker (to run PostgreSQL locally)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/catelizn/task_execution_time_predictor.git
   cd task_execution_time_predictor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
   ```

4. **Start PostgreSQL with Docker**
   ```bash
   docker run --name postgres-dev -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:15
   ```

5. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## Roadmap

- **OpenAI Integration** – Replace heuristics with real AI predictions.
- **User Authentication** – Secure login and role‑based access.
- **Task History** – Full audit log of changes.
- **Advanced Analytics** – Detailed dashboards and exportable reports.

---

## License

Distributed under the MIT License.

---

**Built with by [catelizn](https://github.com/catelizn)**

