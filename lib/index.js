'use strict';

const Dgram = require('dgram');
const Merge = require('lodash.merge');
const defaults = {
  socketType: 'udp4'
};


module.exports = { register };


function register (manager, options, callback) {
  const reporter = new UdpReporter(options);

  if (options.port === undefined) {
    return callback(new TypeError('missing required port argument'));
  }

  if (options.host === undefined) {
    return callback(new TypeError('missing required host argument'));
  }

  manager.client.addReporter(reporter);
  callback();
}


function UdpReporter (options) {
  this._options = Merge({}, defaults, options);
}


UdpReporter.prototype.report = function report (message, callback) {
  const settings = this._options;
  const client = Dgram.createSocket(settings.socketType);

  client.send(message,
              0,
              message.length,
              settings.port,
              settings.host,
              function sendCb (err) {
                client.close(function closeCb () {
                  callback(err);
                });
              });
};
