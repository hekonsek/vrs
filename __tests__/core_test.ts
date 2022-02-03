import 'jest'
import {Vrs} from "../src/core";
import semver from "semver";

describe('Vrs', () => {
    let vrs: Vrs;

    beforeEach(() => {
        vrs = new Vrs()
    })

    it('should remove last empty output line', async () => {
        let greeting = vrs.parseTags("v0.0.0\nv0.1.0\n")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("v0.1.0")
    })

    it('should bump project version', async () => {
        let latest = semver.parse(vrs.latest())
        let bumped = semver.parse(vrs.up())
        expect(bumped.compare(latest)).toBeGreaterThan(0)
    })

    it('should trim non-semver', async () => {
        let greeting = vrs.parseTags("v0.0.0\nv0.1.0\niamNotVersion\n")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("v0.1.0")
    })

    it('should treat version without prefix as semver', async () => {
        let greeting = vrs.parseTags("0.0.0\n0.1.0")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("0.1.0")
    })

});