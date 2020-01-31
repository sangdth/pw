pw
==

Simple password manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![Downloads/week](https://img.shields.io/npm/dw/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![License](https://img.shields.io/npm/l/pw.svg)](https://github.com/sangdth/pw/blob/master/package.json)


<p align="center"><img src="/img/demo.gif?raw=true"/></p>


#### Warning! Use with your own risk! This is [dogfooding](https://www.wikiwand.com/en/Eating_your_own_dog_food) project.
TODO:
- [ ] Make authenticate.
- [ ] Session for each login.
- [ ] Separate data and preferences.
- [ ] Release for Homebrew, apt etc.
- [ ] Sync with mobile device.
- [ ] Backup/restore.

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
@sangdth/pw/1.0.0-beta-42 darwin-x64 node-v12.14.1
$ pw --help [COMMAND]
USAGE
  $ pw COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pw add ALIAS`](#pw-add-alias)
* [`pw cp [ALIAS]`](#pw-cp-alias)
* [`pw export`](#pw-export)
* [`pw find [INPUT]`](#pw-find-input)
* [`pw help [COMMAND]`](#pw-help-command)
* [`pw ls`](#pw-ls)
* [`pw rm [ALIASES]`](#pw-rm-aliases)
* [`pw setup`](#pw-setup)
* [`pw update [CHANNEL]`](#pw-update-channel)

## `pw add ALIAS`

Add new record

```
USAGE
  $ pw add ALIAS

ARGUMENTS
  ALIAS  The alias (name) for password.

OPTIONS
  -a, --auto

ALIASES
  $ pw create
  $ pw new
  $ pw generate
```

_See code: [src/commands/add.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-42/src/commands/add.ts)_

## `pw cp [ALIAS]`

Copy a record

```
USAGE
  $ pw cp [ALIAS]

ARGUMENTS
  ALIAS  If flags are omitted, first arg will become alias

ALIASES
  $ pw copy
```

_See code: [src/commands/cp.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-42/src/commands/cp.ts)_

## `pw export`

Print out all passwords

```
USAGE
  $ pw export

OPTIONS
  -s, --show

ALIASES
  $ pw backup
```

_See code: [src/commands/export.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-42/src/commands/export.ts)_

## `pw find [INPUT]`

Get one or more specific passwords

```
USAGE
  $ pw find [INPUT]

ALIASES
  $ pw get
  $ pw select
```

_See code: [src/commands/find.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-42/src/commands/find.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

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

_See code: [src/commands/ls.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-42/src/commands/ls.ts)_

## `pw rm [ALIASES]`

Remove a record

```
USAGE
  $ pw rm [ALIASES]

ARGUMENTS
  ALIASES  The alias of password item, you can use comma-separated.

ALIASES
  $ pw remove
  $ pw delete
  $ pw del
```

_See code: [src/commands/rm.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-42/src/commands/rm.ts)_

## `pw setup`

Set up pw

```
USAGE
  $ pw setup

ALIASES
  $ pw init
  $ pw config
```

_See code: [src/commands/setup.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-42/src/commands/setup.ts)_

## `pw update [CHANNEL]`

update the pw CLI

```
USAGE
  $ pw update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_
<!-- commandsstop -->
