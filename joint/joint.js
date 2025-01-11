const { shapes, dia, util } = joint;

const magicTextVerticalCenteringNumber = 3.5;

const computeWidthFromTexts = (node, itemXPadding) => {
    let texts = [];
    texts.push(`<< ${node.type} >>`);
    if (node.title) {
        texts.push(node.title.text);
    }
    if (node.attributes) {
        texts = texts.concat(node.attributes.map(attribute => attribute.text));
    }
    let maxTextLength = Math.max(...texts.map(text => text.length));

    return maxTextLength * 7 + itemXPadding * 2;
    // return maxTextLength * 4 + itemXPadding * 2;
};

const getInterfaceShapeDataFromNode = (node) => {
    let data = {
        id: node.id,
        type: node.type,
        title: {
            nodeType: node.title.type,
            text: node.title.text,
            style: { color: "#ffffff", fontSize: 14, fontWeight: 700, backgroundColor: "#4B999A", height: 20, width: 100, borderWidth: 0, borderColor: "#4B999A" }
        },
        attributes: node.attributes.map(attribute => {
            return {
                type: attribute.text.type,
                text: attribute.text,
                style: { color: "#605e57", fontSize: 12, fontWeight: 400, backgroundColor: "#ffffff", height: 20, width: 100, borderWidth: 0, borderColor: "#4B999A" }
            }
        }),
        style: { color: "#ffffff", fontSize: 14, fontWeight: 700, backgroundColor: "#4B999A", height: 20, width: 100, borderWidth: 2, borderColor: "#4B999A" }
    };
    return data;
}

// const getPortsFromNode = (node) => {
//     let data = {
//         id: node.id,
//         type: node.type,
//         title: {
//             nodeType: node.title.type,
//             text: node.title.text,
//             style: { color: "#ffffff", fontSize: 14, fontWeight: 700, backgroundColor: "#4B999A", height: 20, width: 100, borderWidth: 0, borderColor: "#4B999A" }
//         },
//         attributes: node.attributes.map(attribute => {
//             return {
//                 type: attribute.text.type,
//                 text: attribute.text,
//                 style: { color: "#605e57", fontSize: 12, fontWeight: 400, backgroundColor: "#ffffff", height: 20, width: 100, borderWidth: 0, borderColor: "#4B999A" }
//             }
//         }),
//         style: { color: "#ffffff", fontSize: 14, fontWeight: 700, backgroundColor: "#4B999A", height: 20, width: 100, borderWidth: 2, borderColor: "#4B999A" }
//     };
//     return data;
// }


class InterfaceShape extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'ts2uml.InterfaceShape',
            size: { width: 600, height: 400 },
            // Follow the interface defined in the models
            dataAux: {
                itemXPadding: 10,
                itemHeight: 25, 
                titleHeight: 50
            },
            data: {
                id: "1",
                type: "interface",
                title: {
                    nodeType: "interface",
                    text: "iterfaceTitle",
                    style: { color: "#ffffff", fontSize: 14, fontWeight: 700, backgroundColor: "#4B999A", height: 20, width: 100, borderWidth: 0, borderColor: "#4B999A" }
                },
                attributes: [
                    {
                        type: "attribute",
                        text: "something: number[]",
                        style: { color: "#605e57", fontSize: 12, fontWeight: 400, backgroundColor: "#ffffff", height: 20, width: 100, borderWidth: 0, borderColor: "#4B999A" }
                    },
                    {
                        type: "attribute",
                        text: "isActive: boolean",
                        style: { color: "#605e57", fontSize: 12, fontWeight: 400, backgroundColor: "#ffffff", height: 20, width: 100, borderWidth: 0, borderColor: "#4B999A" }
                    }
                ],
                style: { color: "#ffffff", fontSize: 14, fontWeight: 700, backgroundColor: "#4B999A", height: 20, width: 100, borderWidth: 2, borderColor: "#4B999A" }
            }
        };
    }
}

class InterfaceShapeView extends dia.ElementView {

    preinitialize() {
        this.presentationAttributes = dia.ElementView.addPresentationAttributes({
            data: ['RENDER'],
        });
    }

    render() {
        const { vel, model } = this;
        const body = this.vBody = V('rect').addClass('body');

        const title = this.vTitle = V('rect').addClass('title');
        const titleTypeText = this.vTitleTypeText = V('text').addClass('title-type-text').text(`<<${model.prop('data').title.nodeType}>>`);
        const titleText = this.vTitleText = V('text').addClass('title-text').text(model.prop('data').title.text);

        const attributes = this.vAttributes = [];
        const attributeTexts = this.vAttributeTexts = [];
        for (let i = 0, n = model.prop('data').attributes.length; i < n; i++) {
            const attribute = V('rect').addClass('attribute');
            const attributeText = V('text').addClass('attribute-text').text(model.prop('data').attributes[i].text);
            attributes.push(attribute);
            attributeTexts.push(attributeText);
        }

        vel.empty().append([
            body,
            title,
            titleTypeText,
            titleText,
            ...attributes,
            ...attributeTexts
        ]);
        this.translate();
        this.update();
    }

