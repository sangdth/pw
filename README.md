pw
==

Simple password manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![Downloads/week](https://img.shields.io/npm/dw/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![License](https://img.shields.io/npm/l/pw.svg)](https://github.com/sangdth/pw/blob/master/package.json)


<p align="center"><img src="/img/demo.gif?raw=true"/></p>

# Features:
- :white_check_mark: All password encrypted.
- :white_check_mark: Fuzzy search by default (*).
- :white_check_mark: Typescript supported.
- :white_check_mark: Auto generate strong password.
- :white_check_mark: Open source.

(*) If you use the `cp` (copy) command, it will execute the fuzzy search and try to guess the best match for you. E.g. `pw cp goog` will return the `google` result if you had one. In case it has multiple results, a table will be displayed so you can select.

#### Warning:heavy_exclamation_mark: Use with your own risk! This is a [dogfooding](https://www.wikiwand.com/en/Eating_your_own_dog_food) project.
TODO:
- [ ] Fix Travis CI.
- [ ] Make authenticate.
- [ ] Session for each login.
- [ ] Separate data and preferences.
- [ ] Release for Homebrew, apt etc.
- [ ] Sync with mobile device.
- [ ] Backup/restore.

# TOC

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
// Install
$ npm install -g @sangdth/pw

// Setup your default information
$ pw init

// Create new password with 'google' alias
$ pw add google

// Get the 'google' password
$ pw cp google

// Check version
$ pw -v
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

_See code: [src/commands/add.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-41/src/commands/add.ts)_

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

_See code: [src/commands/cp.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-41/src/commands/cp.ts)_

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

_See code: [src/commands/export.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-41/src/commands/export.ts)_

## `pw find [INPUT]`

Get one or more specific passwords

```
USAGE
  $ pw find [INPUT]

OPTIONS
  -a, --alias=alias
  -e, --email=email
  -i, --index=index

ALIASES
  $ pw get
  $ pw select
```

_See code: [src/commands/find.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-41/src/commands/find.ts)_

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

_See code: [src/commands/ls.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-41/src/commands/ls.ts)_

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

_See code: [src/commands/rm.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-41/src/commands/rm.ts)_

## `pw setup`

Set up pw

```
USAGE
  $ pw setup

ALIASES
  $ pw init
  $ pw config
```

_See code: [src/commands/setup.ts](https://github.com/sangdth/pw/blob/v1.0.0-beta-41/src/commands/setup.ts)_

## `pw update [CHANNEL]`

update the pw CLI

```
USAGE
  $ pw update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_
<!-- commandsstop -->
