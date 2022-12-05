#!/bin/bash
echo "Starting development backend container"
docker-compose -f environments/stack.yml up -d --force-recreate
