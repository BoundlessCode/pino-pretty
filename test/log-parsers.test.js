'use strict'

const test = require('tap').test
const prettyFactory = require('../')

const logLine = '{"level":30,"time":1522431328992,"msg":"hello world","pid":42,"hostname":"foo","v":1}\n'

test('extensible log parsers tests', (t) => {
  t.test('custom log parsers are executed', (t) => {
    t.plan(1)
    let executed = false
    const pretty = prettyFactory({
      logParsers: [
        (input) => {
          executed = true
          return { output: input }
        }
      ]
    })
    const formatted = pretty(logLine)
    t.is(executed, true, `custom log parser was not executed: ${formatted}`)
  })

  t.test('use input for custom log parsers that return undefined result object', (t) => {
    t.plan(1)
    const builtInPretty = prettyFactory()
    const customPretty = prettyFactory({
      logParsers: [
        () => undefined
      ]
    })
    const builtInOutput = builtInPretty(logLine)
    const customOutput = customPretty(logLine)
    t.is(customOutput, builtInOutput, `input did not pass through on undefined result`)
  })

  t.end()
})