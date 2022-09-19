import {Eventbus} from "./Eventbus";

describe ('Eventbus', () => {
    afterEach(() => {
        Eventbus.clear()
    })

    describe ('constructor', () => {
        it('should add the new object to the static buses field', () => {
            new Eventbus('testbus')

            const expected : string[] = ['testbus']
            const res = Object.keys((Eventbus as any).buses)

            expect(res).toEqual(expected)
        })
        it('should throw error if no name is given', () => {
            expect(() => {new Eventbus('')}).toThrowError('Parameter bus is not correctly filled.')
        })
        it('should throw error if Bus already exists', () => {
            new Eventbus('somebus')
            expect(() => {new Eventbus('somebus')}).toThrowError('Eventbus with name somebus already exists')
        })
    })

    describe ('static get', () => {
        it('should get all Eventbuses if no name given', () => {
            new Eventbus('testbus')
            new Eventbus('anotherbus')
            new Eventbus('yesbus')

            const expected : string[] = ['testbus', 'anotherbus', 'yesbus']
            const res = Object.keys(Eventbus.get())

            expect(res).toEqual(expected)
        })
        it('should get only eventbuses with given name', () => {
            new Eventbus('testbus')
            new Eventbus('anotherbus')
            new Eventbus('yesbus')

            const expected : string[] = ['testbus', 'anotherbus']
            const res = Object.keys(Eventbus.get('testbus anotherbus'))

            expect(res).toEqual(expected)
        })
        it('should only get available buses to IBusStorage', () => {
            new Eventbus('testbus')
            new Eventbus('anotherbus')
            new Eventbus('yesbus')

            const expected = ['testbus', 'yesbus']
            const res = Object.keys(Eventbus.get('testbus klamauk yesbus'))

            expect(res).toEqual(expected)
        })
    })

    describe('static clear', () => {
        it('should clear all buses if no name is given', () => {
            new Eventbus('a')
            new Eventbus('b')
            new Eventbus('c')

            Eventbus.clear()

            const expected = []
            const res = Object.keys(Eventbus.get('a b c'))

            expect(res).toEqual(expected)
        })
        it('should clear only buses with given name', () => {
            new Eventbus('a')
            new Eventbus('b')
            new Eventbus('c')

            Eventbus.clear('a c')

            const expected = ['b']
            const res = Object.keys(Eventbus.get('a b c'))

            expect(res).toEqual(expected)
        })
        it('should call callback after complete clear', () => {
            const mockFn = jest.fn()

            Eventbus.clear('', mockFn)

            expect(mockFn).toHaveBeenCalledTimes(1)
        })
        it('should call callback after specific clear', () => {
            const mockFn = jest.fn()

            Eventbus.clear('a c', mockFn)

            expect(mockFn).toHaveBeenCalledTimes(1)
        })
    })

    describe('on', () => {
        it('should push event to "event.every" on Eventbus instance', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')
            bus.on('test', mockFn)

            const expected = [mockFn]
            const res = (bus as any).events.test.every

            expect(res).toEqual(expected)
        })
        it('should push event to "event.every" for multiple events on Eventbus instance', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')
            bus.on('test lala', mockFn)

            const expected = [mockFn]
            const res = (bus as any).events.test.every
            const res2 = (bus as any).events.lala.every

            expect(res).toEqual(expected)
            expect(res2).toEqual(expected)
        })
        it('should throw error if no event name was given', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')

            expect(() => {bus.on('', mockFn)}).toThrowError('Parameter event is not correctly filled.')
        })
        it('should throw error if no callback was given', () => {
            const nullFunc = undefined as unknown as Function
            const bus = new Eventbus('testbus')

            expect(() => {bus.on('lala', nullFunc)}).toThrowError('No callback was given')
        })
    })
    describe('once', () => {
        it('should push event to "event.once" on Eventbus instance', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')
            bus.once('test', mockFn)

            const expected = [mockFn]
            const res = (bus as any).events.test.once

            expect(res).toEqual(expected)
        })
        it('should push event to "event.once" for multiple events on Eventbus instance', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')
            bus.once('test lala', mockFn)

            const expected = [mockFn]
            const res = (bus as any).events.test.once
            const res2 = (bus as any).events.lala.once

            expect(res).toEqual(expected)
            expect(res2).toEqual(expected)
        })
        it('should throw error if no event name was given', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')

            expect(() => {bus.once('', mockFn)}).toThrowError('Parameter event is not correctly filled.')
        })
        it('should throw error if no callback was given', () => {
            const nullFunc = undefined as unknown as Function
            const bus = new Eventbus('testbus')

            expect(() => {bus.once('lala', nullFunc)}).toThrowError('No callback was given')
        })
    })
    describe('emit', () => {
        it('should throw an error if no event name was given', () => {
            const bus = new Eventbus('testbus')
            expect(() => {bus.emit('')}).toThrowError('Parameter event is not correctly filled.')
        })
        it('should call callbacks for on every emit', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')
            bus.on('test', mockFn)

            bus.emit('test')
            bus.emit('test')
            bus.emit('test')

            expect(mockFn).toHaveBeenCalledTimes(3)
        })
        it('should call callbacks for once only once', () => {
            const mockFn = jest.fn()
            const bus = new Eventbus('testbus')
            bus.once('test', mockFn)

            bus.emit('test')
            bus.emit('test')
            bus.emit('test')

            expect(mockFn).toHaveBeenCalledTimes(1)
        })
        it('should call callbacks for on with details if given', () => {
            const mockFn = jest.fn()
            const details = 'testdata'
            const bus = new Eventbus('testbus')
            bus.on('test', mockFn)

            bus.emit('test', details)

            expect(mockFn).toHaveBeenCalledWith(details)
        })
        it('should call callbacks for once with details if given', () => {
            const mockFn = jest.fn()
            const details = 'testdata'
            const bus = new Eventbus('testbus')
            bus.once('test', mockFn)

            bus.emit('test', details)

            expect(mockFn).toHaveBeenCalledWith(details)
        })
    })
    describe('instance get', () => {
        it('should get all events if no name given', () => {
            const bus = new Eventbus('testbus')
            bus.on('test', () => {})
            bus.on('bla', () => {})
            bus.on('la li', () => {})

            const expected = ['test', 'bla', 'la', 'li']
            const res = Object.keys(bus.get())

            expect(res).toEqual(expected)
        })
        it('should get specific events with given name', () => {
            const bus = new Eventbus('testbus')
            bus.on('test', () => {})
            bus.on('bla', () => {})
            bus.on('la li', () => {})

            const expected = ['test', 'la']
            const res = Object.keys(bus.get('test la'))

            expect(res).toEqual(expected)
        })
        it('should get specific events with given name', () => {
            const bus = new Eventbus('testbus')
            bus.on('test', () => {})
            bus.on('bla', () => {})

            const expected = ['test', 'bla']
            const res = Object.keys(bus.get('test tada bla'))

            expect(res).toEqual(expected)
        })
    })
    describe('instance clear', () => {
        it('should clear all events if no name is given', () => {
            const bus = new Eventbus('testbus')

            bus.on('a', () => {})
            bus.on('b', () => {})
            bus.on('c', () => {})

            bus.clear()

            const expected = []
            const res = Object.keys(bus.get('a b c'))

            expect(res).toEqual(expected)
        })
        it('should clear only events with given name', () => {
            const bus = new Eventbus('testbus')

            bus.on('a', () => {})
            bus.on('b', () => {})
            bus.on('c', () => {})

            bus.clear('a c')

            const expected = ['b']
            const res = Object.keys(bus.get('a b c'))

            expect(res).toEqual(expected)
        })
        it('should call callback after complete clear', () => {
            const bus = new Eventbus('testbus')
            const mockFn = jest.fn()

            bus.clear('', mockFn)

            expect(mockFn).toHaveBeenCalledTimes(1)
        })
        it('should call callback after specific clear', () => {
            const bus = new Eventbus('testbus')
            const mockFn = jest.fn()

            bus.clear('a c', mockFn)

            expect(mockFn).toHaveBeenCalledTimes(1)
        })
    })
})