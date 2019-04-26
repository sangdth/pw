pw
==

Simple password manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pw.svg)](https://npmjs.org/package/pw)
[![Downloads/week](https://img.shields.io/npm/dw/pw.svg)](https://npmjs.org/package/pw)
[![License](https://img.shields.io/npm/l/pw.svg)](https://github.com/sangdth/pw/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pw
$ pw COMMAND
running command...
$ pw (-v|--version|version)
pw/0.0.0 darwin-x64 node-v10.15.3
$ pw --help [COMMAND]
USAGE
  $ pw COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pw hello [FILE]`](#pw-hello-file)
* [`pw help [COMMAND]`](#pw-help-command)

## `pw hello [FILE]`

describe the command here

```
USAGE
  $ pw hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ pw hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/sangdth/pw/blob/v0.0.0/src/commands/hello.ts)_

## `pw help [COMMAND]`

display help for pw

```
USAGE
  $ pw help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
