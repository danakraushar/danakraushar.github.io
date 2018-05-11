(function () {
  
  var margin = { top: 0, right: 0, bottom: 0, left: 0 }

  var width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

  var svg = d3.select("#graphic-2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.json, "world.topojson")
    .defer(d3.csv, "terrorism-coords.csv")
    .await(ready)

  var projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale(100)

  var path = d3.geoPath()
    .projection(projection)

  var xPositionScale = d3.scaleLinear()
    .range([0, width])

  var yPositionScale = d3.scaleLinear()
    .range([height, 0])

  function ready(error, worldData, terrorData) {
    if(error) {
      console.log("Had an error, exiting")
      return
    }

    var countries = topojson.feature(worldData, worldData.objects.countries).features

    // Do we want to draw the map?
    // Select, command + / to uncomment
    // svg.selectAll(".countries")
    //   .data(countries)
    //   .enter().append("path")
    //   .attr("fill", "#ccc")
    //   .attr("stroke", "#fff")
    //   .attr("d", path)

    console.log("Data looks like", terrorData)
    // How are we going to position them?
    svg.selectAll(".cities")
      .data(terrorData)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", "red")
      .attr("cx", function(d) {
        return 0
      })
      .attr("cy", function(d) {
        return 0
      })

    // Put your code here!

    
    // Draw axes
    // var yAxis = d3.axisLeft(yPositionScale)
    // svg.append("g")
    //   .attr("class", "axis y-axis")
    //   .call(yAxis)

    // var xAxis = d3.axisBottom(xPositionScale)
    // svg.append("g")
    //   .attr("class", "axis x-axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis)

  }

})()






