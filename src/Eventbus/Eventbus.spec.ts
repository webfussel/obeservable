import {Eventbus} from "./Eventbus";

describe ('Eventbus', () => {
    afterEach(() => {
        Eventbus.clear()
    })

    describe ('constructor', () => {
        it('should add the new object to the static buses field', () => {
            const expected : string[] = ['testbus']

            new Eventbus('testbus')

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
            const expected : string[] = ['testbus', 'anotherbus', 'yesbus']

            new Eventbus('testbus')
            new Eventbus('anotherbus')
            new Eventbus('yesbus')

            const res = Object.keys(Eventbus.get())

            expect(res).toEqual(expected)
        })
        it('should get only eventbuses with given name', () => {
            const expected : string[] = ['testbus', 'anotherbus']

            new Eventbus('testbus')
            new Eventbus('anotherbus')
            new Eventbus('yesbus')

            const res = Object.keys(Eventbus.get('testbus anotherbus'))

            expect(res).toEqual(expected)
        })
        it('should not add unavailable buses to IBusStorage', () => {
            const expected = ['testbus', 'yesbus']

            new Eventbus('testbus')
            new Eventbus('anotherbus')
            new Eventbus('yesbus')

            const res = Object.keys(Eventbus.get('testbus klamauk yesbus'))

            expect(res).toEqual(expected)
        })
    })
})