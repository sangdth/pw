pw
==

Simple password manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![Downloads/week](https://img.shields.io/npm/dw/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![License](https://img.shields.io/npm/l/pw.svg)](https://github.com/sangdth/pw/blob/master/package.json)

#### Warning! Use with your own risk! This is learning project, and still in development, passwords are not saved in raw text, but simple encrypted with static pass and salt. In the future I will try to make it stronger and more flexible.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @sangdth/pw
$ pw COMMAND
running command...
$ pw (-v|--version|version)
@sangdth/pw/1.0.0-beta-18 darwin-x64 node-v10.15.3
$ pw --help [COMMAND]
USAGE
  $ pw COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pw add [ALIAS] [LOGIN] [EMAIL] [PASSWORD]`](#pw-add-alias-login-email-password)
* [`pw cp`](#pw-cp)
* [`pw find`](#pw-find)
* [`pw help [COMMAND]`](#pw-help-command)
* [`pw ls`](#pw-ls)
* [`pw rm`](#pw-rm)

## `pw add [ALIAS] [LOGIN] [EMAIL] [PASSWORD]`

Add new record

```
USAGE
  $ pw add [ALIAS] [LOGIN] [EMAIL] [PASSWORD]

OPTIONS
  -l, --length=length
  -s, --show

ALIASES
  $ pw create
  $ pw new
  $ pw generate
```

_See code: [src/commands/add.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-18/src/commands/add.ts)_

## `pw cp`

Copy a record

```
USAGE
  $ pw cp

OPTIONS
  -a, --alias=alias
  -e, --email=email
  -i, --index=index

ALIASES
  $ pw copy
```

_See code: [src/commands/cp.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-18/src/commands/cp.ts)_

## `pw find`

Get one or more specific passwords

```
USAGE
  $ pw find

OPTIONS
  -a, --alias=alias
  -e, --email=email
  -i, --index=index

ALIASES
  $ pw get
  $ pw select
```

_See code: [src/commands/find.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-18/src/commands/find.ts)_

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

## `pw ls`

Print out all passwords

```
USAGE
  $ pw ls

OPTIONS
  -s, --show

ALIASES
  $ pw list
  $ pw la
```

_See code: [src/commands/ls.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-18/src/commands/ls.ts)_

## `pw rm`

Remoe a record

```
USAGE
  $ pw rm

OPTIONS
  -a, --alias=alias
  -e, --email=email
  -i, --index=index

ALIASES
  $ pw remove
  $ pw delete
  $ pw del
```

_See code: [src/commands/rm.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-18/src/commands/rm.ts)_
<!-- commandsstop -->
