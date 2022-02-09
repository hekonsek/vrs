import exec from "child_process";
import semver from "semver";
var Vrs = /** @class */ (function () {
    function Vrs(workingDirectory) {
        this.workingDirectory = workingDirectory;
    }
    Vrs.prototype.latest = function () {
        var tagsOutput = exec.execSync("git tag", { cwd: this.workingDirectory });
        return this.parseTags(tagsOutput.toString())[0];
    };
    Vrs.prototype.parseTags = function (tagsOutput) {
        var tagLines = tagsOutput.toString().split("\n");
        var versionLines = tagLines.filter(function (line) { return semver.parse(line) != null; });
        var linesWithoutPrefix = versionLines.map(function (line) { return line[0] == "v" ? line.slice(1) : line; });
        return semver.sort(linesWithoutPrefix).reverse();
    };
    Vrs.prototype.up = function () {
        var latest = semver.parse(this.latest());
        latest.inc("minor");
        exec.execSync("git tag v" + latest.toString(), { cwd: this.workingDirectory });
        exec.execSync("git push --tags", { stdio: "ignore", cwd: this.workingDirectory });
        return latest.toString();
    };
    return Vrs;
}());
export { Vrs };
