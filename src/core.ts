import exec from "child_process";

export class Vrs {

    latest(): string {
        let tagsOutput = exec.execSync("git tag")
        console.log(tagsOutput.toString())
        return this.parseTags(tagsOutput.toString())[0]
    }

    parseTags(tagsOutput: String): string[] {
        let lines = tagsOutput.toString().split("\n")
        return lines.slice(1)
    }

}