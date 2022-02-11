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
var yellow = chalk.yellow;
if (yarg.argv._[0] == "latest") {
    var latest = vrs.latest();
    console.log(latest || yellow("No version defined yet."));
}
else if (yarg.argv._[0] == "up") {
    var latest = vrs.latest();
    var bumped = vrs.up();
    console.log(yellow(latest) + " -> " + yellow(bumped));
}
else {
    yarg.showHelp();
}
