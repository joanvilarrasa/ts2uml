/*! JointJS LayoutDirectedGraph v4.1.1 (2024-12-02) - LayoutDirectedGraph module for JointJS


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@dagrejs/dagre'), require('@dagrejs/graphlib'), require('@joint/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@dagrejs/dagre', '@dagrejs/graphlib', '@joint/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.joint = global.joint || {}, global.joint.layout = global.joint.layout || {}), global.dagre, global.graphlib, global.joint));
})(this, (function (exports, dagreUtil, graphlibUtil, core) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var dagreUtil__namespace = /*#__PURE__*/_interopNamespaceDefault(dagreUtil);
    var graphlibUtil__namespace = /*#__PURE__*/_interopNamespaceDefault(graphlibUtil);

    const DirectedGraph = {

        exportElement: function(element) {

            // The width and height of the element.
            return element.size();
        },

        exportLink: function(link) {

            var labelSize = link.get('labelSize') || {};
            var edge = {
                // The number of ranks to keep between the source and target of the edge.
                minLen: link.get('minLen') || 1,
                // The weight to assign edges. Higher weight edges are generally
                // made shorter and straighter than lower weight edges.
                weight: link.get('weight') || 1,
                // Where to place the label relative to the edge.
                // l = left, c = center r = right.
                labelpos: link.get('labelPosition') || 'c',
                // How many pixels to move the label away from the edge.
                // Applies only when labelpos is l or r.
                labeloffset: link.get('labelOffset') || 0,
                // The width of the edge label in pixels.
                width: labelSize.width || 0,
                // The height of the edge label in pixels.
                height: labelSize.height || 0
            };

            return edge;
        },

        importElement: function(nodeId, glGraph, graph, opt) {

            var element = graph.getCell(nodeId);
            var glNode = glGraph.node(nodeId);

            if (opt.setPosition) {
                opt.setPosition(element, glNode);
            } else {
                element.set('position', {
                    x: glNode.x - glNode.width / 2,
                    y: glNode.y - glNode.height / 2
                });
            }
        },

        importLink: function(edgeObj, glGraph, graph, opt) {

            const SIMPLIFY_THRESHOLD = 0.001;

            const link = graph.getCell(edgeObj.name);
            const glEdge = glGraph.edge(edgeObj);
            const points = glEdge.points || [];
            const polyline = new core.g.Polyline(points);

            // check the `setLinkVertices` here for backwards compatibility
            if (opt.setVertices || opt.setLinkVertices) {
                if (core.util.isFunction(opt.setVertices)) {
                    opt.setVertices(link, points);
                } else {
                    // simplify the `points` polyline
                    polyline.simplify({ threshold: SIMPLIFY_THRESHOLD });
                    const polylinePoints = polyline.points.map((point) => (point.toJSON())); // JSON of points after simplification
                    const numPolylinePoints = polylinePoints.length; // number of points after simplification
                    // set simplified polyline points as link vertices
                    // remove first and last polyline points (= source/target connectionPoints)
                    link.set('vertices', polylinePoints.slice(1, numPolylinePoints - 1));
                }
            }

            if (opt.setLabels && ('x' in glEdge) && ('y' in glEdge)) {
                const labelPosition = { x: glEdge.x, y: glEdge.y };
                if (core.util.isFunction(opt.setLabels)) {
                    opt.setLabels(link, labelPosition, points);
                } else {
                    // convert the absolute label position to a relative position
                    // towards the closest point on the edge
                    const length = polyline.closestPointLength(labelPosition);
                    const closestPoint = polyline.pointAtLength(length);
                    const distance = (length / polyline.length());
                    const offset = new core.g.Point(labelPosition).difference(closestPoint).toJSON();
                    link.label(0, {
                        position: {
                            distance: distance,
                            offset: offset
                        }
                    });
                }
            }
        },

        layout: function(graphOrCells, opt) {

            var graph;

            if (graphOrCells instanceof core.dia.Graph) {
                graph = graphOrCells;
            } else {
                // Reset cells in dry mode so the graph reference is not stored on the cells.
                // `sort: false` to prevent elements to change their order based on the z-index
                graph = (new core.dia.Graph()).resetCells(graphOrCells, { dry: true, sort: false });
            }

            // This is not needed anymore.
            graphOrCells = null;

            opt = core.util.defaults(opt || {}, {
                resizeClusters: true,
                clusterPadding: 10,
                exportElement: this.exportElement,
                exportLink: this.exportLink
            });

            // create a graphlib.Graph that represents the joint.dia.Graph
            // var glGraph = graph.toGraphLib({
            var glGraph = DirectedGraph.toGraphLib(graph, {
                directed: true,
                // We are about to use edge naming feature.
                multigraph: true,
                // We are able to layout graphs with embeds.
                compound: true,
                setNodeLabel: opt.exportElement,
                setEdgeLabel: opt.exportLink,
                setEdgeName: function(link) {
                    // Graphlib edges have no ids. We use edge name property
                    // to store and retrieve ids instead.
                    return link.id;
                }
            });

            var glLabel = {};
            var marginX = opt.marginX || 0;
            var marginY = opt.marginY || 0;

            // Dagre layout accepts options as lower case.
            // Direction for rank nodes. Can be TB, BT, LR, or RL
            if (opt.rankDir) glLabel.rankdir = opt.rankDir;
            // Alignment for rank nodes. Can be UL, UR, DL, or DR
            if (opt.align) glLabel.align = opt.align;
            // Number of pixels that separate nodes horizontally in the layout.
            if (opt.nodeSep) glLabel.nodesep = opt.nodeSep;
            // Number of pixels that separate edges horizontally in the layout.
            if (opt.edgeSep) glLabel.edgesep = opt.edgeSep;
            // Number of pixels between each rank in the layout.
            if (opt.rankSep) glLabel.ranksep = opt.rankSep;
            // Type of algorithm to assign a rank to each node in the input graph.
            // Possible values: network-simplex, tight-tree or longest-path
            if (opt.ranker) glLabel.ranker = opt.ranker;
            // Number of pixels to use as a margin around the left and right of the graph.
            if (marginX) glLabel.marginx = marginX;
            // Number of pixels to use as a margin around the top and bottom of the graph.
            if (marginY) glLabel.marginy = marginY;

            // Set the option object for the graph label.
            glGraph.setGraph(glLabel);

            // Executes the layout.
            dagreUtil__namespace.layout(glGraph, { debugTiming: !!opt.debugTiming });

            // Wrap all graph changes into a batch.
            graph.startBatch('layout');

            DirectedGraph.fromGraphLib(glGraph, {
                importNode: this.importElement,
                importEdge: this.importLink,
                ...opt,
                graph,
            });

            if (opt.resizeClusters) {
                // Resize and reposition cluster elements (parents of other elements)
                // to fit their children.
                // 1. filter clusters only
                // 2. map id on cells
                // 3. sort cells by their depth (the deepest first)
                // 4. resize cell to fit their direct children only.
                var clusters = glGraph.nodes()
                    .filter(function(v) { return glGraph.children(v).length > 0; })
                    .map(graph.getCell.bind(graph))
                    .sort(function(aCluster, bCluster) {
                        return bCluster.getAncestors().length - aCluster.getAncestors().length;
                    });

                core.util.invoke(clusters, 'fitToChildren', { padding: opt.clusterPadding });
            }

            graph.stopBatch('layout');

            // Width and height of the graph extended by margins.
            var glSize = glGraph.graph();
            // Return the bounding box of the graph after the layout.
            return new core.g.Rect(
                marginX,
                marginY,
                Math.abs(glSize.width - 2 * marginX),
                Math.abs(glSize.height - 2 * marginY)
            );
        },

        fromGraphLib: function(glGraph, opt) {

            opt = opt || {};

            var importNode = opt.importNode || core.util.noop;
            var importEdge = opt.importEdge || core.util.noop;
            var graph = opt.graph;
            if (!graph) {
                // The graph should be required as an option.
                // @deprecated
                if (this instanceof core.dia.Graph) {
                    // Backwards compatibility.
                    graph = this;
                 } else {
                    graph = new core.dia.Graph();
                 }
            }

            // Import all nodes.
            glGraph.nodes().forEach(function(node) {
                importNode.call(graph, node, glGraph, graph, opt);
            });

            // Import all edges.
            glGraph.edges().forEach(function(edge) {
                importEdge.call(graph, edge, glGraph, graph, opt);
            });

            return graph;
        },

        // Create new graphlib graph from existing JointJS graph.
        toGraphLib: function(graph, opt) {

            opt = opt || {};

            var glGraphType = core.util.pick(opt, 'directed', 'compound', 'multigraph');
            var glGraph = new graphlibUtil__namespace.Graph(glGraphType);
            var setNodeLabel = opt.setNodeLabel || core.util.noop;
            var setEdgeLabel = opt.setEdgeLabel || core.util.noop;
            var setEdgeName = opt.setEdgeName || core.util.noop;
            var collection = graph.get('cells');

            for (var i = 0, n = collection.length; i < n; i++) {

                var cell = collection.at(i);
                if (cell.isLink()) {

                    var source = cell.get('source');
                    var target = cell.get('target');

                    // Links that end at a point are ignored.
                    if (!source.id || !target.id) break;

                    // Note that if we are creating a multigraph we can name the edges. If
                    // we try to name edges on a non-multigraph an exception is thrown.
                    glGraph.setEdge(source.id, target.id, setEdgeLabel(cell), setEdgeName(cell));

                } else {

                    glGraph.setNode(cell.id, setNodeLabel(cell));

                    // For the compound graphs we have to take embeds into account.
                    if (glGraph.isCompound() && cell.has('parent')) {
                        var parentId = cell.get('parent');
                        if (collection.has(parentId)) {
                            // Make sure the parent cell is included in the graph (this can
                            // happen when the layout is run on part of the graph only).
                            glGraph.setParent(cell.id, parentId);
                        }
                    }
                }
            }

            return glGraph;
        }
    };

    exports.DirectedGraph = DirectedGraph;

}));
