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
    .defer(d3.csv, "peds_by_borough.csv")
    .await(ready)

  function ready(error, ped_boroughs) {
      console.log(ped_boroughs)

    var maxSept14Peds = d3.max(peds, function(d) { return d.Sept14_PM })
    var widthScale = d3.scaleLinear()
        .domain([0, 200])
        .range([0, 400])

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


