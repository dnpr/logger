/**
 * @module Logger - An advanced console logger
 */

'use strict';

const Logger = require('./logger');

const style = {
  fgBlack: '\x1b[30m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgPink: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
}

let opts = {
  info: { id: 'I', style: style.bold + style.fgYellow },
  error: { id: 'E', style: style.bold + style.fgRed },
  verbose: { id: 'V', style: style.bold + style.fgCyan }
}

const logger = new Logger(opts);

module.exports = logger;