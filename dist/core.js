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
        var lines = tagsOutput.toString().split("\n");
        var linesWithoutLastEmpty = lines.slice(0, lines.length - 1);
        return semver.sort(linesWithoutLastEmpty).reverse();
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
