# sorting colors from Blade Runner movies 

[visualization](https://www.lorismat.com/work/colors)  

The python code to process the frames is very similar to the [code I wrote in the Pitchfork reviews color wheel project](https://github.com/lorismat/shared.visualizations/tree/master/python/pitchfork_covers)  

In this project, frames are extracted every 5 seconds from both Blade Runner movies. The dominant color is extracted for every frame, with a K-means algorithm. The color format is then converted to HSL (Hue/Saturation/Lightness) and makes it possible to sort the colors by movie order (default), hue, saturation or lightness.

The process can be described as follow:

1. **Extracting the frames**, every 5 seconds. [ffmpeg](https://ffmpeg.org/) is used here, with the following command:  
`ffmpeg -i Blade\ Runner\ 2049.mp4 -vf fps=1/5 img/output%06d.png`  

At the end, 1881 pictures are extracted for Blade Runner 2049. Same goes for Blade Runner (1982) with 1312 pictures.

2. **Retrieving the dominant color for every frame**
In my [python notebook](https://github.com/lorismat/shared.visualizations/blob/master/python/movie_bar_code/extracting_frames_from_movies.ipynb), I'm using a K-means algorithm, on every frame. Before, the frame is converted to a group of 3-dimension vectors (Red, Green and Blue values). Then, we locate the unique centroid and get its color (position in the 3 dimensional space). Here is the python code, inspired, again, by [Charles Leifer's python code](http://charlesleifer.com/blog/using-python-and-k-means-to-find-the-dominant-colors-in-images/).

3. **Formatting all colors in HSL**
Here, the steps are pretty simple in python. The idea is to convert RGB dominant colors in HSL, which will be useful to sort our colors by hue, saturation or lightness.

4. **Visualising the data with d3.js**
Once the data is converted as a .json file, the data is ready to be visualized with d3.js. My code is available on [Observable](https://observablehq.com/@git1984/bar-code-blade-runner-movies).
