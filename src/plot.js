import Plotly from 'plotly.js'

const plotData = []
export const pushPlotData = (name, preds) => {
  console.log(preds)
  preds.forEach((pred, idx) => {
  })
  const data = {
    x: [],
    y: [],
    type: 'scatter',
    name: name,
  }
  preds.forEach((pred, i) => {
    data.x.push(i)
    data.y.push(pred)
  })
  plotData.push(data)
}

export const plot = () => {
  Plotly.newPlot('main', plotData, {
    yaxis1: { domain: [0, 0.45] },
    yaxis2: { domain: [0.5, 1] },
    xaxis2: {anchor: 'y2'},
    height: 800,
  },{
    scrollZoom: true,
    showAxisRangeEntryBoxes: false
  })
}

export const showFunctionGraph = () => {
  const a = 1 
  const b = 1 
  const c = 1 
  const d = 1 

  const data = {
    x: [],
    y: [],
    type: 'scatter',
    xaxis: 'x2',
    yaxis: 'y2',
    name: 'x^3 + x^2 + x'
  }

  for(let i=-100; i < 100; i++) {
    data.x.push(i)
    data.y.push(a*Math.pow(i, 3) + b*Math.pow(i, 2) + c*i + d)
  }
  plotData.push(data)
}
