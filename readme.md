# Vrs - (sem)version management for your Git projects

Vrs makes it easier to manage versions of your Git-based project. It can be used to:
- find the latest version of your project based on git tags
- release new version of your project

## Installation

To install `vrs` into your system execute the following command:

```
npm install -g https://github.com/hekonsek/vrs/tarball/v0.36.0
```

## Usage

To display the latest version of your project:

```
$ vrs latest
0.28.0
```

To release a new version of your project:

```
$ vrs up
0.28.0 -> 0.29.0
```

## License

This project is distributed under [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html).