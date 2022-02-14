import exec, {ExecSyncOptionsWithBufferEncoding} from "child_process";
import semver from "semver";

export class Vrs {

    private readonly vrsOptions?: VrsOptions

    constructor(vrsOptions?: VrsOptions) {
        this.vrsOptions = vrsOptions;
    }

    private execOptions(): ExecSyncOptionsWithBufferEncoding {
        return this.vrsOptions ? {cwd: this.vrsOptions.workingDirectory} : {}
    }

    latest(): string {
        let tagsOutput = exec.execSync("git tag", this.execOptions())
        return this.parseTags(tagsOutput.toString())[0]
    }

    parseTags(tagsOutput: String): string[] {
        let tagLines = tagsOutput.toString().split("\n")
        let versionLines = tagLines.filter(line => semver.parse(line) != null)
        let linesWithoutPrefix = versionLines.map(line => line[0]=="v" ? line.slice(1) : line)
        return semver.sort(linesWithoutPrefix).reverse()
    }

    up(): string {
        let latest = semver.parse(this.latest() || "0.0.0")
        if(!latest)
            throw new Error("Latest version cannot be parsed nor defaulted.")
        latest.inc("minor")
        exec.execSync("git tag v" + latest.toString(), this.execOptions())
        let options = this.execOptions()
        options.stdio = "ignore"
        exec.execSync("git push --tags", options)
        return latest.toString()
    }

}

export interface VrsOptions {

    workingDirectory: string

}