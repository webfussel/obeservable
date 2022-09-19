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
        it('should return null for non available buses', () => {
            const expected = null

            new Eventbus('testbus')
            new Eventbus('anotherbus')
            new Eventbus('yesbus')

            const res = Eventbus.get('klamauk').klamauk

            expect(res).toEqual(expected)
        })
    })
})