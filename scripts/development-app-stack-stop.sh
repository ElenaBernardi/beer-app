#!/bin/bash
echo "Stopping development backend container"
docker-compose -f environments/stack.yml stop
