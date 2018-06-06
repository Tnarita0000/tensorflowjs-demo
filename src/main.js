import * as tf from '@tensorflow/tfjs'
import { plot, pushPlotData, showFunctionGraph } from './plot'

//Plotly.newPlot('ideal')

const xs = tf.tensor1d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const ys = tf.tensor1d([1, 4, 15, 40, 85, 156, 259, 400, 585, 820, 1111,])
// const xs = tf.tensor1d([ 2.1, 3.2, 4.2, 5.3])
// const ys = tf.tensor1d([ 10.2, 16.1, 24.8, 36.3])

let a
let b
let c
let d

//  y = a*x^3 + b*x^2 + c*x + d 
const f = (x) => {
  return tf.tidy(() => {
    return a.mul(x.pow(tf.scalar(3))) // a * x^3 
      .add(b.mul(x.square())) // + b * x ^ 2 
      .add(c.mul(x)) // + c 
      .add(d);
  }); 
}

const loss = (pred, label) => {
  return pred.sub(label).square().mean()
}

const train = (epoch, optimizer) => {
  a = tf.scalar(Math.random()).variable()
  b = tf.scalar(Math.random()).variable()
  c = tf.scalar(Math.random()).variable()
  d = tf.scalar(Math.random()).variable()
  console.group("before")
  console.log(`a: ${a.dataSync()}`)
  console.log(`b: ${b.dataSync()}`)
  console.log(`c: ${c.dataSync()}`)
  console.log(`d: ${d.dataSync()}`)
  console.groupEnd("before")
  for (let i = 0; i < epoch; i++) {
    optimizer.minimize(() => loss(f(xs), ys))
  }
  console.group("after")
  console.log(`a: ${a.dataSync()}`)
  console.log(`b: ${b.dataSync()}`)
  console.log(`c: ${c.dataSync()}`)
  console.log(`d: ${d.dataSync()}`)
  console.groupEnd("after")

}

const trainWithSgd = (epoch) => {
  const learningRate = 0.5
  const optimizer = tf.train.sgd(learningRate)
  train(epoch, optimizer)
}
const trainWithMomentum = (epoch) => {
  const learningRate = 0.5
  const optimizer = tf.train.momentum(learningRate)
  train(epoch, optimizer)
}
const trainWithAdaGrad = (epoch) => {
  const learningRate = 0.5
  const optimizer = tf.train.adagrad(learningRate)
  train(epoch, optimizer)
}
const trainWithAdaDelta = (epoch) => {
  const learningRate = 0.5
  const optimizer = tf.train.adadelta(learningRate)
  train(epoch, optimizer)
}

const trainWithAdaMax = (epoch) => {
  const learningRate = 0.5
  const optimizer = tf.train.adamax(learningRate)
  train(epoch, optimizer)
}
const trainWithRmsProp = (epoch) => {
  const learningRate = 0.5
  const optimizer = tf.train.rmsprop(learningRate)
  train(epoch, optimizer)
}
const trainWithAdam = (epoch) => {
  const learningRate = 0.5
  const optimizer = tf.train.adam(learningRate)
  train(epoch, optimizer)
}


showFunctionGraph()

let preds
trainWithSgd(100)
preds = f(xs).dataSync()
pushPlotData("SGD", preds)

trainWithMomentum(100)
preds = f(xs).dataSync()
pushPlotData("Momentum", preds)

trainWithAdaGrad(100)
preds = f(xs).dataSync()
pushPlotData("AdaGrad", preds)

trainWithAdaDelta(100)
preds = f(xs).dataSync()
pushPlotData("AdaDelta", preds)

trainWithAdam(100)
preds = f(xs).dataSync()
pushPlotData("Adam", preds)

trainWithAdaMax(100)
preds = f(xs).dataSync()
pushPlotData("AdaMax", preds)

trainWithRmsProp(100)
preds = f(xs).dataSync()
pushPlotData("RmsProp", preds)

pushPlotData("Answer", ys.dataSync())

plot()
