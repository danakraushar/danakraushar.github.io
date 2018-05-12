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
    .defer(d3.csv, "PedCountLocationsMay2015.csv")
    .await(ready)

    var projection = d3.geoAlbersUsa()
      .translate([ width / 2, height / 2])
      .scale(1000)

    var path = d3.geoPath()
      .projection(projection)

  function ready(error, boroughs, peds) {
      console.log("hi")
      console.log(boroughs)
      console.log(peds)


// var boroughs = geojson.feature(states, states.objects.us_states).features
// console.log(boroughs)

// // var tip = d3.tip()
// //   .attr('class', 'd3-tip')
// //   .offset([-10, 0])
// //   .html(function(d) {
// //     return d.city
// //   })

// // svg.call(tip);


// svg.selectAll(".state")
//   .data(states)
//   .enter().append("path")
//   .attr("class", "state")
//   .attr("d", path)
//   .attr("fill", "#cccccc")
//   .attr("stroke", "#000000")

// plants = plants.filter(function(d) { return d.Total_MW >= 2 })

// var maxMW = d3.max(plants, function(d) { return d.Total_MW })
// var radiusScale = d3.scaleSqrt()
//   .domain([0, maxMW])
//   .range([0, 10])

// var colorScale = d3.scaleOrdinal()
//     .domain(['natural gas', 'coal', 'nuclear', 'hydroelectric', 'oil', 'wind', 'solar'])
//     .range(['#ff9933', '#939396', '#993399', "#3333cc", "#ff0000", "#009900", "#cccc00"])

//   svg.selectAll(".plant-circle")
//     .data(plants)
//     .enter().append("circle")
//     .attr("r", function(d){
//       // console.log(d)
//       return radiusScale(d.Total_MW)
//     })
//     .attr("cx", function(d) { 
//       var coords = projection([d.longitude, d.latitude])
//       // console.log(coords)
//             // console.log(d)
//       return coords[0];
//       })
//     .attr("cy", function(d) {
//             // console.log(d)
//       var coords = projection([d.longitude, d.latitude])
//       // console.log(coords)
//       return coords[1];
//       })
//     .attr("fill", function(d) {
//       return colorScale(d.PrimSource)
//     })
//     .attr("opacity", "0.5")


// //   svg.selectAll(".city-label")
// //     .data(cities)
// //     .enter().append("text")
// //     .attr("class", "city-label")
// //     .attr("x", function(d) { 
// //       var coords = projection([d.lng, d.lat])
// //       return coords[0];
// //       })
// //     .attr("y", function(d) {
// //       var coords = projection([d.lng, d.lat])
// //       return coords[1];
// //       })
// //     // .text(function(d) {
// //     //   console.log(d)
// //     //   return d.city
// //     // })
// //     .attr("dx", 5)
// //     .attr("dy", 2)
// //     .on('mouseover', function(d) {
// //       tip.show(d)
// //     })
// //     .on('mouseout', function(d) {
// //       tip.hide(d)
// //     })

  }

})()


