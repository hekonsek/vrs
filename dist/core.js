import exec from "child_process";
import semver from "semver";
var Vrs = /** @class */ (function () {
    function Vrs(vrsOptions) {
        this.vrsOptions = vrsOptions;
    }
    Vrs.prototype.execOptions = function () {
        return this.vrsOptions ? { cwd: this.vrsOptions.workingDirectory } : {};
    };
    Vrs.prototype.latest = function () {
        exec.execSync("git fetch --tags", this.execOptions());
        var tagsOutput = exec.execSync("git tag", this.execOptions());
        return this.parseTags(tagsOutput.toString())[0];
    };
    Vrs.prototype.parseTags = function (tagsOutput) {
        var tagLines = tagsOutput.toString().split("\n");
        var versionLines = tagLines.filter(function (line) { return semver.parse(line) != null; });
        var linesWithoutPrefix = versionLines.map(function (line) { return line[0] == "v" ? line.slice(1) : line; });
        return semver.sort(linesWithoutPrefix).reverse();
    };
    Vrs.prototype.up = function () {
        var latest = semver.parse(this.latest() || "0.0.0");
        if (!latest)
            throw new Error("Latest version cannot be parsed nor defaulted.");
        latest.inc("minor");
        exec.execSync("git tag v" + latest.toString(), this.execOptions());
        var options = this.execOptions();
        options.stdio = "ignore";
        exec.execSync("git push --tags", options);
        return latest.toString();
    };
    return Vrs;
}());
export { Vrs };
