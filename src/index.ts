#!/usr/bin/env node

import yargs from "yargs";
import {hideBin} from 'yargs/helpers'
import {Vrs} from "./core.js";
import chalk from "chalk";

let yarg = yargs(hideBin(process.argv))
    .scriptName("vrs")
    .command(
        "latest",
        "displays the latest version tag"
    )
    .command(
        "up",
        "bumps up version tag"
    )

let vrs = new Vrs()
if( yarg.argv._[0] == "latest" ) {
    console.log(vrs.latest())
} else if( yarg.argv._[0] == "up" ) {
    let latest = vrs.latest()
    let bumped = vrs.up()
    let green = chalk.yellow
    console.log(green(latest) + " -> " + green(bumped))
} else {
    yarg.showHelp()
}