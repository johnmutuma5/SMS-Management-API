run:
		docker-compose -f docker/dev/docker-compose.yml up

test:
		docker-compose -f docker/dev/docker-compose.yml exec server npm run test


install:
		docker-compose -f docker/dev/docker-compose.yml exec server npm install 

open-db:
		docker-compose -f docker/dev/docker-compose.yml exec database sh -c 'mongo'
