const {  shapes, dia } = joint;

function renderDiagram({ nodes, links }) {

    const namespace = shapes;

    const graph = new dia.Graph({}, { cellNamespace: namespace });

    const paper = new dia.Paper({
        el: document.getElementById('paper'),
        model: graph,
        width: 1200,
        height: 500,
        background: { color: '#f0ece0' },
        gridSize: 10,
        drawGrid: true,
        cellViewNamespace: namespace
    });

    for (let i=0; i<nodes.length; i++) {
        const node = nodes[i];
        const rect1 = new shapes.standard.Rectangle();
        rect1.position(25, i * 25 + 25);
        rect1.resize(180, 50);
        rect1.addTo(graph);
        rect1.attr('body', { stroke: '#4B999A', rx: 2, ry: 2 });
        rect1.attr('label', { text: node.title.text, fill: '#605e57' });
    }

    // create link
    // const link = new shapes.standard.Link();
    // link.source(rect1);
    // link.target(rect2);
    // link.addTo(graph);

    // link.appendLabel({
    //     attrs: {
    //         text: {
    //             text: 'to the'
    //         }
    //     }
    // });
    // link.router('orthogonal');
    // link.connector('straight', { cornerType: 'line' });
}

// Listen for messages from the VS Code extension
window.addEventListener("message", (event) => {
    const message = event.data;

    if (message.type === "UpdatedContent") {
        console.log("Received updated content:", message.graph);
        renderDiagram(message.graph);
    }
});


