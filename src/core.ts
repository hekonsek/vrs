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
        return semver.sort(versionLines).reverse()
    }

    up(): string {
        let latest = semver.parse(this.latest())
        latest.inc("minor")
        exec.execSync("git tag " + latest.toString())
        exec.execSync("git push --tags", {stdio: "ignore"})
        return latest.toString()
    }

}