'use strict';

const Dgram = require('dgram');
const Code = require('code');
const Lab = require('lab');
const UdpReporter = require('../lib');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

describe('UDP Reporter', () => {
  it('reports data over UDP', { plan: 5 }, (done) => {
    const server = Dgram.createSocket('udp4');

    server.bind(() => {
      const options = {
        port: server.address().port,
        host: server.address().address
      };

      const manager = {
        client: {
          addReporter (reporter) {
            expect(reporter.report).to.be.a.function();
            expect(reporter._options).to.deep.equal(Object.assign(options, { socketType: 'udp4' }));

            reporter.report('foo', function (err) {
              expect(err).to.equal(0);
            });
          }
        }
      };

      server.on('message', (message, rinfo) => {
        expect(message.toString()).to.equal('foo');
        server.close(done);
      });

      UdpReporter.register(manager, options, (err) => {
        expect(err).to.not.exist();
      });
    });
  });

  it('requires port parameter', (done) => {
    UdpReporter.register({}, { host: '' }, (err) => {
      expect(err).to.be.an.instanceof(TypeError);
      expect(err.message).to.equal('missing required port argument');
      done();
    });
  });

  it('requires host parameter', (done) => {
    UdpReporter.register({}, { port: '' }, (err) => {
      expect(err).to.be.an.instanceof(TypeError);
      expect(err.message).to.equal('missing required host argument');
      done();
    });
  });
});
