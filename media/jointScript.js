
const COLORS = {
    header: "#f68e96",
    text: "#131e29",
    outline: "#131e29",
    main: "#fdecee",
    background: "#d7e2ea",
    grid: "#a1bbce",
    tools: "#fdecee"
};

let graph, paper;

// Initialize JointJS
function initializeDiagram() {
    graph = new joint.dia.Graph();

    paper = new joint.dia.Paper({
        model: graph,
        el: document.getElementById('diagram-container'),
        width: "100%",
        height: "100%",
        gridSize: 10,
        drawGrid: { name: "mesh", color: COLORS.grid },
        background: { color: COLORS.background },
        async: true,
        sorting: joint.dia.Paper.sorting.APPROX,
        defaultConnectionPoint: { name: "boundary", args: { offset: 2 } },
        defaultConnector: { name: "rounded", args: { radius: 5 } },
        defaultRouter: joint.connectionStrategies.orthogonalRouter,
    });

    scaleToFit();
}

// Listen for messages from the VS Code extension
window.addEventListener('message', (event) => {
    const message = event.data;

    if (message.type === 'UpdatedContent') {
        console.log('Received updated content:', message.content);
        renderDiagram(message.content);
    }
});

// Render the diagram based on received content
function renderDiagram(data) {
    graph.clear(); // Clear the graph

    // Add classes
    data.classes.forEach((cls) => {
        addClass(cls.name, cls.attributes, cls.methods);
    });

    // Add relationships
    data.links.forEach((link) => {
        addLink(link.source, link.target, link.type);
    });
}

function addClass(name, attributes = [], methods = []) {
    const element = new joint.shapes.standard.Rectangle();
    element.position(100, 30); // Adjust position dynamically
    element.resize(200, 100);
    element.attr({
        body: { fill: COLORS.main },
        label: { text: name, fontSize: 16, fontWeight: 'bold' },
    });
    element.addTo(graph);
}

function addLink(source, target, type) {
    const link = new joint.shapes.standard.Link();
    link.source({ id: source });
    link.target({ id: target });

    if (type === 'inheritance') {
        link.attr('line/targetMarker', { type: 'path', d: 'M 10 -5 0 0 10 5 Z', fill: COLORS.text });
    } else if (type === 'composition') {
        link.attr('line/sourceMarker', { type: 'path', d: 'M 10 -5 0 0 10 5 Z', fill: COLORS.outline });
    }

    link.addTo(graph);
}

function scaleToFit() {
    if (!graph || !paper) return;
    const bbox = graph.getBBox();
    paper.scaleContentToFit({ padding: 50, contentArea: bbox });
}

window.addEventListener('DOMContentLoaded', () => {
    initializeDiagram();
});
