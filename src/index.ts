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

let vrs = new Vrs("x")
let yellow = chalk.yellow
if( yarg.argv._[0] == "latest" ) {
    let latest = vrs.latest()
    console.log(latest || yellow("No version defined yet."))
} else if( yarg.argv._[0] == "up" ) {
    let latest = vrs.latest()
    if(latest) {
        let bumped = vrs.up()
        console.log(yellow(latest) + " -> " + yellow(bumped))
    } else {
        console.log(yellow("No version defined yet."))
    }
} else {
    yarg.showHelp()
}