# Look AI - Chat

A full-stack AI chat application built with React and FastAPI.

## Tech Stack

| Folder | Description| Tech |  
|--------|---------|---------|
| `be/` | Backend | FastAPI, PostgreSQL, SQLAlchemy, Redis, JWT |
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

## Folder Architecture

Backend Folder Structure

```text
 |-- .dockerignore
 |-- .env
 |-- .env.test
 |-- .gitignore
 |-- app
 |--  |-- controllers
 |--  |--  |-- auth.py
 |--  |--  |-- chat.py
 |--  |--  |-- user.py
 |--  |-- core
 |--  |--  |-- cache.py
 |--  |--  |-- config.py
 |--  |-- database
 |--  |--  |-- database.py
 |--  |--  |-- models
 |--  |--  |--  |-- assistant.py
 |--  |--  |--  |-- chat.py
 |--  |--  |--  |-- message.py
 |--  |--  |--  |-- user.py
 |--  |-- llm
 |--  |--  |-- base.py
 |--  |--  |-- open_ai.py
 |--  |-- main.py
 |--  |-- middleware
 |--  |--  |-- auth.py
 |--  |-- routes
 |--  |--  |-- auth.py
 |--  |--  |-- chat.py
 |--  |--  |-- health.py
 |--  |--  |-- paths.py
 |--  |--  |-- user.py
 |--  |-- schemas
 |--  |--  |-- assistant.py
 |--  |--  |-- auth.py
 |--  |--  |-- chat.py
 |--  |--  |-- message.py
 |--  |--  |-- users.py
 |--  |-- services
 |--  |--  |-- ai.py
 |--  |--  |-- assistant.py
 |--  |--  |-- auth.py
 |--  |--  |-- chat.py
 |--  |--  |-- message.py
 |--  |-- utils
 |--  |--  |-- chat.py
 |--  |--  |-- error.py
 |--  |--  |-- jwt.py
 |--  |--  |-- logger.py
 |--  |--  |-- redis.py
 |--  |--  |-- security.py
 |--  |-- __init__.py
 |-- compose.yml
 |-- Dockerfile
 |-- README.md
 |-- requirements.txt
 |-- start-win.sh
 |-- tests
 |--  |-- conftest.py
 |--  |-- database.py
 |--  |-- test_auth.py
 |--  |-- __init__.py

```
Frontend Folder Structure

```text
 |-- .env
 |-- .gitignore
 |-- .prettierignore
 |-- .prettierrc
 |-- components.json
 |-- eslint.config.js
 |-- index.html
 |-- package-lock.json
 |-- package.json
 |-- public
 | |-- vite.svg
 |-- README.md
 |-- src
 | |-- App.tsx
 | |-- assets
 | | |-- logo2.svg
 | | |-- look-logo.svg
 | | |-- react.svg
 | |-- components
 | | |-- common
 | | | |-- app-layout.tsx
 | | | |-- auth-layout.tsx
 | | | |-- lazy.tsx
 | | | |-- markdown-referer.tsx
 | | | |-- profile-menu.tsx
 | | | |-- sidebar.tsx
 | | |-- login.tsx
 | | |-- ui
 | | | |-- alert.tsx
 | | | |-- avatar.tsx
 | | | |-- button.tsx
 | | | |-- card.tsx
 | | | |-- dropdown-menu.tsx
 | | | |-- empty.tsx
 | | | |-- field.tsx
 | | | |-- input-group.tsx
 | | | |-- input.tsx
 | | | |-- label.tsx
 | | | |-- message-scroller.tsx
 | | | |-- separator.tsx
 | | | |-- sheet.tsx
 | | | |-- sidebar.tsx
 | | | |-- skeleton.tsx
 | | | |-- textarea.tsx
 | | | |-- toast.tsx
 | | | |-- tooltip.tsx
 | |-- config
 | | |-- app-config.ts
 | |-- context
 | | |-- chat-context.tsx
 | |-- features
 | | |-- chat
 | | | |-- components
 | | | | |-- animation.tsx
 | | | | |-- chat-messages.tsx
 | | | | |-- chat-option.tsx
 | | | | |-- chat-panel.tsx
 | | | | |-- message-animated.tsx
 | | | | |-- searchbar.tsx
 | | | |-- provider
 | | | | |-- chat-provider.tsx
 | | | |-- services
 | | | | |-- apis
 | | | | | |-- chat.ts
 | | | |-- types
 | | | | |-- chat.ts
 | | |-- user
 | | | |-- components
 | | | |-- services
 | | | | |-- apis
 | | | | | |-- user.ts
 | |-- hooks
 | | |-- use-chat-bubble-menu.ts
 | | |-- use-mobile.ts
 | |-- index.css
 | |-- lib
 | | |-- ai.ts
 | | |-- message-animations.ts
 | | |-- query.ts
 | | |-- utils.ts
 | |-- main.tsx
 | |-- pages
 | | |-- chat.tsx
 | | |-- home.tsx
 | |-- providers
 | | |-- error-provider.tsx
 | | |-- query-provider.tsx
 | | |-- routes-provider.tsx
 | | |-- theme-provider.tsx
 | |-- routes
 | | |-- app-routes.tsx
 | | |-- index.ts
 | |-- schemas
 | | |-- common.ts
 | |-- services
 | | |-- apis
 | | | |-- auth.ts
 | | | |-- endpoints.ts
 | | |-- index.ts
 | |-- store
 | | |-- app.ts
 | | |-- auth.ts
 | |-- typeset.css
 | |-- utils.ts
 | |-- widgets
 | | |-- icons.tsx
 | | |-- logo.tsx
 | | |-- spinner.tsx
 | | |-- typing.tsx
 |-- tsconfig.app.json
 |-- tsconfig.json
 |-- tsconfig.node.json
 |-- vite.config.ts
```

### Screen Video
[DemoVideo](https://www.loom.com/share/28cb6245128849f68c1093186ccd0454)




