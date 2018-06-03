import * as tf from '@tensorflow/tfjs'
import Plotly from 'plotly.js'

const xs = tf.tensor1d([0, 1, 2, 3])
const ys = tf.tensor1d([1.1, 5.9, 16.8, 33.9])

const a = tf.scalar(Math.random()).variable()
const b = tf.scalar(Math.random()).variable()
const c = tf.scalar(Math.random()).variable()

// y = a * x^2 + b * x + c.
const f = x => a.mul(x.square()).add(b.mul(x)).add(c)
const loss = (pred, label) => pred.sub(label).square().mean()

const learningRate = 0.01
const optimizer = tf.train.sgd(learningRate)

// Train the model.
for (let i = 0; i < 10; i++) {
  optimizer.minimize(() => loss(f(xs), ys))
}

// Make predictions.
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
