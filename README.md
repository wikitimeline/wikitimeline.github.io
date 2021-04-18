# WikiTimeline

![logo](/pic/timelinelogo.jpeg)

## Introduction

> WikiTimeline is a web application that retrieves data for the entity that the user interested in, obtains facts about this entity from the WIKIDATA database, and then display the information in a timeline.

The timeline chart is shown the description/relationships of the searched entity and displayed on the graph along with the time. This project is an innovative way of visualising data and have multiple uses - learn about a person’s or place’s history and obtain and understand the information in a faster way.



## WikiTimeline demo:
Here is our demo, with all the function been shown, please click on the link below to view
<br><br>
<br/>[![demo](https://img.youtube.com/vi/zj1vGBFcCIE/0.jpg)](https://www.youtube.com/embed/zj1vGBFcCIE)
<br><br><br>
To design and develop the WikiTimeline, we used JavaScript, HTML and CSS with additional libraries.
<br>
The previous solution was using Google Chart to display the timeline chart of the data. To add more functionalities to the timeline chart, we moved to the d3 library which is far more interactive and allowed us to add functions like zoom-in, filtering and navigation.
<br>
The existing solution was using a CORS Web-Proxy to query the YAGO database but this service was shutting down. We were asked to come up with an alternative for this and we came up with a better solution to query the YAGO database. However, we were asked to move from YAGO to WikiData and WikiData did not require such service.
<br>
So for the project, we queried data from the WikiData database which uses a SPARQL end-point.


<br><br>



## Running instructions

> As our website is live on Github, simply go to the link below to access:
### wikitimeline.github.io
or

> Download the zip file and run index.html in your browser

