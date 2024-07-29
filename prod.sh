#!/bin/bash
echo "Bash Script excuting ..."

echo "Run Application With Docker:"
echo "1. Docker up(1)"
echo "2. Docker Build and Up(2)"
echo "3. Docker Down(3)"

read -p "Enter Option (1/2/3): " type


up=1
build=2
down=3

if [ $type -eq $up ]
then
        echo -e "Run Application"
        sudo docker compose up -d
        sudo docker ps
elif [ $type -eq $build ]
then 
        echo -e "Build and Run Application"
        sudo docker compose build --no-cache --force-rm
        sudo docker compose up -d
        sudo docker ps
elif [ $type -eq $down ]
then 
        echo -e "Stop Application"
        sudo docker compose down
else
        echo -e "Somthing went wrong!"
fi