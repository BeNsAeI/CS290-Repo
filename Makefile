all:
	./nodeSetup.sh
	make start
express:
	./nodeSetup.sh
	npm install
	clear
	node express\ sample.js &
start:
	clear
	node start.js &
