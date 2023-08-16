#!/bin/bash

declare arg=""
declare c_arg=""

C_Off='\033[0m'
Red='\033[0;31m' 
White='\033[0;37m'
Cyan='\033[0;36m'         

arg="${1,,}"
c_arg="${arg^}"


if [[ $1 == "" ]]
then
  echo -e "${Red}ERROR:${C_Off} You have to provide the Collection name as argument!"
  exit 0

fi


cd src/mongoDB/collections && mkdir $c_arg && cd $c_arg && touch $arg.schema.ts $arg.model.ts $arg.types.ts

if [ $? -ne 0 ]
then
  echo -e "${Red}ERROR:${C_Off} Failed to create new Collection: ${White}$c_arg${C_Off}!"
  exit 1
else
  echo -e "${Cyan}SUCCESS:${C_Off} created new Collection: ${White}$c_arg${C_Off}."
fi