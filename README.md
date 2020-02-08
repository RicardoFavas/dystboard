# dystboard

git clone https://github.com/RicardoFavas/dystboard.git dystboard
cd dystboard
docker build -t dystboard .
docker run --network=host dystboard:latest