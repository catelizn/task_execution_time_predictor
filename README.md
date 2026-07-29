# 📊 Task Execution Time Predictor

Full-stack application for managing projects and tasks with AI-powered time estimation.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-2ea44f?style=for-the-badge&logo=render)](https://tetp-task-execution-time-predictor.onrender.com)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

## Overview

Task Execution Time Predictor is a production-ready project management tool designed to help teams estimate task completion time. By combining a robust task management system with intelligent heuristics, it provides developers and project managers with a clear, data-driven view of their workflow.

Built with a modern full-stack architecture, the application features a clean, responsive interface and a scalable REST API. It serves as a foundation for integrating AI models (like OpenAI) to deliver even more accurate time predictions.

## Key Features

- Project & Task Management — Create, organize, and track projects and tasks.
- Intelligent Time Estimation — Custom heuristic algorithm predicts task completion time based on description complexity.
- Full CRUD Operations — Complete Create, Read, Update, and Delete functionality.
- Modern Tech Stack — Next.js 16, TypeScript, Prisma, PostgreSQL.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Deployment | Render |

## Quick Start

### Prerequisites

- Node.js (v18 or later)
- Docker (for PostgreSQL)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/catelizn/task_execution_time_predictor.git
cd task_execution_time_predictor

2. Install dependencies:
```bash
npm install

3. Create .env file:
```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"

4. Start PostgreSQL with Docker:
```bash
docker run --name postgres-dev -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:15

5. Run migrations:
```bash
npx prisma migrate deploy

6. Start development server:
```bash
npm run dev

Open http://localhost:3000

### Installation
- OpenAI integration for smarter predictions

- User authentication

- Task history and audit logs

- Advanced analytics dashboard

### License
MIT

### Built by cateLIZN
