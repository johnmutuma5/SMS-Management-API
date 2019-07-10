run:
		docker-compose -f docker/dev/docker-compose.yml up --build

test:
		docker-compose -f docker/dev/docker-compose.yml exec server npm run test


install:
		docker-compose -f docker/dev/docker-compose.yml exec server npm install 
