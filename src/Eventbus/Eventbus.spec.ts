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
        it('should not add unavailable buses to IBusStorage', () => {
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

            expect(expected).toEqual(res)
        })
        it('should clear only buses with given name', () => {
            new Eventbus('a')
            new Eventbus('b')
            new Eventbus('c')

            Eventbus.clear('a c')

            const expected = ['b']
            const res = Object.keys(Eventbus.get('a b c'))

            expect(expected).toEqual(res)
        })
        it('should call callback after complete clear', () => {
            const mockFn = jest.fn()

            Eventbus.clear(null, mockFn)

            expect(mockFn).toHaveBeenCalledTimes(1)
        })
        it('should call callback after specific clear', () => {
            const mockFn = jest.fn()

            Eventbus.clear('a c', mockFn)

            expect(mockFn).toHaveBeenCalledTimes(1)
        })
    })
})