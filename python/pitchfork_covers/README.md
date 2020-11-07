# Radial representation of pitchfork reviews 

[visualization](https://www.lorismat.com/work/radial-cover)  

Pitchfork is an independent website reviewing daily new album records. Here, I've decided to show reviews on a color wheel, and display album covers by their main color, sorted by hue or score. On this radial representation, you can see the score for each review -the further the point from the center, the best the score of the review. Switching from color to score will make the reading easier. Hovering on the color will display album information, such as the cover itslef but also the artist, the genre and the exact score.  

The data was obtained from the Pitchfork website -Aug. 8th 2020 to Oct. 21st, 2020.  

For each album cover, the main color of the album was exctracted, using a K-means algorithm, in Python. More info in the code repository, and credit to [Charles Leifer](http://charlesleifer.com/blog/using-python-and-k-means-to-find-the-dominant-colors-in-images/) for his really helpful code.
