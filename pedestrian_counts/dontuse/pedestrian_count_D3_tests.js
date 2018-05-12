(function () {

  var margin = { top: 0, right: 50, bottom: 0, left: 50 }

  var width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.json, "boroughs.geojson")
    .defer(d3.json, "boroughs-topo.json")
    .defer(d3.csv, "peds_cleaned.csv")
    .await(ready)

    // var projection = d3.geoTransverseMercator()
        var projection = d3.geoAlbersUsa()
      // .rotate([74 + 30 / 60, -38 - 50 / 60])
      // .center([-73.98, 40.71])
      // .translate([ width / 2, height / 2])
      .scale(500)
           // .parallels([29.5, 45.5])
    // var projection = d3.geoAlbersUsa()
      .translate([-73.94, 40.70])
          //   // .scale(1000)
      // .scale(15000)


    // var projection = d3.geoAlbersUsa()
    //   .center([40.71, -73.98])
    //   .parallels([29.5, 45.5])
    //   .scale(10000)
    //   .translate([(width) / 2, (height)/2])



    // var projection = d3.geo.conicConformal()
    //   // .parallels([40 + 40 / 60, 41 + 2 / 60])
    //   // .rotate([74, -40 - 10 / 60]);
    //   .translate([ width / 2, height / 2])
    //   .scale(1000)

    // var projection = d3.geoAlbersUsa()
    //     .center([-73.94, 40.70])
    //     .scale(50000)
    //     .translate([(width) / 2, (height)/2]);

    var path = d3.geoPath()
      .projection(projection)

  function ready(error, 
    boroughs, 
    peds) {
      console.log(boroughs)
      console.log(peds)


// var boroughs = geojson.feature(boroughs, boroughs.features).properties
// console.log(boroughs)


// var nyc_boroughs = topojson.feature(boroughs, {
//   type: "FeatureCollection",
// geometrics: boroughs.
// }
// console.log(nyc_boroughs)

  // var states = topojson.feature(states, states.objects.us_states).features
  // console.log(states)

// svg.selectAll(".borough")
//   .data(boroughs)
//   .enter().append("path")
//   .attr("class", "borough")
//   .attr("d", path)
//   .attr("fill", "#cccccc")
//   .attr("stroke", "#000000")

// plants = plants.filter(function(d) { return d.Total_MW >= 2 })

var maxSept14Peds = d3.max(peds, function(d) { return d.Sept14_PM })
var radiusScale = d3.scaleSqrt()
  .domain([0, maxSept14Peds])
  .range([0, 10])

var colorScale = d3.scaleOrdinal()
    .domain(['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'])
    .range(['#ff9933', '#939396', '#993399', "#3333cc", "#ff0000"])

  svg.selectAll(".peds-circle")
    .data(peds)
    .enter().append("circle")
    // .attr("r", function(d){
    //   console.log(d)
    //   return radiusScale(d.Sept14_PM)
    // })
    .attr("r", "10")
    .attr("cx", function(d) { 
      var coords = projection([d.long, d.lat])
      // console.log(coords)
            // console.log(d)
      return coords[0];
      })
    .attr("cy", function(d) {
            // console.log(d)
      var coords = projection([d.long, d.lat])
      // console.log(coords)
      return coords[1];
      })
    .attr("fill", function(d) {
      return colorScale(d.Borough)
    })
    .attr("opacity", "0.5")


// // //   svg.selectAll(".city-label")
// // //     .data(cities)
// // //     .enter().append("text")
// // //     .attr("class", "city-label")
// // //     .attr("x", function(d) { 
// // //       var coords = projection([d.lng, d.lat])
// // //       return coords[0];
// // //       })
// // //     .attr("y", function(d) {
// // //       var coords = projection([d.lng, d.lat])
// // //       return coords[1];
// // //       })
// // //     // .text(function(d) {
// // //     //   console.log(d)
// // //     //   return d.city
// // //     // })
// // //     .attr("dx", 5)
// // //     .attr("dy", 2)
// // //     .on('mouseover', function(d) {
// // //       tip.show(d)
// // //     })
// // //     .on('mouseout', function(d) {
// // //       tip.hide(d)
// // //     })

  }

})()


