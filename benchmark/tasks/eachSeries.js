'use strict';

const _ = require('lodash');

module.exports = ({ Aigle, neoAsync }) => {

  return {
    'eachSeries:array': {
      setup: config => {
        this.array = _.times(config.count);
        this.aigleIterator = () => {};
        this.neoAsyncIterator = (n, cb) => cb();
      },
      aigle: () => {
        return Aigle.eachSeries(this.array, this.aigleIterator);
      },
      neoAsync: callback => {
        neoAsync.eachSeries(this.array, this.neoAsyncIterator, callback);
      }
    },
    'eachSeries:array:async': {
      setup: config => {
        this.array = _.times(config.count);
        this.aigleIterator = () => new Aigle(resolve => setImmediate(resolve));
        this.neoAsyncIterator = (n, cb) => setImmediate(cb);
      },
      aigle: () => {
        return Aigle.eachSeries(this.array, this.aigleIterator);
      },
      neoAsync: callback => {
        neoAsync.eachSeries(this.array, this.neoAsyncIterator, callback);
      }
    }
  };
};
