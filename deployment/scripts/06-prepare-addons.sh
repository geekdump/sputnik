#!/bin/bash

# Check to see if input has been provided:
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Please provide the source dir, dist dir, bucket name, version"
    echo "For example: ./00-prepare-cf.sh ../source ./dist"
    exit 1
fi

set -e

echo "06-prepare-addons.sh--------------------------------------------------------------"
echo "[Packing] Cloud formation template"
echo
echo "Removing old $2/addons dir (rm -rf $2/addons)"
rm -rf $2/addons
echo "Creating addons folder: mkdir -p $2/addons"
mkdir -p $2/addons

# echo
# echo "[Rebuild] addons"

# build and copy console distribution files
# cd $1/addons
# rm -rf $1/addons/dist
# mkdir -p dist

# echo "Copying the blueprints over"
# rsync -a --exclude=views --exclude=libs --exclude=dist $1/addons/* $1/addons/dist

# echo "build addons - murata"
# cd $1/addons/murata/views/murata-vibration-sensor-network
# yarn install
# yarn build
# cp $1/addons/murata/views/murata-vibration-sensor-network/dist/*.js $1/addons/dist/murata/

# echo "build addons - samples"
# cd $1/addons/samples/views/sample
# yarn install
# yarn build

# rsync -a --exclude=views --exclude=libs --exclude=dist $1/addons/* $1/addons/dist
# cp -r $1/addons/dist/* $2/addons

rsync -a --exclude=views --exclude=libs --exclude=dist --exclude=lambdas $1/addons/* $2/addons

echo
echo "[Build Murata addon lambda functions]"
mkdir $2/addons/murata/lambdas
cd $1/addons/murata/lambdas/murata-vibration-sensor-gateway-main-lambda-python
pip install -r requirements.txt -t . --upgrade
zip -rq $2/addons/murata/lambdas/`echo ${PWD##*/}`.zip .

# echo
# cd $1/addons/murata/services/nodes-manager
# yarn run build
# cp ./dist/`jq -cr '.name' package.json`.zip $2/addons/murata/services/`jq -cr '.name' package.json`.zip

echo
echo "------------------------------------------------------------------------------"
echo
exit 0
