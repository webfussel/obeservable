import {Eventbus} from "./Eventbus/Eventbus";

new Eventbus('testbus')
const bus = Eventbus.getBus('testbus')

// you can also directly use something like
// const bus = new Eventbus('testbus')

console.log(Eventbus.getAllBusses())

bus.on('something', (param) => console.log('I should run every time |', param))
bus.on('other', (param) => console.log('I should run every time |', param))
bus.once('something', (param) => console.log('I should run only once |', param))

console.log(Eventbus.getAllBusses())

console.log(bus.get())
bus.emit('something', 'Emit called 1 time')
bus.emit('something', 'Emit called 2 times')
bus.emit('something', 'Emit called 3 times')
console.log(bus.get('something'))
console.log(bus.get())
bus.clear('something', () => console.log('cleared event "something"'))
console.log(bus.get())
bus.emit('something', 'I will not be called anymore')

Eventbus.clearBus('testbus')
console.log(Eventbus.getAllBusses())