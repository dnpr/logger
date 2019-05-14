'use strict';

/**
 * Get local time in format like "2019-03-14+02:48:37.662".
 * @function getTime
 * @returns {string} Local time in format like "2019-03-14+02:48:37.662".
 */
function getTime() {
  let date = new Date();
  let offset = date.getTimezoneOffset() * 60000;
  let timeStamp = Date.now() - offset;
  return new Date(timeStamp).toISOString()
    .replace(/T/, '+')
    .replace(/Z/, '')
}

/**
 * Filter circular object for JSON.stringify()
 * @function getCircularReplacer
 * @returns {object} Filtered object.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
 */
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

/**
 * Verify logger config object format.
 * @param {object} opts - Config object.
 * @returns {boolean}
 */
function verifyOptions(opts) {
  if (!opts.info || !opts.error || !opts.verbose)
    return false;
  let objs = Object.values(opts);
  for (let i = 0; i < objs.length; ++i) {
    let obj = objs[i];
    if (typeof obj.id !== 'string' || typeof obj.style !== 'string')
      return false;
  }
  return true;
}

function logger(opts) {

  const style = {
    reset: '\x1b[0m',
  }

  let _opts = {
    info: { id: 'I', style: '' },
    error: { id: 'E', style: '' },
    verbose: { id: 'V', style: '' }
  }

  let optsValid = verifyOptions(opts);
  if (optsValid) {
    _opts = opts;
  } else {
    console.warn('Malformed options!');
  }

  /**
   * Log message to console
   * @function log
   * @param {object} data - The message to log.
   * @param {string} data.type - The message type (required).
   * @param {string} data.msg - The message itself (required).
   * @param {*} [data.dump] - The raw data to inspect (optional).
   */
  this.log = function (data) {
    if (true) {
      /* Print the message. */
      let title = '';
      switch (data.type) {
        case _opts.info.id:
          title += _opts.info.style;
          break;
        case _opts.error.id:
          title += _opts.error.style;
          break;
        default:
          title += _opts.verbose.style;
      }
      title += '[' + data.type + '/' + getTime() + ']' + style.reset;
      console.log(title + ' ' + data.msg);

      /* Print object dump. */
      if (data.dump) {
        let prettyObj = JSON.stringify(data.dump, getCircularReplacer(), 2).split('\n');
        let startBanner = '-----Object Dump Start-----';
        let endBanner = '------Object Dump End------';
        console.log(title + ' ' + startBanner);
        for (let i = 0; i < prettyObj.length; i += 1) {
          console.log(title + ' ' + prettyObj[i]);
        }
        console.log(title + ' ' + endBanner);
      }
    }
  };

  /**
   * Shortcut to log info message
   * @function i
   * @param {string} msg - The message (required).
   * @param {*} [dump] - The raw data to inspect (optional).
   */
  this.i = function (msg, dump) {
    this.log({ type: _opts.info.id, msg: msg, dump: dump });
  }

  /**
   * Shortcut to log error message
   * @function e
   * @param {string} msg - The message (required).
   * @param {*} [dump] - The raw data to inspect (optional).
   */
  this.e = function (msg, dump) {
    this.log({ type: _opts.error.id, msg: msg, dump: dump });
  }

  /**
   * Shortcut to log verbose message
   * @function v
   * @param {string} msg - The message itself (required).
   * @param {*} [dump] - The raw data to inspect (optional).
   */
  this.v = function (msg, dump) {
    this.log({ type: _opts.verbose.id, msg: msg, dump: dump });
  }

}

module.exports = logger;
