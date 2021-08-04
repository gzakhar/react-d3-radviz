"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _d3Selection = require("d3-selection");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let borderColor = '#DDDDDD';

function Radviz(props) {
  let CHART_R = 200;
  let MARGIN = 50;
  (0, _react.useEffect)(() => {
    let svg = (0, _d3Selection.select)('svg');
    svg.select('defs').remove();
    let defs = svg.append('defs');
    colorInCircumfrence(svg, defs, CHART_R, MARGIN);
    svg.select('#dataWheel').remove();
    const dialRV = svg.append('g').attr('id', 'dataWheel').attr('transform', "translate(".concat([MARGIN + CHART_R, MARGIN + CHART_R], ")"));

    if (props.labels) {
      drawAnchors(dialRV, props.labels, CHART_R);
      printLabels(dialRV, props.labels, CHART_R, defs);
    }

    if (props.std) {
      drawStd(dialRV, props.std, CHART_R);
    }

    if (props.points) {
      drawDots(dialRV, props.points, CHART_R, MARGIN);
    }
  });
  return /*#__PURE__*/_react.default.createElement("svg", {
    viewBox: "0 0 500 500"
  });
}

let dotY = (radius, theta) => radius * Math.sin(theta);

let dotX = (radius, theta) => radius * Math.cos(theta); // Print Labels


let printLabels = (dial, labels, CHART_R, defs) => {
  let arcs = [];

  for (let label of labels) {
    let top = label.angle > Math.PI ? true : false;
    let startAngle;
    let endAngle;
    let radius; // TODO: figure out how to make the radius variable (size of label)

    if (top) {
      startAngle = label.angle - Math.PI / 4;
      endAngle = label.angle + Math.PI / 4;
      radius = CHART_R + 10;
    } else {
      startAngle = label.angle + Math.PI / 4;
      endAngle = label.angle - Math.PI / 4;
      radius = CHART_R + 25;
    }

    arcs.push("M".concat([dotX(radius, startAngle), dotY(radius, startAngle)], " A").concat([radius, radius], " 0 0 ").concat(top ? 1 : 0, " ").concat([dotX(radius, endAngle), dotY(radius, endAngle)]));
  }

  defs.selectAll('g').append('g').data(arcs).enter().append('path').attr('id', (_, i) => "labelPath".concat(i)).attr('d', d => d);
  dial.selectAll().append('g').data(labels).enter().append('text').attr('text-anchor', 'middle').append('textPath').attr('xlink:href', (_, i) => "#labelPath".concat(i)).attr('startOffset', '50%').style('font-family', 'sans-serif').style('font-size', '24px').style('font-weight', '600').style('fill-opacity', 1).style('cursor', 'default').text(d => d.anchor.toUpperCase()).attr('id', 'anchor-labels');
}; // Draw anchors 


let drawAnchors = (dial, labels, CHART_R) => {
  dial.selectAll('g').remove();
  dial.selectAll().append('g').data(labels).enter().append('circle').attr('cx', d => dotX(CHART_R, d.angle)).attr('cy', d => dotY(CHART_R, d.angle)).attr('r', 5).style('fill', 'red').style('stroke', '#000').style('stroke-width', 1.5);
}; // Plot data points


let drawDots = (dial, dotData, CHART_R, MARGIN) => {
  let BORDER_MARGIN = 10;
  dial.selectAll().data(dotData).enter().append('circle').attr('cx', d => (CHART_R - BORDER_MARGIN) * d.coordinates.x).attr('cy', d => (CHART_R - BORDER_MARGIN) * d.coordinates.y).attr('r', 2.5).attr('id', (_, i) => "dot".concat(i)).style('fill', '#000000').style('fill-opacity', 0.8).style('stroke', '#FFFFFF').style('stroke-width', 0.1).on('mouseover', handleHoverOn).on('mouseout', handleHoverOff); // .on('click', props.handleMouseClick)
};

function handleHoverOn(i, d) {
  (0, _d3Selection.select)(this).attr('r', 6).style('fill', 'white'); // TODO make the id of dot labels more unique

  (0, _d3Selection.select)(this.parentNode).append('text').attr('id', "dot-labels").attr('x', this.getAttribute('cx') - 10).attr('y', this.getAttribute('cy') - 10) // .attr('x', d.coordinates.x - 10)
  // .attr('y', d.coordinates.y - 10)
  .text(d.textFloater);
}

function handleHoverOff(i, d) {
  (0, _d3Selection.select)(this).style('fill', i.fill).attr('r', 2.5); // TODO make the id of dot labels more unique

  (0, _d3Selection.select)(this.parentNode).select("#dot-labels").remove();
} // Setting saturation and hsl


function colorInCircumfrence(svg, defs, CHART_R, MARGIN) {
  const HUE_STEPS = Array.apply(null, {
    length: 360
  }).map((_, index) => index); // remove if refreshed

  svg.select('#hueWheel').remove();
  const g = svg.append('g').attr('id', "hueWheel").attr('stroke-width', CHART_R);
  {
    HUE_STEPS.forEach(angle => g.append('path').attr('key', angle).attr('d', getSvgArcPath(CHART_R + MARGIN, CHART_R + MARGIN, CHART_R / 2, angle, angle + 1.5)).attr('stroke', "hsl(".concat(angle, ", 100%, 50%)")));
  }
  svg.selectAll("circle").remove();
  svg.append('circle').attr('cx', CHART_R + MARGIN).attr('cy', CHART_R + MARGIN).attr('r', CHART_R).style('fill', 'url(#saturation)');
  let saturation = defs.append('radialGradient').attr('id', 'saturation');
  saturation.append('stop').attr('offset', '0%').attr('stop-color', '#fff');
  saturation.append('stop').attr('offset', '100%').attr('stop-color', '#fff').attr('stop-opacity', 0);
  svg.append('circle').style('fill', 'none').style('stroke', borderColor).style('stroke-width', 3).style('stroke-opacity', 1).attr('cx', CHART_R + MARGIN).attr('cy', CHART_R + MARGIN).attr('r', CHART_R);

  function getSvgArcPath(cx, cy, radius, startAngle, endAngle) {
    var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    startAngle *= Math.PI / 180;
    endAngle *= Math.PI / 180;
    var x1 = cx + radius * Math.cos(endAngle);
    var y1 = cy + radius * Math.sin(endAngle);
    var x2 = cx + radius * Math.cos(startAngle);
    var y2 = cy + radius * Math.sin(startAngle);
    return "M ".concat(x1, " ").concat(y1, " A ").concat(radius, " ").concat(radius, " 0 ").concat(largeArcFlag, " 0 ").concat(x2, " ").concat(y2);
  }
}

function drawStd(dial, std, CHART_R) {
  dial.append('circle').attr('cx', 0).attr('cy', 0).attr('r', std * CHART_R).style('fill', 'none').style('stroke', '#313131').style('stroke-width', 3).style('stroke-dasharray', '2, 5').style('stroke-opacity', 1);
  dial.append('circle').attr('cx', 0).attr('cy', 0).attr('r', std * CHART_R).style('fill', 'none').style('stroke', '#DDDDDD').style('stroke-width', 3).style('stroke-dasharray', '5, 2').style('stroke-dashoffset', 5).style('stroke-opacity', 1);
}

var _default = Radviz;
exports.default = _default;