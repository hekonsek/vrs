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
    return Vrs;
}());
export { Vrs };
