clear
echo "Node version: "
node -v
echo "NPM Version: "
npm -v
echo "--------------"
echo "Setting up server:"
node test.js &
echo "Waiting ..."
sleep 1
echo "Testing Server:"
curl http://access.engr.oregonstate.edu:1852
echo "Killing the server"
kill -9 $(ps -aef | grep 'test.js' | grep -v grep | awk '{print $2}')
echo "--------------"
echo "All OK!"
