(function() {


    d3.select("#boroughs-step-one")
        .on('stepin', function () {
                console.log("I was stepped into??")
            d3.select("#columbia-image")
            .attr("src", "images/columbia-expanded.png")
        })

    d3.select("#boroughs-step-two")
        .on('stepin', function () {
                console.log("I was stepped into??")
            d3.select("#columbia-image")
            .attr("src", "images/columbia-original.png")
        })


        d3.select("#bridge-step-one")
        .on('stepin', function () {
                console.log("I was stepped into??")
            d3.select("#blocks")
            .attr("src", "images/blocks-all.png")
        })

    d3.select("#bridge-step-two")
        .on('stepin', function () {
                console.log("I was stepped into??")
            d3.select("#blocks")
            .attr("src", "images/blocks-nothing.png")
        })

    // d3.select("#blocks-step-three")
    //     .on('stepin', function () {
    //             console.log("I was stepped into??")
    //         d3.select("#blocks")
    //         .attr("src", "images/blocks-red-yellow.png")
    //     })

    // d3.select("#blocks-step-four")
    //     .on('stepin', function () {
    //             console.log("I was stepped into??")
    //         d3.select("#blocks")
    //         .attr("src", "images/blocks-red.png")
    //     })

})()