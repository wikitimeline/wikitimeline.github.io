

//using a CORS proxy https://cors-anywhere.herokuapp.com/ to avoid issue with cors and Yago server 
//need to find a better solution
//var yagoUrl = 'https://cors-anywhere.herokuapp.com/https://yago-knowledge.org/sparql/query';
var yagoUrl = 'https://cors.bridged.cc/https://yago-knowledge.org/sparql/query'
//var wikidataUrl = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const subject = urlParams.get('subj');

var data2;

google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(loadData);

function loadData(){
data2 = new google.visualization.DataTable();

//data2.addColumn('string', 'ID');
data2.addColumn({ type: 'string', label: 'Predicate', id: 'pName'});
data2.addColumn({ type: 'string', label: 'Object', id: 'oName'});
data2.addColumn({ type: 'date', label: 'Start Date', id: 'start'});
data2.addColumn({ type: 'date', label: 'End Date', id: 'end'});
data2.addColumn({ type: 'string', role: 'tooltip', id: 'link', 'p': {'html': true} });


}

//First SPARQL query for non-star triples
var datesQuery = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT * WHERE {
      <`+subject+`> ?pred ?obj .
      FILTER ( (datatype(?obj) = xsd:date) || (datatype(?obj) = xsd:gYear) || (datatype(?obj) = xsd:gYearMonth) ).
      ?pred rdfs:label ?pName .
      #?obj rdfs:label ?oName .
      #FILTER(LANG(?oName)='en').
  } 
LIMIT 50
`;

d3.sparql(yagoUrl, datesQuery).then(function(data) {


google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(loadData2);


function loadData2(){

data.forEach(function (arrayItem) {
    var startDate = new Date(arrayItem.obj);
    var endDate = new Date(startDate.getTime()+1000*60*60*24);

       data2.addRows([
           [ String(arrayItem.pName), String(arrayItem.pName),
            startDate, endDate, String(subject) ]
       ]);
});

//console.log(data2);
};

});

//Second SPARQLStar query
var starQuery = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT * WHERE {
      << <`+subject+`> ?pred ?obj >> <http://schema.org/startDate> ?start .
    OPTIONAL{ << <`+subject+`> ?pred ?obj >> <http://schema.org/endDate> ?end .}
      ?pred rdfs:label ?pName .
      ?obj rdfs:label ?oName .
      FILTER(LANG(?oName)='en').
} 
LIMIT 70
`;

d3.sparql(yagoUrl, starQuery).then(function(data) {

console.log(data);
////////////////////////////
google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {

//var today = new Date();
//today = Date.now();
data.forEach(function (arrayItem) {
    var startDate = new Date(arrayItem.start);
    var endDate = arrayItem.end ? new Date(arrayItem.end) : new Date(startDate.getTime()+1000*60*60*24);
    data2.addRows([
        [ String(arrayItem.pName), String(arrayItem.oName),
           // startDate, endDate , String("http://fabriziorlandi.net/sparql-epoch/GTimeline.html?subj="+arrayItem.obj) ] //new Date(today) ] 
         startDate, endDate , String("https://yagotimeline.github.io/search.html?subj="+arrayItem.obj) ] //new Date(today) ]
         //startDate, endDate , String("file:///F:/3rd%20Year/Semester2/SWENG/yagoTimeline.github.io/search.html?subj="+arrayItem.obj) ] //new Date(today) ]

    ]);
});

// sort startDate column
data2.sort({
      column: 2,
      desc: false
});

console.log(data2);

var options = {
    //height: 1000,
    timeline: {
        groupByRowLabel: false
    }
};

var chart = new google.visualization.Timeline(document.getElementById('chart_div'));

google.visualization.events.addListener(chart, 'select', function () {
    var selection = chart.getSelection();
    if (selection.length > 0) {
          window.open(data2.getValue(selection[0].row, 4), '_self'); //to open in a new tab use -> '_blank');
          console.log(data2.getValue(selection[0].row, 4));
    }
  });

chart.draw(data2, options);

};
});

