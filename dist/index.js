#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import chalk from "chalk";
import boxen from "boxen";
import { Vrs } from "./core.js";
var argv = yargs(hideBin(process.argv))
    .scriptName("vrs")
    .command("latest", "Says hello world! You can specify to [who]m.")
    .argv;
var who = "world";
if (argv["who"]) {
    who = argv["who"];
}
var msg = new Vrs().latest();
var font = chalk.blue.underline;
msg = font(msg);
msg = boxen(msg, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
});
console.log(msg);
