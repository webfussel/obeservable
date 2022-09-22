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
restaurant.once('get_insurance', insurance_amount => console.log(insurance_amount))

restaurant.emit('order', { food: 'Pizza', drink: 'Beer' })
restaurant.emit('order', { food: 'Sushi', drink: 'Sake' })
restaurant.emit('order', { food: 'Pasta', drink: 'Water' })

restaurant.emit('get_insurance', 2000)
restaurant.emit('get_insurance', 5000) // won't happen - sorry :(

```