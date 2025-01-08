function renderDiagram({ groups }) {
    const width = 800;
    const height = 600;

    const svg = d3.select("#diagram")
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "border: 1px solid black; background-color: white;");

    const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on("zoom", (event) => g.attr("transform", event.transform));

    svg.call(zoom);

    const g = svg.append("g");

    const gridSpacingX = 300; // Horizontal spacing between groups
    const gridSpacingY = 300; // Vertical spacing between groups

    // Render each group on a grid
    groups.forEach((group, index) => {
        const startX = (index % 3) * gridSpacingX; // 3 groups per row
        const startY = Math.floor(index / 3) * gridSpacingY; // Move to the next row
        renderGroup(group, g, startX, startY);
    });
}

function renderGroup(group, container, startX = 0, startY = 0, spacingY = 30) {
    const groupG = container
        .append("g")
        .attr("class", "group")
        .attr("transform", `translate(${startX}, ${startY})`)
        .call(
            d3.drag()
                .on("start", (event) => {
                    // Bring the dragged group to the front
                    d3.select(event.sourceEvent.target).raise();
                })
                .on("drag", (event) => {
                    // Extract the current transform values
                    const currentTransform = d3.select(event.sourceEvent.target.parentNode).attr("transform");
                    const [currentX, currentY] = currentTransform
                        .match(/translate\(([^,]+),\s*([^)]+)\)/)
                        .slice(1, 3)
                        .map(Number);

                    // Update the group's position
                    d3.select(event.sourceEvent.target.parentNode)
                        .attr("transform", `translate(${currentX + event.dx}, ${currentY + event.dy})`);
                })
        );

    // Add nodes to the group
    const nodes = groupG
        .selectAll("g.node")
        .data(group.nodes)
        .enter()
        .append("g")
        .attr("class", (d) => `node ${d.type}`)
        .attr("transform", (d, i) => {
            if (d.type === "title") {
                return `translate(0, 0)`; // Title node at the top
            } else if (d.type === "attribute") {
                const attributeIndex = group.nodes.filter((n) => n.type === "attribute").indexOf(d);
                return `translate(0, ${(attributeIndex + 1) * spacingY})`; // Attributes below the title
            } else if (d.type === "method") {
                const methodIndex = group.nodes.filter((n) => n.type === "method").indexOf(d);
                const attributesCount = group.nodes.filter((n) => n.type === "attribute").length;
                return `translate(0, ${(attributesCount + methodIndex + 1) * spacingY})`; // Methods below attributes
            }
        });

    // Append rectangles for nodes
    nodes.append("rect")
        .attr("width", 150)
        .attr("height", 30)
        .attr("x", -75)
        .attr("y", -15)
        .attr("fill", (d) => (d.type === "title" ? "#3498db" : "#2ecc71"))
        .attr("stroke", "#000")
        .attr("stroke-width", 1);

    // Append text labels for nodes
    nodes.append("text")
        .attr("x", 0)
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#fff")
        .text((d) => d.name);

    return groupG;
}

// Listen for messages from the VS Code extension
window.addEventListener("message", (event) => {
    const message = event.data;

    if (message.type === "UpdatedContent") {
        console.log("Received updated content:", message.content);
        renderDiagram(message.graph);
    }
});
