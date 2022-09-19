import { Eventbus } from "./main";

new Eventbus('testbus')
new Eventbus('otherbus')
new Eventbus('unusedbus')

const buses = Eventbus.get('testbus otherbus')
const testbus = buses.testbus
const otherbus = buses.otherbus

console.log(testbus)
console.log(otherbus)

// you can also directly use something like
// const bus = new Eventbus('testbus')

console.log(Eventbus.get())

testbus.on('something', (param) => console.log('I should run every time |', param))
testbus.on('other', (param) => console.log('I should run every time |', param))
testbus.once('something', (param) => console.log('I should run only once |', param))

console.log(Eventbus.get())

console.log(testbus.get())
testbus.emit('something', 'Emit called 1 time')
testbus.emit('something', 'Emit called 2 times')
testbus.emit('something', 'Emit called 3 times')
console.log(testbus.get('something'))
console.log(testbus.get())
testbus.clear('something', () => console.log('cleared event "something"'))
console.log(testbus.get())
testbus.emit('something', 'I will not be called anymore')

Eventbus.clear('testbus')
console.log(Eventbus.get())