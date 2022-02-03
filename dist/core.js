import exec from "child_process";
import semver from "semver";
var Vrs = /** @class */ (function () {
    function Vrs() {
    }
    Vrs.prototype.latest = function () {
        var tagsOutput = exec.execSync("git tag");
        return this.parseTags(tagsOutput.toString())[0];
    };
    Vrs.prototype.parseTags = function (tagsOutput) {
        var tagLines = tagsOutput.toString().split("\n");
        var versionLines = tagLines.filter(function (line) { return semver.parse(line) != null; });
        return semver.sort(versionLines).reverse();
    };
    Vrs.prototype.up = function () {
        var latest = semver.parse(this.latest());
        latest.inc("minor");
        exec.execSync("git tag " + latest.toString());
        exec.execSync("git push --tags", { stdio: "ignore" });
        return latest.toString();
    };
    return Vrs;
}());
export { Vrs };
