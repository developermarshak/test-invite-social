## Test task

### Install

- Settings ports in docker-compose.yml and Connect.ts (default: 4000 for frontend and 80 for backend)
- `docker-compose up -d`
- `docker-compose exec php sh start.sh`
- You have user admin@local.com with admin password, can login with it
- `docker-compose exec node_frontend sh start.sh`
- Go to `localhost:4000` and try login

### To Do:
1. Unit Backend tests
2. Integration tests
3. Behats for frontend