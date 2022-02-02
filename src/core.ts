import exec from "child_process";
import semver from "semver";

export class Vrs {

    latest(): string {
        let tagsOutput = exec.execSync("git tag")
        return this.parseTags(tagsOutput.toString())[0]
    }

    parseTags(tagsOutput: String): string[] {
        let lines = tagsOutput.toString().split("\n")
        let linesWithoutLastEmpty = lines.slice(0, lines.length - 1)
        return semver.sort(linesWithoutLastEmpty).reverse()
    }

}