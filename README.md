# Look AI - Chat

A full-stack AI chat application built with React and FastAPI.

## Tech Stack

| Folder | Description| Tech |  
|--------|---------|---------|
| `be/` | Backend | FastAPI, PostgreSQL, SQLAlchemy, JWT |
| `fe/` | Frontend | React, TypeScript, ShadeCN, AI SDK React |


### AI

- AI Provider
- Streaming responses

## Features

- User registration
- User authentication
- JWT-based authentication
- Chat creation
- Message sending
- AI streaming responses
- Markdown rendering
- Reasoning/thinking messages
- Auto-scrolling
- Chat history
- Logout
- Responsive chat interface

---

## Architecture

```text
React Client
     │
     │ HTTP / Streaming
     ▼
FastAPI
     │
     ├── Authentication
     ├── Chat Service
     ├── Message Service
     └── LLM Service
              │
              ▼
        LLM Provider
              │
              ▼
        Streaming Response



```


### Screen Video

https://github.com/user-attachments/assets/5ebd66f0-cd2c-43e0-a87c-16e64fe57ba0

