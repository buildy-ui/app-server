# Docker Development Guide for UI8Kit

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- No need for Node.js, Bun, or any other dependencies locally!

### Start Development Environment
```bash
# Start all services (UI8Kit + PostgreSQL + Redis + Adminer)
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f ui8kit-dev
```

### Access Your Application
- **UI8Kit Dev Server**: http://localhost:5173
- **Adminer (DB Manager)**: http://localhost:8080
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 📋 Common Commands

### Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# Rebuild after changing Dockerfile
docker-compose -f docker-compose.dev.yml up -d --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Enter container shell
docker exec -it ui8kit-dev sh
```

### Production Build & Test
```bash
# Build production image
docker build -t ui8kit:latest .

# Run production container
docker run -p 8080:80 ui8kit:latest

# Test production with full stack
docker-compose up -d
```

### Cleanup (Free Disk Space)
```bash
# Stop all containers
docker-compose -f docker-compose.dev.yml down

# Remove unused images
docker image prune -f

# Remove all unused data (containers, networks, images)
docker system prune -f

# Remove everything including volumes (⚠️ deletes DB data!)
docker system prune -a --volumes
```

## 🔧 VS Code Dev Containers

For the best development experience, use VS Code Dev Containers:

1. Install "Dev Containers" extension in VS Code
2. Open project folder
3. Press `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
4. VS Code will open inside the container with all dependencies ready!

## 📊 Database Access

### PostgreSQL
- **Host**: localhost (or `postgres` from inside container)
- **Port**: 5432
- **Database**: ui8kit_dev
- **User**: dev_user
- **Password**: dev_password

### Redis
- **Host**: localhost (or `redis` from inside container)
- **Port**: 6379

### Using Adminer (Web UI)
1. Go to http://localhost:8080
2. System: PostgreSQL
3. Server: postgres
4. Username: dev_user
5. Password: dev_password
6. Database: ui8kit_dev

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  ui8kit-dev  │  │   postgres   │  │    redis     │  │
│  │   :5173      │  │    :5432     │  │    :6379     │  │
│  │              │  │              │  │              │  │
│  │  Bun + Vite  │  │  PostgreSQL  │  │    Redis     │  │
│  │  React + TS  │  │   15-alpine  │  │   7-alpine   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────┐                                       │
│  │   adminer    │                                       │
│  │    :8080     │                                       │
│  │              │                                       │
│  │   DB Admin   │                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

## 💡 Tips

### Hot Reload
Source code is mounted as a volume, so changes are reflected immediately without rebuilding.

### Persisting Data
Database data is stored in Docker volumes (`postgres_data`, `redis_data`). Data persists between container restarts.

### Environment Variables
Create `.env` file from `.env.example` for custom configuration:
```bash
cp .env.example .env
```

### Troubleshooting
```bash
# Check container status
docker-compose -f docker-compose.dev.yml ps

# Check container logs
docker-compose -f docker-compose.dev.yml logs ui8kit-dev

# Restart specific service
docker-compose -f docker-compose.dev.yml restart ui8kit-dev

# Full reset (removes volumes too)
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d --build
```

