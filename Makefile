build:
	npm run --prefix frontend build
start:
	npx start-server -s ./frontend/dist
install:
	npm install --prefix frontend