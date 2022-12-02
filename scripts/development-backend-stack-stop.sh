#!/bin/bash
echo "Stopping development backend containers"
docker stop environments_mongo_1
docker stop environments_mongo-express_1
echo "Removing development backend containers"
docker rm environments_mongo_1
docker rm environments_mongo-express_1
