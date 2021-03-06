import 'jest'
import {Vrs} from "../src/core";
import semver from "semver";
import * as fs from "fs";
import exec from "child_process";

describe('Vrs', () => {
    let vrs: Vrs;

    beforeEach(() => {
        vrs = new Vrs()
    })

    it('should remove last empty output line', async () => {
        let greeting = vrs.parseTags("v0.0.0\nv0.1.0\n")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("0.1.0")
    })

    it('should bump project version', async () => {
        let latest = semver.parse(vrs.latest())
        let bumped = semver.parse(vrs.up())
        if(latest == null || bumped == null) {
            throw new Error("Latest and bumped versions cannot be null.")
        }
        expect(bumped.compare(latest)).toBeGreaterThan(0)
    })

    it('should trim non-semver', async () => {
        let greeting = vrs.parseTags("v0.0.0\nv0.1.0\niamNotVersion\n")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("0.1.0")
    })

    it('should treat version without prefix as semver', async () => {
        let greeting = vrs.parseTags("0.0.0\n0.1.0")
        expect(greeting).toHaveLength(2)
        expect(greeting[0]).toBe("0.1.0")
    })

    it('should return undefined for no version', async () => {
        let tmpDir = fs.mkdtempSync("/tmp/test")
        exec.execSync("git init", {cwd: tmpDir})
        vrs = new Vrs({workingDirectory: tmpDir})
        expect(vrs.latest()).toBeUndefined()
    })

    it('should release 0.1.0 for no version', async () => {
        let tmpDir = fs.mkdtempSync("/tmp/test")
        exec.execSync("git init", {cwd: tmpDir})
        fs.writeFileSync(tmpDir + "/readme.md", "someContent")
        exec.execSync("git add readme.md", {cwd: tmpDir})
        exec.execSync("git commit -m 'Initial commit'", {cwd: tmpDir})
        vrs = new Vrs({workingDirectory: tmpDir})
        expect(vrs.latest()).toBeUndefined()
        try {
            vrs.up()
        } catch (err) {
            if(!(err as Error).message.includes("Command failed: git push --tags")) {
                throw err
            }
        }
        expect(vrs.latest()).toBe("0.1.0")
    })

});