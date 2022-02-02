#!/usr/bin/env node

import yargs from "yargs";
import {hideBin} from 'yargs/helpers'
import chalk from "chalk"
import boxen from "boxen"
import {Vrs} from "./core.js";

let argv = yargs(hideBin(process.argv))
    .scriptName("vrs")
    .command(
        "latest",
        "Says hello world! You can specify to [who]m."
    )
    .argv

let who = "world"
if(argv["who"]) {
    who = <string>argv["who"]
}

let msg = new Vrs().latest()

let font = chalk.blue.underline
msg = font(msg)
msg = boxen(msg, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555",

})

console.log(msg)