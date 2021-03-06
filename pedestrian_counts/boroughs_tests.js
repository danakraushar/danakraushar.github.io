(function () {

  var margin = { top: 0, right: 50, bottom: 0, left: 80 }

  var width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

  var svg = d3.select("#boroughs-graphic-1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.queue()
  .defer(d3.csv, "peds_by_borough.csv")
  .await(ready)

function ready(error, ped_boroughs) {
    console.log(ped_boroughs)

  var maxMay15 = d3.max(ped_boroughs, function(d) { return d.sum_May15 })
  var widthScale = d3.scaleLinear()
      .domain([0, maxMay15])
      .range([0, .01*width])

  var yPositionScale = d3.scaleBand()
    .padding(0.5)

  var yPositionScale = d3.scaleOrdinal()
      .domain(['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'])
      .range([1/6*height, 2/6*height, 3/6*height, 4/6*height, 5/6*height])

  var sorted_May15 = ped_boroughs.sort(function(a, b) {
                  return b.sum_May15 - a.sum_May15
                  })

  var Borough = sorted_May15.map(function(d) { return d.Borough })
  yPositionScale.domain(Borough) /*changes scales to reflect order we just created*/

  d3.select("#boroughs-step-one")
  .on('stepin', function() {
    svg.selectAll(".borough_bars")
      .data(ped_boroughs)
      .enter().append("rect")
      .attr("height", 40)
      .attr("x", 0)
      .attr("y", function(d) {
        return yPositionScale(d.Borough)
      })
      .attr("width", function(d) {
        console.log(d.sum_May15)
        return widthScale(d.sum_May15)
      })
      .attr("fill", function(d) {
        if (d.Borough === "Manhattan") {
          return "#A35E60";
        } else {
          return "#D8A49B"
        }
      })
    })

  // Manhattan = ped_boroughs.filter(function(d) { return d.Borough === 'Manhattan' })

  // var widthScale = d3.scaleLinear()
  //     .domain([0, 432000])
  //     .range([0, .01*width])

  // var yPositionScale = d3.scaleBand()
  //   .padding(0.5)

  // var yPositionScale = d3.scaleOrdinal()
  //     .domain(['total_May15_AM', 'total_May15_MD', 'total_May15_PM'])
  //     .range([1/4*height, 2/4*height, 3/4*height])

  // d3.select("#boroughs-step-two")
  // .on('stepin', function() {
  //   svg.selectAll(".borough_bars_May")
  //     .data(Manhattan)
  //     .enter().append("rect")
  //     .attr("height", 40)
  //     .attr("x", 0)
  //     .attr("y", function(d) {
  //       return yPositionScale(d.Borough)
  //     })
  //     .attr("width", function(d) {
  //       console.log(d.sum_May15)
  //       return widthScale(d.sum_May15)
  //     })
  //     .attr("fill", "#A35E60")
  //   })

  // d3.select("#boroughs-step-three")
  // .on('stepin', function() {
  //   svg.selectAll(".borough_bars")
  //     .data(ped_boroughs)
  //     .enter().append("rect")
  //     .attr("height", 40)
  //     .attr("x", 0)
  //     .attr("y", function(d) {
  //       return yPositionScale(d.Borough)
  //     })
  //     .attr("width", function(d) {
  //       console.log(d.sum_May15)
  //       return widthScale(d.sum_May15)
  //     })
  //     .attr("fill", function(d) {
  //       if (d.Borough === "Manhattan") {
  //         return "#A35E60";
  //       } else {
  //         return "#D8A49B"
  //       }
  //     })
  //   })

  var yAxis = d3.axisLeft(yPositionScale)
  svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis)

  var xAxis = d3.axisBottom(widthScale)
  svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

  }

})()


