# React Radviz Module

## radvizMapper.js
Positioning function that calculates positions of points.

### using radvizMapper.js

Radviz Mapper takes three parameters. Each parameter has to be provided in order for the graphic to work propely. 

1. The first parameter is a list of JS Object, each JS Object is a datapoing that will be plotted on the Radviz. A datapoint will consist of key value pairs, the key being the attribute of the datapoing and the value being the value for that attribute.
```let data = [{one: 0.5, two: 1.3, three: 0.9}, ..., {one: 1.2, two: 0, three: 4}]```

2. The second parameter is a JS Object. Each key value pair represent how the graphic will label that attribute of the data. For example attribute "one" will be labeled as "First-Anchor". 
```let ANCHORS = {one: "First-Anchor", two: "Second-Anchor", three: Third-Anchor}```

3. THe third parameter is a JS Object. Each key value pair represents where the graphic will position that label on the circumfrence of the Radviz Circle. For example "one" will be positioned at 0 degress. 
```let anchorAngles = {one: 0, two: 120, three: 240}```

Passing all three parameters to the radvizMapper function will return an object with two variables "points" and "labels". Both of these values will later be passed to the RadvizD3 React component that will display them.
```let { points, labels } = radvizMapper(data, ANCHORS, anchorAngles);```

## Radivz.js
React component that implemneted using D3.

Passing these two values as props to the Radviz React component will result graph the points.
``` <Radviz points={points} labels={labels} />```


## Link
Please checkout and share this React component. Also checkout the Observable notebook and play around with a demo.

DEMO: https://viz-research.herokuapp.com/

OBSERVABLE: https://observablehq.com/@gzakhar/radviz

EMAIL: georgy.zakhar@gmail.com
