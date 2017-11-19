# base65536-cli

This is a command-line tool for [Base65536](https://github.com/qntm/base65536) encoding and decoding.

## Installation

```bash
$ npm install --global base65536-cli
```

## Usage

```
base65536 FILE
base65536 --wrap LENGTH FILE
base65536 --decode FILE
base65536 --decode --ignore-garbage FILE

base65536 --help
base65536 --version
```

Flags:

* `-w`, `--wrap`: wrap encoded output every LENGTH characters. Defaults to 38. Use 0 to disable
* `-d`, `--decode`: decode data
* `-i`, `--ignore-garbage`: when decoding, ignore non-Base65536 characters

If `FILE` is "-" or omitted, read standard input.

## Examples

```bash
$ echo "hello world" | base65536
驨ꍬ啯𒁷ꍲ㹤
```

Take with line endings. Normally, "hello world" would encode to `驨ꍬ啯𒁷ꍲᕤ`, but `echo` appends a `\n`.

```bash
$ echo -n "驨ꍬ啯𒁷ꍲ㹤" | base65536 --decode
hello world
```

Here the `-n` flag suppresses the trailing `\n`, which would otherwise cause a decoding error since it is not valid Base65536. `base65536 -d -i` is another way around this.

## License

MIT
