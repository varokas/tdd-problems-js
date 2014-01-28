function TennisTable(_players, _current) {
    var instance = {};

    var players = _players;
    var current = _current;

    instance.render = function(svg) {
        var svg = d3.select(svg);
        var bgCircle = svg.append("circle")
            .attr("style", "fill: none; stroke:#000000;")
            .attr("cx", 185)
            .attr("cy", 155)
            .attr("r", 150);


        var circleGroup = svg.append("g")
            .attr("transform", "translate(150,120)");


        var arc = d3.svg.arc()
            .innerRadius(140)
            .outerRadius(150);

        var pie = d3.layout.pie().value(function(d) {
            return 1;
        });

        var arcs = circleGroup.selectAll("g")
            .data(pie(players))
            .enter()
            .append("g")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            });

        arcs.append("image")
            .attr("xlink:href", function(d) {
                return d.data.imgUrl;
            })
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", "64px")
            .attr("width", "64px")
            .attr("style", "mask: url(#circleMask)");

        arcs.append("circle")
            .attr("cx", 32)
            .attr("cy", 32)
            .attr("r", 32)
            .attr("style", function(d) {
                return "stroke:#ff0000; fill: none; stroke-width:" +
                    ((current == d.data.name) ? "4px" : "0px");
            });

        arcs.append("text")
            .attr("x",32)
            .attr("y",86)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text(function(d, i) {
                return d.data.name;
            });
    };

    return instance;
}