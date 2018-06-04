import * as tf from '@tensorflow/tfjs'
import Plotly from 'plotly.js'
window.tf = tf

//Plotly.newPlot('ideal')

// const xs = tf.tensor1d([0, 1, 2, 3])
// const ys = tf.tensor1d([1.1, 5.9, 16.8, 33.9])
const xs = tf.tensor1d([ 0, 1, 2, 3])
const ys = tf.tensor1d([ 10.2, 16.1, 24.8, 36.3])

const a = tf.scalar(Math.random()).variable()
const b = tf.scalar(Math.random()).variable()
const c = tf.scalar(Math.random()).variable()

// y = a * x^2 + b * x + c.
const f = x => {
  return a.mul(x.square()).add(b.mul(x)).add(c)
}
const loss = (pred, label) => {
  return pred.sub(label).square().mean()
}

const train = () => {
  const learningRate = 0.01
  const optimizer = tf.train.sgd(learningRate)
  for (let i = 0; i < 500; i++) {
    optimizer.minimize(() => loss(f(xs), ys))
  }
}

train()
console.log(`a: ${a.dataSync()}, b: ${b.dataSync()}, c: ${c.dataSync()}`)
const preds = f(xs).dataSync()
const plotData = {
  x: [],
  y: [],
  type: 'scatter'
}
preds.forEach((pred, i) => {
  plotData.x.push(i)
  plotData.y.push(pred)
  console.log(`x: ${i}, pred: ${pred}`)
})
Plotly.newPlot('main', [plotData])

// xsを増やした時どうなるのか？
