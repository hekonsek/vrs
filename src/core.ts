import exec from "child_process";
import semver from "semver";

export class Vrs {

    latest(): string {
        let tagsOutput = exec.execSync("git tag")
        return this.parseTags(tagsOutput.toString())[0]
    }

    parseTags(tagsOutput: String): string[] {
        let tagLines = tagsOutput.toString().split("\n")
        let versionLines = tagLines.filter(line => semver.parse(line) != null)
        let linesWithoutPrefix = versionLines.map(line => line[0]=="v" ? line.slice(1) : line)
        return semver.sort(linesWithoutPrefix).reverse()
    }

    up(): string {
        let latest = semver.parse(this.latest())
        latest.inc("minor")
        exec.execSync("git tag v" + latest.toString())
        exec.execSync("git push --tags", {stdio: "ignore"})
        return latest.toString()
    }

}