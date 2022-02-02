#!/usr/bin/env node

import yargs from "yargs";
import {hideBin} from 'yargs/helpers'
import {Vrs} from "./core.js";

let yarg = yargs(hideBin(process.argv))
    .scriptName("vrs")
    .command(
        "latest",
        "Says hello world! You can specify to [who]m."
    )

if( yarg.argv._[0] == "latest" ) {
    console.log(new Vrs().latest())
} else {
    yarg.showHelp()
}