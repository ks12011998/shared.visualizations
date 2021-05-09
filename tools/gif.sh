#!/bin/sh

# original command: ffmpeg -i input.mov -r 30 -vf scale=640:-1 output.gif
# -r being the frame rate
# scale to reduc your size

if test ${1} = "-h"
then
echo "input file | output file | frame rate | rescale"
else
echo "${1} is your input file"
echo "${2} is your output file"
echo "${3} is your frame rate"
echo "${4} is your rescaling"
echo "\n\nffmpeg -i ${1} -r ${3} -vf scale=${4}:-1 ${2} \n\n\n"
ffmpeg -i ${1} -r ${3} -vf scale=${4}:-1 ${2} 

fi


