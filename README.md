pw
==

Simple password manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![Downloads/week](https://img.shields.io/npm/dw/pw.svg)](https://npmjs.org/package/@sangdth/pw)
[![License](https://img.shields.io/npm/l/pw.svg)](https://github.com/sangdth/pw/blob/master/package.json)

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
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pw add`](#pw-add)
* [`pw find`](#pw-find)
* [`pw cp`](#pw-cp)
* [`pw ls`](#pw-ls)
* [`pw rm`](#pw-rm)

## `pw add`

Add new password record

```
USAGE
  $ pw add [arguments]

ARGUMENTS
  [ alias, login, email, password ]
  Can except empty arguments.

EXAMPLE
  $ pw add github
```

## `pw ls`

List all records in table

```
USAGE
  $ pw ls

OPTIONS
  -s, --show   expose all password in plain text

EXAMPLE
  $ pw ls -s
```

## `pw find`

Find a password record

```
USAGE
  $ pw find [index|alias]

OPTIONS
  -i, --index   find the record at index of table
  -a, --alias   find the record with alias name

EXAMPLE
  $ pw find -a git
```


## `pw cp`

Copy password record

```
USAGE
  $ pw cp [index|alias]

OPTIONS
  -i, --index   copy the record at index of table
  -a, --alias   copy the record with alias name

EXAMPLE
  $ pw cp -a github
```

## `pw rm`

Remove password record

```
USAGE
  $ pw rm [index|alias]

OPTIONS
  -i, --index   remove the record at index of table
  -a, --alias   remove the record with alias name

EXAMPLE
  $ pw rm -a github
```
<!-- commandsstop -->
