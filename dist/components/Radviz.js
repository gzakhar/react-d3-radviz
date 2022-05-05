"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _d3Selection = require("d3-selection");

var _d3Zoom = require("d3-zoom");

var _react = _interopRequireWildcard(require("react"));

var _radvizMapper = require("./radvizMapper");

var _uuid = require("uuid");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BORDER_COLOR = '#DDDDDD';
const BORDER_BOUNDRY = 15;
const CHART_R = 200;
const DOT_R = 3;
const DOT_COLOR = "#000000";
const DOT_BORDER_COLOR = "#FFFFFF";
const HUE_ACCURACY = 400;
const CURTAIN_COLOR = "#313131";
const LABEL_COLOR = "#e5e5e5";

function Radviz(props) {
  const [transform, setTransform] = (0, _react.useState)(new _d3Zoom.ZoomTransform(1, 0, 0));
  const svgRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    // #1 svg.
    let svg = (0, _d3Selection.select)(svgRef.current);
    svg.select('defs').remove();
    let defs = svg.append('defs');

    if (props.zoom) {
      svg.call((0, _d3Zoom.zoom)().scaleExtent([1, 100]).on("zoom", e => {
        let t = movementBoundry(e.transform);
        setTransform(t);
        svgRef.current.__zoom = t;
      }));
    } // #2 hueWheel, datawheel, border, reactive, data, curtain, anchors, labels


    svg.select('#zoomLayer').remove();
    let zoomLayer = svg.append('g').attr('id', 'zoomLayer').attr("transform", transform); // hueWheel.

    zoomLayer.select("#hueWheel").remove();
    let hueWheel = zoomLayer.append('g').attr('id', 'hueWheel');
    colorInCircumfrence(hueWheel, defs); // dataWheel.

    zoomLayer.select('#dataWheel').remove();
    let dataWheel = zoomLayer.append('g').attr('id', 'dataWheel'); // border.

    drawBorder(svg); // data

    if (props.points) drawDots(dataWheel, props.points, transform.k || 1); // curtain

    svg.select('#curtain').remove();
    let outline = svg.append('g').attr('id', 'curtain');
    drawCurtain(outline, 1, 2); // anchor, labels

    svg.select('#staticWheel').remove();
    const staticWheel = svg.append('g').attr('id', 'staticWheel');

    if (props.labels) {
      let newLabels = anchorIntercept(props.labels, transform);
      drawAnchors(staticWheel, newLabels);
      printLabels(staticWheel, newLabels, defs);
    }
  }, [transform, props]); // Print Labels

  function printLabels(dial, labels, defs) {
    let arcPaths = [];

    for (let label of labels) {
      let top = label.angle > Math.PI ? true : false;
      let startAngle;
      let endAngle;
      let radius; // TODO: figure out how to make the radius variable (size of label)

      if (top) {
        startAngle = label.angle - Math.PI / 4;
        endAngle = label.angle + Math.PI / 4;
        radius = CHART_R + 10 + BORDER_BOUNDRY;
      } else {
        startAngle = label.angle + Math.PI / 4;
        endAngle = label.angle - Math.PI / 4;
        radius = CHART_R + 27.5 + BORDER_BOUNDRY;
      }

      arcPaths.push({
        "label": label,
        "path": "M".concat([(0, _radvizMapper.dotX)(radius, startAngle), (0, _radvizMapper.dotY)(radius, startAngle)], " A").concat([radius, radius], " 0 0 ").concat(top ? 1 : 0, " ").concat([(0, _radvizMapper.dotX)(radius, endAngle), (0, _radvizMapper.dotY)(radius, endAngle)]),
        "uuid": (0, _uuid.v4)()
      });
    }

    defs.selectAll('g').append('g').data(arcPaths).enter().append('path').attr('id', d => d.uuid).attr('d', d => d.path);
    dial.selectAll().append('g').data(arcPaths).enter().append('text').attr('text-anchor', 'middle').append('textPath').attr('xlink:href', d => "#".concat(d.uuid)).attr('startOffset', '50%').style('font-family', 'sans-serif').style('font-size', '24px').style('font-weight', '600').style('fill-opacity', 1).style('cursor', 'pointer').text(d => d.label.anchor.toUpperCase()).attr('id', 'anchor-labels').style('fill', LABEL_COLOR);
  } // Draw anchors 


  function drawAnchors(dial, labels) {
    dial.selectAll('g').remove();
    dial.selectAll().append('g').data(labels).enter().append('circle').attr('cx', d => (0, _radvizMapper.dotX)(CHART_R + BORDER_BOUNDRY, d.angle)).attr('cy', d => (0, _radvizMapper.dotY)(CHART_R + BORDER_BOUNDRY, d.angle)).attr('r', 5).style('fill', 'red').style('stroke', '#000').style('stroke-width', 1.5);
  } // Plot data points


  function drawDots(dial, dotData, scale) {
    dial.selectAll().data(dotData).enter().append('circle').attr('cx', d => CHART_R * d.coordinates.x).attr('cy', d => CHART_R * d.coordinates.y).attr('r', d => DOT_R / scale).attr('id', (_, i) => "dot".concat(i)).style('fill', DOT_COLOR).style('fill-opacity', 0.8).style('stroke', DOT_BORDER_COLOR).style('stroke-width', 0.1 / scale).on('mouseover', handleHoverOn).on('mouseout', handleHoverOff);
  }

  function handleHoverOn(i, d) {
    // TODO make the id of dot labels more unique
    (0, _d3Selection.select)(this.parentNode).append('text').attr('id', "dot-labels").attr('x', this.getAttribute('cx') - 10).attr('y', this.getAttribute('cy') - 10).text(d.textFloater);
  }

  function handleHoverOff(i, d) {
    // TODO make the id of dot labels more unique
    (0, _d3Selection.select)(this.parentNode).select("#dot-labels").remove();
  } // Setting saturation and hsl


  function colorInCircumfrence(parent, defs) {
    const ratio = 360 / HUE_ACCURACY;
    const HUE_STEPS = Array.apply(null, {
      length: HUE_ACCURACY
    }).map((_, index) => index * ratio);
    HUE_STEPS.forEach(angle => parent.append('path').attr('key', angle).attr('d', getSvgArcPath(CHART_R + BORDER_BOUNDRY, angle)).attr('fill', "hsl(".concat(angle, ", 100%, 50%)")));
    parent.selectAll("circle").remove();
    parent.append('circle').attr('r', CHART_R + BORDER_BOUNDRY).style('fill', 'url(#saturation)');
    let saturation = defs.append('radialGradient').attr('id', 'saturation');
    saturation.append('stop').attr('offset', '0%').attr('stop-color', '#CCC').attr('stop-opacity', 1);
    saturation.append('stop').attr('offset', '90%').attr('stop-color', '#FFFFFF').attr('stop-opacity', 0);

    function getSvgArcPath(radius, startAngle) {
      let offsetAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 90;
      let a1 = (startAngle + offsetAngle) * Math.PI / 180;
      let a2 = (1.1 + startAngle + offsetAngle) * Math.PI / 180;
      var x1 = radius * Math.sin(a1);
      var y1 = -radius * Math.cos(a1);
      var x2 = radius * Math.sin(a2);
      var y2 = -radius * Math.cos(a2);
      return "M ".concat(x1, " ").concat(y1, "\n\t\t\t\t\tA ").concat(radius, " ").concat(radius, " 0 0 1 ").concat(x2, " ").concat(y2, "\n\t\t\t\t\tL 0 0 Z");
    }
  }

  function drawBorder(parent) {
    let borderColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BORDER_COLOR;
    const id = 'border';
    parent.select('#' + id).remove();
    parent.append('circle').style('fill', 'none').style('stroke', borderColor).style('stroke-width', 3).style('stroke-opacity', 1).attr('r', CHART_R + BORDER_BOUNDRY).attr('id', id);
  }

  function drawCurtain(parent, innerRadius, outerRadius) {
    let smallArcRadius = innerRadius * CHART_R + BORDER_BOUNDRY;
    let largeArcRadius = outerRadius * CHART_R + BORDER_BOUNDRY; // two arc paths that work togeather to create a donut.

    parent.append('path').attr('d', "M 0 0 \n\t\t\t\t\tm ".concat(-largeArcRadius, " 0 \n\t\t\t\t\ta 1 1 0 0 1 ").concat(2 * largeArcRadius, " 0\n\t\t\t\t\tl ").concat(-(largeArcRadius - smallArcRadius), " 0 \n\t\t\t\t\ta 1 1 0 0 0 ").concat(-(2 * smallArcRadius), " 0 \n\t\t\t\t\tl ").concat(-(largeArcRadius - smallArcRadius), " 0 \n\t\t\t\t\tM 0 0\n\t\t\t\t\tm ").concat(-largeArcRadius, " 0 \n\t\t\t\t\ta 1 1 0 0 0 ").concat(2 * largeArcRadius, " 0\n\t\t\t\t\tl ").concat(-(largeArcRadius - smallArcRadius), " 0 \n\t\t\t\t\ta 1 1 0 0 1 ").concat(-(2 * smallArcRadius), " 0 \n\t\t\t\t\tl ").concat(-(largeArcRadius - smallArcRadius), " 0 \n\t\t\t\t\tZ")).attr('id', 'cutout').style('stroke', 'solid').style('fill', CURTAIN_COLOR).style('opacity', '1');
  }
  /**
   * Arguemnts:
   * 		anchorPositions: props.labels
   * 		transform: scale
   * 
   * Explenation: 
   * 		This function adjusts the locations of the labels based 
   * 		on the position of the observable graphic raltive to the real graphic.
   * 		It does so by keeping track of where the "Real" graphic is realtive 
   * 		to the "Observable" graphic. 
   */


  function anchorIntercept(labels, transform) {
    let newLabels = [];

    for (let label of labels) {
      // console.log(label)
      let r = transform.k; // Finding the position of the Real graphic's center. Scaling 
      // transformation by the Chart Radius. to get it to base 1.

      let centerOfRealGraphicX = transform.x / CHART_R;
      let centerOfRealGraphicY = transform.y / CHART_R; // console.log('centerOfRealGraphicX: ', centerOfRealGraphicX)
      // Finding the position of the Observable graphic's center. Scaling
      // by the scale of transformation, and moving in opposite direction of movement.

      let centerObervableGraphicX = -centerOfRealGraphicX / r;
      let centerObervableGraphicY = -centerOfRealGraphicY / r; // console.log('centerObervableGraphicX: ', centerObervableGraphicX)
      // Getting positions of the label relative to the Real graphic.

      let pointXofRealGraphic = (0, _radvizMapper.dotX)(1, label.angle);
      let pointYofRealGraphic = (0, _radvizMapper.dotY)(1, label.angle); // console.log('pointXofMainGraphic: ', pointXofMainGraphic)
      // Calculating dx, dy of the Real graphic's label's coordinates relative to 
      // Observable graphic.

      let dX = pointXofRealGraphic - centerObervableGraphicX;
      let dY = pointYofRealGraphic - centerObervableGraphicY; // console.log('dX: ', dX)
      // Calculating new angle of lables relative to the Observable graphic.

      let angle = (0, _radvizMapper.getTheta)(dX, dY); // console.log('angle: ', rad2deg(angle))

      newLabels.push(_objectSpread(_objectSpread({}, label), {}, {
        'angle': angle
      }));
    }

    return newLabels;
  }

  function movementBoundry(transform) {
    let r = transform.k;
    let x = transform.x / CHART_R;
    let y = transform.y / CHART_R;
    let h = (0, _radvizMapper.hypotneous)(x, y);
    let angle = (0, _radvizMapper.getTheta)(x, y);
    return h < r - 1 ? transform : new _d3Zoom.ZoomTransform(r, (0, _radvizMapper.dotX)((r - 1) * CHART_R, angle), (0, _radvizMapper.dotY)((r - 1) * CHART_R, angle));
  }

  return /*#__PURE__*/_react.default.createElement("svg", {
    ref: svgRef,
    viewBox: "-250 -250 500 500",
    style: {
      borderRadius: '250px'
    }
  });
}

var _default = Radviz;
exports.default = _default;