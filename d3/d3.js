function renderDiagram(graph) {
    const width = 800;
    const height = 600;

    const svg = d3.select("#diagram")
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "border: 1px solid black; background-color: white;");

    // Add zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.5, 3]) // Zoom scale
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

    svg.call(zoom);

    const g = svg.append("g"); // Container for the graph elements

    const simulation = d3
        .forceSimulation(graph.nodes)
        .force(
            "link",
            d3.forceLink(graph.links).id(d => d.id).distance(150)
        )
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = g
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke", "#aaa")
        .attr("stroke-width", 2);

    const node = g
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("g")
        .call(
            d3.drag()
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                })
        );

    // Append rectangles for nodes of type "class" or "interface"
    node.filter(d => d.type === "class" || d.type === "interface")
        .append("rect")
        .attr("width", 120)
        .attr("height", 50)
        .attr("x", -60)
        .attr("y", -25)
        .attr("fill", d => d.type === "class" ? "#3498db" : "#2ecc71") // Different colors for classes and interfaces
        .attr("stroke", d => d.type === "class" ? "#2980b9" : "#27ae60")
        .attr("stroke-width", 2);

    // Add text labels to all nodes
    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 5) // Center the text vertically
        .text(d => d.name)
        .attr("fill", "#fff")
        .attr("font-size", "12px")
        .attr("font-family", "Arial");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
}

// Listen for messages from the VS Code extension
window.addEventListener('message', (event) => {
    const message = event.data;

    if (message.type === 'UpdatedContent') {
        console.log('Received updated content:', message.content);
        renderDiagram(message.graph);
    }
});