    update() {
        this.updateBody();
        this.updateTitle();
        this.updateAttributes();
    }

    updateBody() {
        const { model, vBody } = this;
        let newWidth = computeWidthFromTexts(model.prop('data'), model.prop('dataAux').itemXPadding);
        let newHeight = model.prop('dataAux').titleHeight + model.prop('dataAux').itemHeight * model.prop('data').attributes.length;
        model.prop('size/width', newWidth);
        model.prop('size/height', newHeight);

        const { width, height } = model.size();
        const bodyAttributes = {
            width: width,
            height: height,
            'stroke': model.prop('data').style.borderColor,
            'stroke-width': model.prop('data').style.borderWidth,
        };
        vBody.attr(bodyAttributes);
    }

    updateTitle() {
        const { model, vTitle, vTitleTypeText, vTitleText } = this;
        const { width } = model.size();
        const titleHeight = model.prop('dataAux').titleHeight;
        const titleAttributes = {
            'width': width,
            'height': titleHeight,
            'x': 0,
            'y': 0,
            'stroke': model.prop('data').title.style.borderColor,
            'stroke-width': model.prop('data').title.style.borderWidth,
            'fill': model.prop('data').title.style.backgroundColor,
        };
        const titleTypeTextAttributes = {
            'x': width/2,
            'y': titleHeight/3 + magicTextVerticalCenteringNumber,
            'width': width,
            'height': titleHeight/2,
            'text-anchor': 'middle',
            'text-vertical-anchor': 'middle',
            'fill': model.prop('data').title.style.color,
            'fontSize': model.prop('data').title.style.fontSize,
            'fontWeight': model.prop('data').title.style.fontWeight,
        };
        const titleTextAttributes = {
            'x': width/2,
            'y': 2 * titleHeight/3 + magicTextVerticalCenteringNumber,
            'text-anchor': 'middle',
            'text-vertical-anchor': 'middle',
            'fill': model.prop('data').title.style.color,
            'fontSize': model.prop('data').title.style.fontSize,
            'fontWeight': model.prop('data').title.style.fontWeight,
        };
        vTitle.attr(titleAttributes);
        vTitleTypeText.attr(titleTypeTextAttributes);
        vTitleText.attr(titleTextAttributes);
    }

    updateAttributes() {
        const { model, vAttributes, vAttributeTexts } = this;
        const { width } = model.size();
        const { titleHeight, itemHeight, itemXPadding } = model.prop('dataAux');
        for (let i = 0, n = model.prop('data').attributes.length; i < n; i++) {
            const attribute = vAttributes[i];
            const attributeText = vAttributeTexts[i];
            const attributeAttributes = {
                'width': width,
                'height': itemHeight,
                'x': 0,
                'y': titleHeight + (i * itemHeight),
                'fill': model.prop('data').attributes[i].style.backgroundColor,
                'stroke': model.prop('data').attributes[i].style.borderColor,
                'stroke-width': model.prop('data').attributes[i].style.borderWidth,
            };
            const attributeTextAttributes = {
                'x': itemXPadding,
                'y': titleHeight + (i * itemHeight) + itemHeight/2 + magicTextVerticalCenteringNumber, // 4 is the magic number to center the text vertically
                'text-anchor': 'start',
                'text-vertical-anchor': 'middle',
                'fill': model.prop('data').attributes[i].style.color,
                'fontSize': model.prop('data').attributes[i].style.fontSize,
                'fontWeight': model.prop('data').attributes[i].style.fontWeight,
            }
            attribute.attr(attributeAttributes);
            attributeText.attr(attributeTextAttributes);
        }
    }
}

// Script
const namespace = { ...shapes, ts2uml: { InterfaceShape, InterfaceShapeView } };


function renderDiagram({ nodes, links }) {

    const graph = new dia.Graph({}, { cellNamespace: namespace });

    const paper = new dia.Paper({
        el: document.getElementById('paper'),
        model: graph,
        width: 1920,
        height: 1080,
        background: { color: '#f0ece0' },
        gridSize: 10,
        drawGrid: true,
        cellViewNamespace: namespace
    });

    const interfacesJson = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nodeJson = {
            type: 'ts2uml.InterfaceShape',
            id: node.id,
            size: { width: 600, height: 400, itemHeight: 25, titleHeight: 50 },
            position: { x: 50, y: 50 },
            data: getInterfaceShapeDataFromNode(node)
        }
        interfacesJson.push(nodeJson);
    }    

    graph.fromJSON({
        cells: interfacesJson   
    });

    // const graphLinks = [];
    for (let i = 0; i < links.length; i++) {
        console.log(links[i]);
        const link = new shapes.standard.Link({
            source: { id: links[i].sourceId },
            target: { id: links[i].targetId },
        });
        link.router('orthogonal');
        link.connector('straight', { cornerType: 'line' });
        // graphLinks.push(link);
        link.addTo(graph);
    }
  

}


// Listen for messages from the VS Code extension
window.addEventListener("message", (event) => {
    const message = event.data;

    if (message.type === "UpdatedContent") {
        console.log("Received updated content:", message.graph);
        renderDiagram(message.graph);
    }
});
