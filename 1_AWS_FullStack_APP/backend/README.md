# Backend

This directory contains the backend code for the Full Stack Application.

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file based on `.env.example` and configure the following:

- `PORT` - Server port (default: 5000)
- `DB_HOST` - Database host
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `DB_PORT` - Database port (default: 5432 for PostgreSQL)

## Running the Server

```bash
node server.js
```

## Description

Express.js backend API with PostgreSQL database connectivity using connection pooling.
