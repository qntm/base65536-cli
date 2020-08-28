'use strict'

import { execSync } from 'child_process'

describe('CLI', function () {
  it('encodes', function () {
    expect(execSync('node ./dist/index.js', {
      input: Buffer.from('hello world', 'utf8')
    })).toEqual(Buffer.from('驨ꍬ啯𒁷ꍲᕤ', 'utf8'))
  })

  it('wraps', function () {
    expect(execSync('node ./dist/index.js --wrap 2', {
      input: Buffer.from('hello world', 'utf8')
    }).toString('utf8')).toEqual('驨ꍬ\n啯𒁷\nꍲᕤ')
  })

  it('encodes with a trailing line break', function () {
    expect(execSync('node ./dist/index.js', {
      input: Buffer.from('hello world\n', 'utf8')
    })).toEqual(Buffer.from('驨ꍬ啯𒁷ꍲ㹤', 'utf8'))
  })

  it('decodes', function () {
    expect(execSync('node ./dist/index.js --decode', {
      input: Buffer.from('驨ꍬ啯𒁷ꍲ㹤', 'utf8')
    })).toEqual(Buffer.from('hello world\n', 'utf8'))
  })

  it('chokes on garbage', function () {
    // TODO: figure out how to suppress the STDERR from this
    expect(() => execSync('node ./dist/index.js --decode', {
      input: Buffer.from('驨ꍬ啯𒁷ꍲ㹤\n', 'utf8')
    })).toThrow()
  })

  it('ignores garbage when you set the flag', function () {
    expect(execSync('node ./dist/index.js --decode --ignore-garbage', {
      input: Buffer.from('驨ꍬ啯𒁷ꍲ㹤\n', 'utf8')
    })).toEqual(Buffer.from('hello world\n', 'utf8'))
  })

  it('outputs help', function () {
    expect(execSync('node ./dist/index.js --help').toString('utf8'))
      .toMatch(/base65536 FILE/)
  })

  it('outputs a version', function () {
    expect(execSync('node ./dist/index.js --version').toString('utf8'))
      .toMatch(/^base65536-cli@\d+\.\d+\.\d+\n$/)
  })
})
