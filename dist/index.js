#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import { Vrs } from "./core.js";
import chalk from "chalk";
var yarg = yargs(hideBin(process.argv))
    .scriptName("vrs")
    .command("latest", "displays the latest version tag")
    .command("up", "bumps up version tag");
var vrs = new Vrs();
if (yarg.argv._[0] == "latest") {
    console.log(vrs.latest());
}
else if (yarg.argv._[0] == "up") {
    var latest = vrs.latest();
    var bumped = vrs.up();
    var green = chalk.yellow;
    console.log(green(latest) + " -> " + green(bumped));
}
else {
    yarg.showHelp();
}
