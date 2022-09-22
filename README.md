# obeservable
## General
Different observable and - contrary to the name - lightweight objects.
To be fair, in the end it's something everyone could do with a bit of time, but why reinvent the wheel?

How often did you need an Eventbus and created it from scratch again and again?  
How often did you need an Observable Array or HashMap and recreated them once again?

**Never?** Fair enough. But if you need those - check out this package.

## Why "obeseverable"?
It was a typo that I realized too late and I just went with it and created that terrible joke in the description.

# Features
## Current
- Eventbus

## Upcoming
- ObservableMap
- ObservableArray
- whatever you suggest and makes sense

# Docs
## Eventbus
### General
With an `Eventbus` you can create, listen to and emit events from anywhere in your application, to do stuff depending on other stuff that happened.  
If you're familiar with Events in the Browser or HTML, then this will be quite familiar.  

### Usage
#### Create and get Eventbuses
Creating an Eventbus is as simple as creating a new Instance of any object.

```js
const bus = new Eventbus('some_name')
```

You can create as many buses as you wish... if you ever need one than more.
Also, you don't need to store your event bus in some `window` or `global`.
`Eventbus` itself contains a map with all your created buses that you can then get as you need them.
Simply call the static `.get` method and if you want to have more than one bus, destructure the result.
You can get more buses with a simple space between their names.

```js
const { some_bus, some_other_bus, yes_bus } = Eventbus.get('some_bus some_other_bus yes_bus')
```

#### Create, listen to and emit Events
Events only work on `Eventbus` instances - therefore you first need to create one.
You can then add events to the bus via `.on()` or `once()` methods.
`.on()` will execute every time an event is emitted, while `once()` will only be executed the next time the event gets emitted.
You can emit an event with `.emit()`.

```js
const restaurant = new Eventbus('restaurant')
restaurant.on('order', order_details => console.log(order_details))
restaurant.on('pay', payment_details => console.log(payment_details))
restaurant.once('get_insurance', insurance_amount => console.log(insurance_amount))

restaurant.emit('order', { food: 'Pizza', drink: 'Beer' })
restaurant.emit('order pay', { food: 'Sushi', drink: 'Sake' })
restaurant.emit('order', { food: 'Pasta', drink: 'Water' })

restaurant.emit('get_insurance', 2000)
restaurant.emit('get_insurance', 5000) // won't happen - sorry :(
```

#### Get Events
You can get all event names and their specific permanent and one-shot events with the `.get()` method.
Most probably you won't need this, but maybe it's good for debugging purposes.
When given a name you can also only get specific event names.

```js
const bus = new Eventbus('somebus')
bus.on('some_event', () => {})
bus.on('yes_no_event', () => {})
bus.on('some_other_event', () => {})
bus.once('some_other_event', () => {})

const ev1 = bus.get() // to get all event names and their events
const ev2 = bus.get('some_event some_other_event') // to get only those

console.log(ev1)
console.log(ev2)
```
Result:
```js
{ some_event: { once: [], every: [ [Function] ] }, yes_no_event: { once: [], every: [ [Function] ] }, some_other_event: { once: [ [Function] ], every: [ [Function] ] } }
{ some_event: { once: [], every: [ [Function] ] }, some_other_event: { once: [ [Function] ], every: [ [Function] ] } }
```

#### Clear Buses and Events
You can clear buses and events with their respective `.clear()` Function.
Once again: If given the names, you can only clear the specific buses/events(on the bus) or everything if the parameter is empty.

```js
Eventbus.clear() // kill everything
Eventbus.clear('some_bus some_other_bus') // kill only those two

const bus = new Eventbus('bla')
bus.on('bla', () => {})
bus.on('palawa', () => {})
bus.on('joko', () => {})

bus.clear('bla joko') // kill only bla and joko
bus.clear() // kill everything

```