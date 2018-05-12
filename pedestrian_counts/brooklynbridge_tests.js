(function () {

  var margin = { top: 20, right: 50, bottom: 100, left: 50 }

  var width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

  var svg = d3.select("#bridge-graphic-1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.queue()
  .defer(d3.csv, "brooklyn_bridge_transpose.csv")
  .await(ready)

function ready(error, brooklyn_bridge) {
    console.log(brooklyn_bridge)

  var heightScale = d3.scaleLinear()
      .domain([0, 20500])
      // .range([height, 0])
      .range([0, height])


  var y = d3.scaleLinear()
    .domain([0, 20500])
    .range([0, height])

  var xPositionScale = d3.scaleBand()
    .padding(0.5)

  bridge_seventothirteen = brooklyn_bridge.filter(function(d) { 
                        return d.rowname === 'sum_2007' || 
                               d.rowname === 'sum_2008' ||
                               d.rowname === 'sum_2009' || 
                               d.rowname === 'sum_2010' ||
                               d.rowname === 'sum_2011' ||
                               d.rowname === 'sum_2012' ||
                               d.rowname === 'sum_2013'
                      })

  console.log(brooklyn_bridge)

  var xPositionScale_sub = d3.scaleOrdinal()
      .domain(['sum_2007', 'sum_2008', 'sum_2009', 'sum_2010',
                'sum_2011', 'sum_2012', 'sum_2013'])
      .range([1/10*width, 2/10*width, 3/10*width, 4/10*width,
              5/10*width, 6/10*width, 7/10*width])

  d3.select("#bridge-step-one")
      .on('stepin', function() {
          svg.selectAll(".bridge_07_13")
            .data(bridge_seventothirteen)
            .enter().append("rect")
            .attr("width", 40)
            .attr("y", function(d) {
              return height - y(d.total)
            })
            .attr("x", function(d) {
              console.log(d.rowname)
              return xPositionScale_sub(d.rowname)
            })
            .attr("height", function(d) {
              console.log(d.total)
              return heightScale(d.total)
            })
            .attr("fill", "#C7CEF6")
        // console.log("I was stepped into")
      })

   var xPositionScale = d3.scaleOrdinal()
      .domain(['sum_2007', 'sum_2008', 'sum_2009', 'sum_2010',
                'sum_2011', 'sum_2012', 'sum_2013', 'sum_2014'])
      .range([1/10*width, 2/10*width, 3/10*width, 4/10*width,
              5/10*width, 6/10*width, 7/10*width, 8/10*width])
           
  d3.select("#bridge-step-two")
    .on('stepin', function() {
        svg.selectAll(".bridge_07_14")
          .data(brooklyn_bridge)
          .enter().append("rect")
          .attr("width", 40)
          .attr("y", function(d) {
            return height - y(d.total)
          })
          .attr("x", function(d) {
            console.log(d.rowname)
            return xPositionScale(d.rowname)
          })
          .attr("height", function(d) {
            console.log(d.total)
            return heightScale(d.total)
          })
          // .attr("fill", "#7496D2")
          .attr("fill", function(d) {
            if (d.rowname === "sum_2014") {
              return "#7496D2";
            } else {
              return "#C7CEF6"
            }
            })    
            })    


  var yAxis = d3.axisLeft(heightScale)
  svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis)

  var xAxis = d3.axisBottom(xPositionScale)
  svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  }

})()


