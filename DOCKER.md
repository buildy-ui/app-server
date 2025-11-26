# Docker 101 Guide for UI8Kit

A complete beginner's guide to Docker-based development. No local dependencies required!

## 📖 Table of Contents

1. [What is Docker?](#-what-is-docker)
2. [Prerequisites](#-prerequisites)
3. [Quick Start](#-quick-start)
4. [Daily Workflow](#-daily-workflow)
5. [Understanding the Setup](#-understanding-the-setup)
6. [Common Commands](#-common-commands)
7. [Database Access](#-database-access)
8. [VS Code Integration](#-vs-code-integration)
9. [Troubleshooting](#-troubleshooting)
10. [Cleanup & Disk Space](#-cleanup--disk-space)

---

## 🐳 What is Docker?

Docker is a tool that packages your application and all its dependencies into **containers**. Think of containers as lightweight, isolated virtual machines.

### Why Use Docker?

| Without Docker | With Docker |
|----------------|-------------|
| Install Node.js locally | Everything runs in containers |
| Install Bun locally | No local dependencies needed |
| Install PostgreSQL locally | Start/stop services with one command |
| "Works on my machine" issues | Same environment everywhere |
| Hard to clean up | Easy cleanup with `docker system prune` |

### Key Concepts

- **Image**: A blueprint/recipe for creating containers (like a class in programming)
- **Container**: A running instance of an image (like an object)
- **Volume**: Persistent storage that survives container restarts
- **Docker Compose**: Tool to run multiple containers together

---

## ✅ Prerequisites

### 1. Install Docker Desktop

Download and install from: https://www.docker.com/products/docker-desktop/

### 2. Start Docker Desktop

**Important!** Docker Desktop must be running before you can use Docker commands.

- Look for the Docker whale icon in your system tray (near the clock)
- The icon should be **steady** (not animating) when Docker is ready
- If you see errors, make sure Docker Desktop is running!

### 3. Verify Installation

Open a terminal and run:

```bash
docker --version
# Should show: Docker version 29.x.x or similar

docker info
# Should show server information without errors
```

---

## 🚀 Quick Start

### Step 1: Open Terminal in Project Folder

```bash
cd E:\_@Bun\@app-server
```

### Step 2: Start Everything

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This command:
- Downloads required images (first time only)
- Builds your application container
- Starts all services (app, database, cache, admin panel)
- Runs everything in background (`-d` = detached mode)

### Step 3: Open in Browser

| Service | URL | Description |
|---------|-----|-------------|
| **Your App** | http://localhost:5173 | UI8Kit development server |
| **Adminer** | http://localhost:8080 | Database management UI |

### Step 4: Start Coding!

- Edit files in your IDE as usual
- Changes appear automatically in the browser (hot reload)
- No need to restart containers when editing code

---

## 📅 Daily Workflow

### Morning: Start Work

```bash
# 1. Make sure Docker Desktop is running (check system tray)

# 2. Start development environment
docker-compose -f docker-compose.dev.yml up -d

# 3. Open browser: http://localhost:5173

# 4. Code in your IDE - changes auto-refresh!
```

### During the Day: Check Status

```bash
# See running containers
docker ps

# View application logs (useful for debugging)
docker logs -f ui8kit-dev

# Press Ctrl+C to stop viewing logs
```

### Evening: Stop Work

```bash
# Stop all containers (data is preserved)
docker-compose -f docker-compose.dev.yml down

# Optional: Free up disk space
docker system prune -f
```

---

## 🏗️ Understanding the Setup

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Computer                            │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   Docker Network                        │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │  ui8kit-dev  │  │   postgres   │  │    redis     │ │ │
│  │  │   :5173      │  │    :5432     │  │    :6379     │ │ │
│  │  │              │  │              │  │              │ │ │
│  │  │  Bun + Vite  │  │  PostgreSQL  │  │    Redis     │ │ │
│  │  │  React + TS  │  │   Database   │  │    Cache     │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │         │                                              │ │
│  │  ┌──────────────┐                                     │ │
│  │  │   adminer    │  Your source code is mounted here   │ │
│  │  │    :8080     │  ────────────────────────────────── │ │
│  │  │   DB Admin   │  E:\_@Bun\@app-server → /app        │ │
│  │  └──────────────┘                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────┐                                         │
│  │   Your IDE     │  Edit files here, see changes in       │
│  │   (VS Code)    │  browser automatically!                │
│  └────────────────┘                                         │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
@app-server/
├── .devcontainer/           # VS Code Dev Container config
│   └── devcontainer.json
├── apps/
│   └── web/                 # Your React application
├── docker-compose.dev.yml   # Development environment
├── docker-compose.yml       # Production environment
├── Dockerfile.dev           # Development container recipe
├── Dockerfile               # Production container recipe
├── nginx.conf               # Production web server config
└── .dockerignore            # Files to exclude from Docker
```

### What Each Container Does

| Container | Purpose | When You Need It |
|-----------|---------|------------------|
| `ui8kit-dev` | Runs your app with hot reload | Always during development |
| `postgres` | PostgreSQL database | When your app needs a database |
| `redis` | Redis cache/sessions | When your app needs caching |
| `adminer` | Web UI for database | When you want to view/edit DB data |

---

## 📋 Common Commands

### Starting & Stopping

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# Stop all services (keeps data)
docker-compose -f docker-compose.dev.yml down

# Restart all services
docker-compose -f docker-compose.dev.yml restart

# Restart specific service
docker-compose -f docker-compose.dev.yml restart ui8kit-dev
```

### Viewing Logs

```bash
# View all logs
docker-compose -f docker-compose.dev.yml logs

# View specific container logs
docker logs ui8kit-dev

# Follow logs in real-time (like tail -f)
docker logs -f ui8kit-dev

# View last 100 lines
docker logs --tail 100 ui8kit-dev
```

### Container Management

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Enter container shell (for debugging)
docker exec -it ui8kit-dev sh

# Exit container shell
exit
```

### Building & Rebuilding

```bash
# Rebuild after changing Dockerfile
docker-compose -f docker-compose.dev.yml up -d --build

# Force rebuild without cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

---

## 📊 Database Access

### PostgreSQL Connection Details

| Setting | Value |
|---------|-------|
| Host | `localhost` (from your computer) or `postgres` (from container) |
| Port | `5432` |
| Database | `ui8kit_dev` |
| Username | `dev_user` |
| Password | `dev_password` |

### Using Adminer (Recommended for Beginners)

1. Open http://localhost:8080
2. Fill in the form:
   - **System**: PostgreSQL
   - **Server**: `postgres`
   - **Username**: `dev_user`
   - **Password**: `dev_password`
   - **Database**: `ui8kit_dev`
3. Click "Login"

### Using Command Line

```bash
# Connect to PostgreSQL from terminal
docker exec -it ui8kit-postgres psql -U dev_user -d ui8kit_dev

# Run SQL query
docker exec -it ui8kit-postgres psql -U dev_user -d ui8kit_dev -c "SELECT NOW();"
```

### Redis Connection

| Setting | Value |
|---------|-------|
| Host | `localhost` or `redis` |
| Port | `6379` |

```bash
# Connect to Redis CLI
docker exec -it ui8kit-redis redis-cli

# Test connection
docker exec -it ui8kit-redis redis-cli PING
# Should return: PONG
```

---

## 🔧 VS Code Integration

### Option 1: Dev Containers (Best Experience)

Dev Containers let VS Code run **inside** the Docker container with all tools available.

1. Install extension: "Dev Containers" by Microsoft
2. Open project folder in VS Code
3. Press `Ctrl+Shift+P`
4. Type "Dev Containers: Reopen in Container"
5. Wait for container to build
6. You're now coding inside the container!

### Option 2: Regular VS Code + Docker

Just use VS Code normally - your code is mounted into the container, so changes sync automatically.

### Recommended VS Code Extensions

- Docker (Microsoft)
- Dev Containers (Microsoft)
- ESLint
- Prettier
- Tailwind CSS IntelliSense

---

## 🔍 Troubleshooting

### Problem: "Cannot connect to Docker daemon"

**Solution**: Start Docker Desktop
- Find Docker Desktop in Start menu
- Wait for the whale icon in system tray to stop animating

### Problem: "Port already in use"

**Solution**: Stop conflicting service or change port

```bash
# Find what's using port 5173
netstat -ano | findstr :5173

# Or change port in docker-compose.dev.yml:
# ports:
#   - "5174:5173"  # Use 5174 instead
```

### Problem: "Container keeps restarting"

**Solution**: Check logs for errors

```bash
docker logs ui8kit-dev
```

### Problem: "Changes not appearing in browser"

**Solution**: 
1. Check if container is running: `docker ps`
2. Check logs for errors: `docker logs -f ui8kit-dev`
3. Hard refresh browser: `Ctrl+Shift+R`
4. Restart container: `docker-compose -f docker-compose.dev.yml restart ui8kit-dev`

### Problem: "Out of disk space"

**Solution**: Clean up Docker

```bash
# Remove unused data
docker system prune -f

# Nuclear option: remove everything
docker system prune -a --volumes
```

### Full Reset

If nothing works, do a complete reset:

```bash
# Stop and remove everything
docker-compose -f docker-compose.dev.yml down -v

# Remove all Docker data
docker system prune -a --volumes

# Start fresh
docker-compose -f docker-compose.dev.yml up -d --build
```

---

## 🧹 Cleanup & Disk Space

### Check Disk Usage

```bash
docker system df
```

### Light Cleanup (Safe)

Removes stopped containers, unused networks, dangling images:

```bash
docker system prune -f
```

### Medium Cleanup

Also removes unused images:

```bash
docker image prune -a -f
```

### Heavy Cleanup (Caution!)

Removes everything including volumes (⚠️ **deletes database data!**):

```bash
docker system prune -a --volumes -f
```

### Recommended Cleanup Routine

```bash
# After finishing work for the day:
docker-compose -f docker-compose.dev.yml down
docker system prune -f

# Weekly (if disk space is tight):
docker image prune -a -f
```

---

## 🎓 Next Steps

### Learn More About Docker

- [Docker Getting Started Guide](https://docs.docker.com/get-started/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Play with Docker](https://labs.play-with-docker.com/) - Free online playground

### Customize Your Setup

- Edit `docker-compose.dev.yml` to add more services
- Modify `Dockerfile.dev` to add tools to your container
- Create `.env` file for environment variables

### Production Deployment

```bash
# Build production image
docker build -t ui8kit:latest .

# Run production container
docker run -p 80:80 ui8kit:latest

# Or use docker-compose for full stack
docker-compose up -d
```

---

## 📚 Quick Reference Card

```bash
# === DAILY COMMANDS ===
docker-compose -f docker-compose.dev.yml up -d     # Start
docker-compose -f docker-compose.dev.yml down      # Stop
docker logs -f ui8kit-dev                          # View logs
docker ps                                          # List containers

# === CLEANUP ===
docker system prune -f                             # Light cleanup
docker system prune -a --volumes                   # Full cleanup

# === TROUBLESHOOTING ===
docker-compose -f docker-compose.dev.yml restart   # Restart all
docker-compose -f docker-compose.dev.yml up -d --build  # Rebuild

# === DATABASE ===
# Open http://localhost:8080 for Adminer UI
# PostgreSQL: localhost:5432, user: dev_user, pass: dev_password
```

---

Built with ❤️ for developers who want clean, isolated development environments.

