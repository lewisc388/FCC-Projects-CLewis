const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const height = 500;
const width = 1400;
const padding = 60;

d3.select("#title").
text("United States Gross Domestic Product 1947-2015");

const svg = d3.select("#chart").
append("svg").
attr("width", width + padding).
attr("height", height + padding);

var myColor = d3.scaleLinear().domain([1, 600]).
range(["#514a9d", "#12e3ff"]);

function Quarters(dataset, barWidth) {
  for (i in dataset) {
    let quart = dataset[i][0].substr(5, 6);
    if (quart === "01-01") {
      dataset[i].push(0);
    } else if (quart === "04-01") {
      dataset[i].push(barWidth);
    } else if (quart === "07-01") {
      dataset[i].push(barWidth * 2);
    } else {
      dataset[i].push(barWidth * 3);
    }
  }
  return dataset;
}

function mapData(item, index) {
  const quarterString = item[0].substring(5, 7);
  let quarter = "";

  if (quarterString === "01") {
    quarter = "Q1";
  } else if (quarterString === "04") {
    quarter = "Q2";
  } else if (quarterString === "07") {
    quarter = "Q3";
  } else {
    quarter = "Q4";
  }

  return [new Date(item[0]), item[1], quarter, item[0]];
}

function DrawAxis(response, dataset) {
  // Y-axis title
  svg.append('text').
  attr('transform', 'rotate(-90)').
  attr('x', -200).
  attr('y', 80).
  text('Gross Domestic Product');

  const tooltip = d3.select("#chart").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);
  const overlay = d3.select("#chart").
  append("div").
  attr("id", "overlay").
  style("opacity", 0);

  // Determine the width of each bar relative to
  // graph width and number of entries
  const barWidth = width / dataset.length;
  dataset = Quarters(dataset, barWidth);

  // Determine X-scale
  const minYear = response.from_date.substr(0, 4);
  const maxYear = parseInt(response.to_date.substr(0, 4)) + 1;
  console.log("Min Year: " + minYear + "\nMax Year: " + maxYear);

  // Determine Y-scale
  const minGDP = d3.min(dataset, i => i[1]);
  const maxGDP = d3.max(dataset, i => i[1]) + 2000;
  console.log("Min GDP: " + minGDP + "\nMax GDP: " + maxGDP);

  const YScale = d3.scaleLinear().
  domain([0, maxGDP]).
  range([height, 0]);

  const XScale = d3.scaleLinear().
  domain([minYear, maxYear]).
  range([0, width]);

  const GDPScaled = dataset.map(i => YScale(i[1]));

  const yAxis = d3.axisLeft(YScale);
  const xAxis = d3.axisBottom(XScale).
  tickFormat(d3.format("d"));

  svg.
  append("g").
  attr("id", "x-axis").
  attr("transform", `translate(${padding - 10}, ${height + 10})`).
  call(xAxis);

  svg.
  append("g").
  attr("id", "y-axis").
  attr("transform", `translate(${padding - 10}, 10)`).
  call(yAxis);

  svg.
  selectAll("rect").
  data(GDPScaled).
  enter().
  append("rect").
  attr("class", "bar").
  attr("width", barWidth).
  attr("height", data => height - data).
  attr("data-date", (data, index) => dataset[index][0]).
  attr("data-gdp", (data, index) => dataset[index][1]).
  attr("x", (data, index) => XScale(dataset[index][0].substr(0, 4))).
  attr("y", (data, index) => YScale(dataset[index][1])).
  attr("transform", (data, index) => `translate(${padding + dataset[index][2] - 10}, 10)`).
  style("fill", data => myColor(data)).
  style("outline", "solid 1px rgba(255,255,255,0.50)").
  append("title").
  attr("id", "tooltip").
  attr("data-date", (data, index) => dataset[index][0]).
  text((data, index) => `${dataset[index][0]}\n$${dataset[index][1]} Billion`);

}


d3.json(dataUrl).then(response => {
  var dataset = response.data;
  DrawAxis(response, dataset);

});