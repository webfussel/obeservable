import { IEvent } from './IEvent'

interface IBusStorage {
  [k: string]: Eventbus
}

/**
 * Event emitter and receiver class.
 * Add events with `Eventbus.on('eventName', cbFunc)` or `Eventbus.once('eventName', cbFunc)`
 * and broadcast it with `Eventbus.emit('eventName', parameterObject)`.
 * @see Eventbus.on
 * @see Eventbus.once
 * @see Eventbus.emit
 */
export class Eventbus {
  private static buses: IBusStorage = {}

  private events: IEvent = {}

  /**
     * Creates an Eventbus object and stores it into Eventbus.buses.
     * @param bus Name of the Eventbus
     */
  constructor (bus: string) {
    if (bus.trim().length === 0) throw TypeError(`Parameter bus is not correctly filled. Expected: string with length > 0, got ${bus}`)
    if (Eventbus.buses[bus] !== undefined) throw Error(`Eventbus with name ${bus} already exists`)

    Eventbus.buses[bus] = this
  }

  /**
     * Get Eventbus with given name or all Eventbuses if no name is given.
     * @param bus Name(s) of Eventbus(es) to get
     */
  public static get (bus?: string): IBusStorage {
    if (bus === undefined || bus?.trim().length === 0) return Eventbus.buses

    const res: IBusStorage = {}
    const b = new Set(bus.split(' '))
    ;[...b.values()].filter(bus => Eventbus.buses[bus] !== undefined)
      .forEach(bus => res[bus] = Eventbus.buses[bus])

    return res
  }

  /**
     * Delete Eventbus with given name or all Buses if no name is given.
     * Can receive multiple events with a single space as separator.
     * @param bus Name of Eventbus to delete
     * @param cb Callback to call after deletion
     */
  public static clear (bus?: string, cb?: Function): void {
    if (bus === undefined || bus.trim().length === 0) {
      Eventbus.buses = {}
      cb?.()
      return
    }

    bus.split(' ').forEach(bus => {
      delete Eventbus.buses[bus]
    })

    cb?.()
  }

  /**
     * Executes all events added to given event name with details as parameter.
     * @param event Name of the event
     * @param details Containing more information about the event
     */
  public emit<T>(event: string, details?: T): void {
    if (event.trim().length === 0) throw TypeError(`Parameter event is not correctly filled. Expected: string with length > 0, got ${event}`)

    const ev = new Set(event.split(' '))

    ;[...ev.values()].forEach(event => {
      const events = this.events[event]
      if (events !== undefined) {
        events.every.forEach(cb => cb(details))
        events.once.forEach(cb => cb(details))
        events.once.length = 0
      }
    })
  }

  /**
     * Adds callback to given event name.
     * Can receive multiple events with a single space as separator.
     * @param event Name(s) of the event(s)
     * @param cb Callback to execute on emitting the event
     */
  public on (event: string, cb: Function): void {
    if (event.trim().length === 0) throw TypeError(`Parameter event is not correctly filled. Expected: string with length > 0, got ${event}`)
    if (cb === undefined || cb === null) throw TypeError(`No callback was given for event ${event}`)

    const ev = new Set(event.split(' '))
    ;[...ev.values()].forEach(event => {
      if (this.events[event] === undefined) this.events[event] = { once: [], every: [] }

      this.events[event].every.push(cb)
    })
  }

  /**
     * Adds callback to given event name, that will be removed after call.
     * Can receive multiple events with a single space as separator.
     * @param event Name(s) of the event(s)
     * @param cb Callback to execute once on emitting the event
     */
  public once (event: string, cb: Function): void {
    if (event.trim().length === 0) throw TypeError(`Parameter event is not correctly filled. Expected: string with length > 0, got ${event}`)
    if (cb === undefined || cb === null) throw TypeError(`No callback was given for event ${event}`)

    const ev = new Set(event.split(' '))
    ;[...ev.values()].forEach(event => {
      if (this.events[event] === undefined) this.events[event] = { once: [], every: [] }

      this.events[event].once.push(cb)
    })
  }

  /**
     * Either clears the event(s) given or everything if no event is given.
     * @param event Name of the event(s) to clear from callbacks
     * @param cb Callback to execute after clearing.
     */
  public clear (event?: string, cb?: Function): void {
    if (event === undefined || event.trim().length === 0) {
      this.events = {}
      cb?.()
      return
    }

    event.split(' ').forEach(event => {
      delete this.events[event]
    })

    cb?.()
  }

  /**
     * Gets the event(s) with their callbacks with given name or every event if no name is given.
     * @param event Name(s) of the event(s)
     */
  public get (event?: string): IEvent {
    if (event === undefined || event.trim().length === 0) return this.events

    const res: IEvent = {}

    const ev = new Set(event.split(' '))
    ;[...ev.values()]
      .filter(event => this.events[event] !== undefined)
      .forEach(event => res[event] = this.events[event] ?? null)

    return res
  }
}
