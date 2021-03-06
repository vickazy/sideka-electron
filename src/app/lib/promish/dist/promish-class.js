'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function generatePromish(Base) {
  Base = require("es6-promise").Promise;
  function isErrorClass(type) {
    while (type && type !== Object) {
      if (type === Error || type instanceof Error) {
        return true;
      }
      type = type.prototype;
    }
    return false;
  }

  var Promish = function (_Base) {
    _inherits(Promish, _Base);

    function Promish(f) {
      _classCallCheck(this, Promish);

      if (f instanceof Promish) {
        var _ret;

        return _ret = f, _possibleConstructorReturn(_this, _ret);
      } else if (f instanceof Promise || f.then instanceof Function) {
        var _this = _possibleConstructorReturn(this, (Promish.__proto__ || Object.getPrototypeOf(Promish)).call(this, function (resolve, reject) {
          return f.then(resolve, reject);
        }));
      } else if (f instanceof Error) {
        var _this = _possibleConstructorReturn(this, (Promish.__proto__ || Object.getPrototypeOf(Promish)).call(this, function (resolve, reject) {
          return reject(f);
        }));
        // sugar for 'rethrow'

      } else if (f instanceof Function) {
        var _this = _possibleConstructorReturn(this, (Promish.__proto__ || Object.getPrototypeOf(Promish)).call(this, f));
      } else {
        var _this = _possibleConstructorReturn(this, (Promish.__proto__ || Object.getPrototypeOf(Promish)).call(this, function (resolve) {
          return resolve(f);
        }));
        // anything else, resolve with value

      }
      return _possibleConstructorReturn(_this);
    }

    _createClass(Promish, [{
      key: 'finally',
      value: function _finally(h) {
        return this.then(function (value) {
          return Promish.resolve(h()).then(function () {
            return value;
          });
        }, function (error) {
          return Promish.resolve(h()).then(function () {
            return Promish.reject(error);
          });
        });
      }
    }, {
      key: 'catch',
      value: function _catch() {
        // extend catch with type-aware or matcher handling
        var args = Array.from(arguments);
        var h = args.pop();
        return this.then(undefined, function (error) {
          // default catch - no matchers. Just return handler result
          if (!args.length) {
            return h(error);
          }

          //console.log('catch matcher', error)
          // search for a match in argument order and return handler result if found
          for (var i = 0; i < args.length; i++) {
            var matcher = args[i];
            if (isErrorClass(matcher)) {
              if (error instanceof matcher) {
                return h(error);
              }
            } else if (matcher instanceof Function) {
              //console.log('matcher function')
              if (matcher(error)) {
                //console.log('matched!!')
                return h(error);
              }
            }
          }

          // no match was found send this error to the next promise handler in the chain
          return new Promish(function (resolve, reject) {
            return reject(error);
          });
        });
      }
    }, {
      key: 'delay',
      value: function delay(timeout) {
        return this.then(function (value) {
          return new Promish(function (resolve) {
            setTimeout(function () {
              resolve(value);
            }, timeout);
          });
        });
      }
    }, {
      key: 'map',
      value: function map(f) {
        return this.then(function (values) {
          return Promish.map(values, f);
        });
      }
    }, {
      key: 'reduce',
      value: function reduce(f, val0) {
        return this.then(function (values) {
          return Promish.reduce(values, f, val0);
        });
      }
    }, {
      key: 'spread',
      value: function spread(f) {
        return this.then(function (values) {
          return Promish.all(values);
        }).then(function (values) {
          return f.apply(undefined, values);
        });
      }
    }], [{
      key: 'map',
      value: function map(values, f) {
        return Promish.all(values.map(function (v, i) {
          return Promish.resolve(v).then(function (v2) {
            return f(v2, i, values.length);
          });
        }));
      }
    }, {
      key: 'reduce',
      value: function reduce(values, f, val0) {
        var promise;
        var count = 0;
        if (val0 !== undefined) {
          promise = Promish.resolve(val0);
        } else if (values.length > 1) {
          promise = Promish.resolve(values[count++]);
        } else {
          return Promish.resolve(values[0]);
        }
        while (count < values.length) {
          (function (i) {
            promise = promise.then(function (value) {
              return Promish.resolve(values[i]).then(function (v2) {
                return f(value, v2, i);
              });
            });
          })(count++);
        }return promise;
      }
    }, {
      key: 'delay',
      value: function delay(timeout, value) {
        return new Promish(function (resolve) {
          setTimeout(function () {
            resolve(value);
          }, timeout);
        });
      }
    }, {
      key: 'resolve',
      value: function resolve(value) {
        return new Promish(function (resolve) {
          resolve(value);
        });
      }
    }, {
      key: 'reject',
      value: function reject(error) {
        return new Promish(function (resolve, reject) {
          reject(error);
        });
      }

      // Wrap a synchronous method and resolve with its return value

    }, {
      key: 'method',
      value: function method(f) {
        return function () {
          var self = this; // is this necessary?
          var args = Array.from(arguments);
          return new Promish(function (resolve) {
            return resolve(f.apply(self, args));
          });
        };
      }

      //

    }, {
      key: 'apply',
      value: function apply(f, args) {
        // take a copy of args because a) might not be Array and b) no side-effects
        args = Array.from(args);
        return new Promish(function (resolve, reject) {
          args.push(function () {
            var error = Array.prototype.shift.apply(arguments);
            if (error) {
              reject(error);
            } else {
              if (arguments.length === 1) {
                resolve(arguments[0]);
              } else {
                resolve(arguments);
              }
            }
          });
          f.apply(undefined, args);
        });
      }
    }, {
      key: 'nfapply',
      value: function nfapply(f, args) {
        return Promish.apply(f, args);
      }
    }, {
      key: 'call',
      value: function call() {
        var f = Array.prototype.shift.apply(arguments);
        return Promish.apply(f, arguments);
      }
    }, {
      key: 'nfcall',
      value: function nfcall() {
        return Promish.call.apply(null, arguments);
      }
    }, {
      key: 'post',
      value: function post(o, f, a) {
        return Promish.apply(f.bind(o), a);
      }
    }, {
      key: 'npost',
      value: function npost(o, f, a) {
        return Promish.apply(f.bind(o), a);
      }
    }, {
      key: 'invoke',
      value: function invoke() {
        var o = Array.prototype.shift.apply(arguments);
        var f = Array.prototype.shift.apply(arguments);
        return Promish.apply(f.bind(o), arguments);
      }
    }, {
      key: 'ninvoke',
      value: function ninvoke() {
        return Promish.invoke(arguments);
      }

      // create curry function for nfcall

    }, {
      key: 'promisify',
      value: function promisify(f) {
        return function () {
          return Promish.apply(f, arguments);
        };
      }
    }, {
      key: 'denodify',
      value: function denodify(f) {
        return Promish.promisify(f);
      }

      // create Q based curry function for ninvoke

    }, {
      key: 'nbind',
      value: function nbind(f, o) {
        // Why is it function, object and not object, function like the others?
        return function () {
          return Promish.post(o, f, arguments);
        };
      }

      // curry function for ninvoke with arguments in object, method order

    }, {
      key: 'bind',
      value: function bind(o, f) {
        return function () {
          return Promish.post(o, f, arguments);
        };
      }

      // Promishify every method in an object

    }, {
      key: 'promisifyAll',
      value: function promisifyAll(o, options) {
        options = options || {};
        var inPlace = options.inPlace || false;
        var suffix = options.suffix || (inPlace ? 'Async' : '');

        var p = {};
        var oo = o;
        while (oo && oo !== Object) {
          for (var i in oo) {
            if (!p[i + suffix] && oo[i] instanceof Function) {
              p[i + suffix] = Promish.bind(o, oo[i]);
            }
          }
          oo = Object.getPrototypeOf(oo) || oo.prototype;
        }

        if (inPlace) {
          for (var _i in p) {
            if (p[_i] instanceof Function) {
              o[_i] = p[_i];
            }
          }
          p = o;
        }

        return p;
      }
    }, {
      key: 'all',
      value: function all(promises) {
        return new Promish(Promise.all(promises));
      }

      // some - the first n to resolve, win - else reject with all of the errors

    }, {
      key: 'some',
      value: function some(promises, n) {
        return new Promish(function (resolve, reject) {
          var values = [];
          var rejects = [];
          promises.forEach(function (promise) {
            promise.then(function (value) {
              values.push(value);
              if (values.length >= n) {
                resolve(values);
              }
            }).catch(function (error) {
              rejects.push(error);
              if (rejects.length > promises.length - n) {
                reject(rejects);
              }
            });
          });
        });
      }

      // any - the first to resolve, wins - else reject with all of the errors

    }, {
      key: 'any',
      value: function any(promises) {
        return Promish.some(promises, 1).then(function (values) {
          return values[0];
        });
      }

      // old-style for ease of adoption

    }, {
      key: 'defer',
      value: function defer() {
        var deferred = {};
        deferred.promise = new Promish(function (resolve, reject) {
          deferred.resolve = resolve;
          deferred.reject = reject;
        });
        return deferred;
      }

      // spread - apply array of values to function as args

    }, {
      key: 'spread',
      value: function spread(value, f) {
        return f.apply(undefined, value);
      }
    }]);

    return Promish;
  }(Base);

  return Promish;
};
module.exports = generatePromish;
//# sourceMappingURL=promish-class.js.map
