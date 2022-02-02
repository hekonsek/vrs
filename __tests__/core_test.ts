import 'jest'
import {Vrs} from "../src/core";
import semver from "semver";

describe('Vrs', () => {
    let vrs: Vrs;

    beforeEach(() => {
        vrs = new Vrs()
    })

    it('should print hello string', async () => {
        let greeting = vrs.parseTags("v0.0.0\nv0.1.0\n")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("v0.1.0")
    })

    it('should bump project version', async () => {
        let latest = semver.parse(vrs.latest())
        let bumped = semver.parse(vrs.up())
        expect(bumped.compare(latest)).toBeGreaterThan(0)
    })

});