import 'jest'
import {Vrs} from "../src/core";

describe('SayHello', () => {
    let instance: Vrs;

    beforeEach(() => {
        instance = new Vrs()
    });

    it('should print hello string', async () => {
        let greeting = instance.parseTags("v0.0.0\nv0.1.0\n")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("v0.1.0")
    });

});