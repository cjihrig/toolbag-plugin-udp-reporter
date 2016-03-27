# toolbag-plugin-udp-reporter

[![Current Version](https://img.shields.io/npm/v/toolbag-plugin-udp-reporter.svg)](https://www.npmjs.org/package/toolbag-plugin-udp-reporter)
[![Build Status via Travis CI](https://travis-ci.org/continuationlabs/toolbag-plugin-udp-reporter.svg?branch=master)](https://travis-ci.org/continuationlabs/toolbag-plugin-udp-reporter)
![Dependencies](http://img.shields.io/david/continuationlabs/toolbag-plugin-udp-reporter.svg)

[![belly-button-style](https://cdn.rawgit.com/continuationlabs/belly-button/master/badge.svg)](https://github.com/continuationlabs/belly-button)

[Toolbag](https://github.com/continuationlabs/toolbag) reporter over UDP.

## Supported Parameters

  - `port` - The remote port to report to. Required.
  - `host` - The remote host to report to. Required.
  - `socketType` - The type of socket to report over. Defaults to `'udp4'`.

### Example Configuration

Add `toolbag-plugin-udp-reporter` to your `package.json`. Configure the plugin in `.toolbagrc.js` as shown below.

```
'use strict';

const UdpReporter = require('toolbag-plugin-udp-reporter');

module.exports = function config (defaults, callback) {
  callback(null, {
    plugins: [
      {
        plugin: UdpReporter,
        options: {
          id: 'udp reporter',
          socketType: 'udp4',
          port: 5001,
          host: 'localhost'
        }
      }
    ]
  });
};
```
