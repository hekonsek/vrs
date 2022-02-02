import exec from "child_process";
var Vrs = /** @class */ (function () {
    function Vrs() {
    }
    Vrs.prototype.latest = function () {
        var tagsOutput = exec.execSync("git tag");
        console.log(tagsOutput.toString());
        return this.parseTags(tagsOutput.toString())[0];
    };
    Vrs.prototype.parseTags = function (tagsOutput) {
        var lines = tagsOutput.toString().split("\n");
        return lines.slice(1);
    };
    return Vrs;
}());
export { Vrs };
