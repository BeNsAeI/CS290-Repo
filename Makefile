all:
	./nodeSetup.sh
	make start
start:
	clear
	node start.js &
