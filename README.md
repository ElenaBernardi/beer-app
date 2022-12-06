# Beer App
Come far partire l'applicazione:
## Clone del Repository
Scaricare l'applicazione con `git clone `
## Run del microservizio in locale
### Prerequisiti
- Node
### Dependencies

Dipendenze che devono essere in run:
- MongoDB (su localhost:27017)

Usa Docker Compose per eseguire le dipendenza all'interno di containers:

1. Apri il Terminale del PC.
2. Posizionati sulla cartella root del microservizio.
3. Esegui `sh scripts/development-backend-stack.sh`.

Per verificare che i servizi siano attivi puoi provare ad aprire [MongoExpress](http://localhost:8081)


### Build

Per fare la build in locale dell'applicazione **Node**:

1. Apri il Terminale del PC.
2. Posizionati sulla cartella root del microservizio.
3. Run the command `npm install`


### Esecuzione

Per fare il run dell'applicazione **Node**

1. Apri il Terminale del PC.
2. Posizionati sulla cartella root del microservizio.
3. Run the command `npm run start`



## Run Microservice with Docker

### Prerequisites

- Node
- Docker
- Docker Compose

### Run all the stack with Docker Compose

1. Apri il Terminale del PC.
2. Posizionati sulla cartella root del microservizio.
3. Run `sh  ./scripts/development-app-stack-start.sh` per fare la build e eseguire il microservizio con tutte le dipendenze.
4. Run `curl localhost:3000/migration/beer` per riempire il db e verificare che il servizio sia in esecuzione.
5. Run `sh  ./scripts/development-app-stack-stop.sh` per fermare il microservizio con tutte le dipendenze.
6. Per rimuovere tutti i container `docker rm $(docker ps -a -q)`.





