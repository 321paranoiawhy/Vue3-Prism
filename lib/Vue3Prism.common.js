/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7741:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 2104:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 8340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 2626:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 4488:
/***/ (function(module) {

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.24.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 9191:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var isPrototypeOf = __webpack_require__(7976);
var setPrototypeOf = __webpack_require__(7674);
var copyConstructorProperties = __webpack_require__(9920);
var proxyAccessor = __webpack_require__(2626);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var installErrorCause = __webpack_require__(8340);
var clearErrorStack = __webpack_require__(7741);
var ERROR_STACK_INSTALLABLE = __webpack_require__(2914);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 1703:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var apply = __webpack_require__(2104);
var wrapErrorConstructorWithCause = __webpack_require__(9191);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 187:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(1703);

/* **********************************************
     Begin prism-core.js
********************************************** */
/// <reference lib="WebWorker"/>
var _self = typeof window !== 'undefined' ? window // if in browser
: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
: {} // if in node js
;
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */


var Prism = function (_self) {
  // Private helper vars
  var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
  var uniqueId = 0; // The grammar object for plaintext

  var plainTextGrammar = {};
  var _ = {
    /**
     * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
     * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
     * additional languages or plugins yourself.
     *
     * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
     *
     * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.manual = true;
     * // add a new <script> to load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    manual: _self.Prism && _self.Prism.manual,

    /**
     * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
     * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
     * own worker, you don't want it to do this.
     *
     * By setting this value to `true`, Prism will not add its own listeners to the worker.
     *
     * You obviously have to change this value before Prism executes. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.disableWorkerMessageHandler = true;
     * // Load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

    /**
     * A namespace for utility methods.
     *
     * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
     * change or disappear at any time.
     *
     * @namespace
     * @memberof Prism
     */
    util: {
      encode: function encode(tokens) {
        if (tokens instanceof Token) {
          return new Token(tokens.type, encode(tokens.content), tokens.alias);
        } else if (Array.isArray(tokens)) {
          return tokens.map(encode);
        } else {
          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        }
      },

      /**
       * Returns the name of the type of the given value.
       *
       * @param {any} o
       * @returns {string}
       * @example
       * type(null)      === 'Null'
       * type(undefined) === 'Undefined'
       * type(123)       === 'Number'
       * type('foo')     === 'String'
       * type(true)      === 'Boolean'
       * type([1, 2])    === 'Array'
       * type({})        === 'Object'
       * type(String)    === 'Function'
       * type(/abc+/)    === 'RegExp'
       */
      type: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1);
      },

      /**
       * Returns a unique number for the given object. Later calls will still return the same number.
       *
       * @param {Object} obj
       * @returns {number}
       */
      objId: function (obj) {
        if (!obj['__id']) {
          Object.defineProperty(obj, '__id', {
            value: ++uniqueId
          });
        }

        return obj['__id'];
      },

      /**
       * Creates a deep clone of the given object.
       *
       * The main intended use of this function is to clone language definitions.
       *
       * @param {T} o
       * @param {Record<number, any>} [visited]
       * @returns {T}
       * @template T
       */
      clone: function deepClone(o, visited) {
        visited = visited || {};
        var clone;
        var id;

        switch (_.util.type(o)) {
          case 'Object':
            id = _.util.objId(o);

            if (visited[id]) {
              return visited[id];
            }

            clone =
            /** @type {Record<string, any>} */
            {};
            visited[id] = clone;

            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = deepClone(o[key], visited);
              }
            }

            return (
              /** @type {any} */
              clone
            );

          case 'Array':
            id = _.util.objId(o);

            if (visited[id]) {
              return visited[id];
            }

            clone = [];
            visited[id] = clone;

            /** @type {Array} */

            /** @type {any} */
            o.forEach(function (v, i) {
              clone[i] = deepClone(v, visited);
            });
            return (
              /** @type {any} */
              clone
            );

          default:
            return o;
        }
      },

      /**
       * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
       *
       * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
       *
       * @param {Element} element
       * @returns {string}
       */
      getLanguage: function (element) {
        while (element) {
          var m = lang.exec(element.className);

          if (m) {
            return m[1].toLowerCase();
          }

          element = element.parentElement;
        }

        return 'none';
      },

      /**
       * Sets the Prism `language-xxxx` class of the given element.
       *
       * @param {Element} element
       * @param {string} language
       * @returns {void}
       */
      setLanguage: function (element, language) {
        // remove all `language-xxxx` classes
        // (this might leave behind a leading space)
        element.className = element.className.replace(RegExp(lang, 'gi'), ''); // add the new `language-xxxx` class
        // (using `classList` will automatically clean up spaces for us)

        element.classList.add('language-' + language);
      },

      /**
       * Returns the script element that is currently executing.
       *
       * This does __not__ work for line script element.
       *
       * @returns {HTMLScriptElement | null}
       */
      currentScript: function () {
        if (typeof document === 'undefined') {
          return null;
        }

        if ('currentScript' in document && 1 < 2
        /* hack to trip TS' flow analysis */
        ) {
          return (
            /** @type {any} */
            document.currentScript
          );
        } // IE11 workaround
        // we'll get the src of the current script by parsing IE11's error stack trace
        // this will not work for inline scripts


        try {
          throw new Error();
        } catch (err) {
          // Get file src url from stack. Specifically works with the format of stack traces in IE.
          // A stack will look like this:
          //
          // Error
          //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
          //    at Global code (http://localhost/components/prism-core.js:606:1)
          var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];

          if (src) {
            var scripts = document.getElementsByTagName('script');

            for (var i in scripts) {
              if (scripts[i].src == src) {
                return scripts[i];
              }
            }
          }

          return null;
        }
      },

      /**
       * Returns whether a given class is active for `element`.
       *
       * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
       * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
       * given class is just the given class with a `no-` prefix.
       *
       * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
       * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
       * ancestors have the given class or the negated version of it, then the default activation will be returned.
       *
       * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
       * version of it, the class is considered active.
       *
       * @param {Element} element
       * @param {string} className
       * @param {boolean} [defaultActivation=false]
       * @returns {boolean}
       */
      isActive: function (element, className, defaultActivation) {
        var no = 'no-' + className;

        while (element) {
          var classList = element.classList;

          if (classList.contains(className)) {
            return true;
          }

          if (classList.contains(no)) {
            return false;
          }

          element = element.parentElement;
        }

        return !!defaultActivation;
      }
    },

    /**
     * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
     *
     * @namespace
     * @memberof Prism
     * @public
     */
    languages: {
      /**
       * The grammar for plain, unformatted text.
       */
      plain: plainTextGrammar,
      plaintext: plainTextGrammar,
      text: plainTextGrammar,
      txt: plainTextGrammar,

      /**
       * Creates a deep copy of the language with the given id and appends the given tokens.
       *
       * If a token in `redef` also appears in the copied language, then the existing token in the copied language
       * will be overwritten at its original position.
       *
       * ## Best practices
       *
       * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
       * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
       * understand the language definition because, normally, the order of tokens matters in Prism grammars.
       *
       * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
       * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
       *
       * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
       * @param {Grammar} redef The new tokens to append.
       * @returns {Grammar} The new language created.
       * @public
       * @example
       * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
       *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
       *     // at its original position
       *     'comment': { ... },
       *     // CSS doesn't have a 'color' token, so this token will be appended
       *     'color': /\b(?:red|green|blue)\b/
       * });
       */
      extend: function (id, redef) {
        var lang = _.util.clone(_.languages[id]);

        for (var key in redef) {
          lang[key] = redef[key];
        }

        return lang;
      },

      /**
       * Inserts tokens _before_ another token in a language definition or any other grammar.
       *
       * ## Usage
       *
       * This helper method makes it easy to modify existing languages. For example, the CSS language definition
       * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
       * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
       * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
       * this:
       *
       * ```js
       * Prism.languages.markup.style = {
       *     // token
       * };
       * ```
       *
       * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
       * before existing tokens. For the CSS example above, you would use it like this:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'cdata', {
       *     'style': {
       *         // token
       *     }
       * });
       * ```
       *
       * ## Special cases
       *
       * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
       * will be ignored.
       *
       * This behavior can be used to insert tokens after `before`:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'comment', {
       *     'comment': Prism.languages.markup.comment,
       *     // tokens after 'comment'
       * });
       * ```
       *
       * ## Limitations
       *
       * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
       * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
       * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
       * deleting properties which is necessary to insert at arbitrary positions.
       *
       * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
       * Instead, it will create a new object and replace all references to the target object with the new one. This
       * can be done without temporarily deleting properties, so the iteration order is well-defined.
       *
       * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
       * you hold the target object in a variable, then the value of the variable will not change.
       *
       * ```js
       * var oldMarkup = Prism.languages.markup;
       * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
       *
       * assert(oldMarkup !== Prism.languages.markup);
       * assert(newMarkup === Prism.languages.markup);
       * ```
       *
       * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
       * object to be modified.
       * @param {string} before The key to insert before.
       * @param {Grammar} insert An object containing the key-value pairs to be inserted.
       * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
       * object to be modified.
       *
       * Defaults to `Prism.languages`.
       * @returns {Grammar} The new grammar object.
       * @public
       */
      insertBefore: function (inside, before, insert, root) {
        root = root ||
        /** @type {any} */
        _.languages;
        var grammar = root[inside];
        /** @type {Grammar} */

        var ret = {};

        for (var token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            } // Do not insert token which also occur in insert. See #1525


            if (!insert.hasOwnProperty(token)) {
              ret[token] = grammar[token];
            }
          }
        }

        var old = root[inside];
        root[inside] = ret; // Update references in other language definitions

        _.languages.DFS(_.languages, function (key, value) {
          if (value === old && key != inside) {
            this[key] = ret;
          }
        });

        return ret;
      },
      // Traverse a language definition with Depth First Search
      DFS: function DFS(o, callback, type, visited) {
        visited = visited || {};
        var objId = _.util.objId;

        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);
            var property = o[i];

            var propertyType = _.util.type(property);

            if (propertyType === 'Object' && !visited[objId(property)]) {
              visited[objId(property)] = true;
              DFS(property, callback, null, visited);
            } else if (propertyType === 'Array' && !visited[objId(property)]) {
              visited[objId(property)] = true;
              DFS(property, callback, i, visited);
            }
          }
        }
      }
    },
    plugins: {},

    /**
     * This is the most high-level function in Prism’s API.
     * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
     * each one of them.
     *
     * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
     *
     * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
     * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
     * @memberof Prism
     * @public
     */
    highlightAll: function (async, callback) {
      _.highlightAllUnder(document, async, callback);
    },

    /**
     * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
     * {@link Prism.highlightElement} on each one of them.
     *
     * The following hooks will be run:
     * 1. `before-highlightall`
     * 2. `before-all-elements-highlight`
     * 3. All hooks of {@link Prism.highlightElement} for each element.
     *
     * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
     * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
     * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
     * @memberof Prism
     * @public
     */
    highlightAllUnder: function (container, async, callback) {
      var env = {
        callback: callback,
        container: container,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };

      _.hooks.run('before-highlightall', env);

      env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

      _.hooks.run('before-all-elements-highlight', env);

      for (var i = 0, element; element = env.elements[i++];) {
        _.highlightElement(element, async === true, env.callback);
      }
    },

    /**
     * Highlights the code inside a single element.
     *
     * The following hooks will be run:
     * 1. `before-sanity-check`
     * 2. `before-highlight`
     * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
     * 4. `before-insert`
     * 5. `after-highlight`
     * 6. `complete`
     *
     * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
     * the element's language.
     *
     * @param {Element} element The element containing the code.
     * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
     * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
     * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
     * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
     *
     * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
     * asynchronous highlighting to work. You can build your own bundle on the
     * [Download page](https://prismjs.com/download.html).
     * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
     * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
     * @memberof Prism
     * @public
     */
    highlightElement: function (element, async, callback) {
      // Find language
      var language = _.util.getLanguage(element);

      var grammar = _.languages[language]; // Set language on the element, if not present

      _.util.setLanguage(element, language); // Set language on the parent, for styling


      var parent = element.parentElement;

      if (parent && parent.nodeName.toLowerCase() === 'pre') {
        _.util.setLanguage(parent, language);
      }

      var code = element.textContent;
      var env = {
        element: element,
        language: language,
        grammar: grammar,
        code: code
      };

      function insertHighlightedCode(highlightedCode) {
        env.highlightedCode = highlightedCode;

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;

        _.hooks.run('after-highlight', env);

        _.hooks.run('complete', env);

        callback && callback.call(env.element);
      }

      _.hooks.run('before-sanity-check', env); // plugins may change/add the parent/element


      parent = env.element.parentElement;

      if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
        parent.setAttribute('tabindex', '0');
      }

      if (!env.code) {
        _.hooks.run('complete', env);

        callback && callback.call(env.element);
        return;
      }

      _.hooks.run('before-highlight', env);

      if (!env.grammar) {
        insertHighlightedCode(_.util.encode(env.code));
        return;
      }

      if (async && _self.Worker) {
        var worker = new Worker(_.filename);

        worker.onmessage = function (evt) {
          insertHighlightedCode(evt.data);
        };

        worker.postMessage(JSON.stringify({
          language: env.language,
          code: env.code,
          immediateClose: true
        }));
      } else {
        insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
      }
    },

    /**
     * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
     * and the language definitions to use, and returns a string with the HTML produced.
     *
     * The following hooks will be run:
     * 1. `before-tokenize`
     * 2. `after-tokenize`
     * 3. `wrap`: On each {@link Token}.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @param {string} language The name of the language definition passed to `grammar`.
     * @returns {string} The highlighted HTML.
     * @memberof Prism
     * @public
     * @example
     * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
     */
    highlight: function (text, grammar, language) {
      var env = {
        code: text,
        grammar: grammar,
        language: language
      };

      _.hooks.run('before-tokenize', env);

      if (!env.grammar) {
        throw new Error('The language "' + env.language + '" has no grammar.');
      }

      env.tokens = _.tokenize(env.code, env.grammar);

      _.hooks.run('after-tokenize', env);

      return Token.stringify(_.util.encode(env.tokens), env.language);
    },

    /**
     * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
     * and the language definitions to use, and returns an array with the tokenized code.
     *
     * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
     *
     * This method could be useful in other contexts as well, as a very crude parser.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @returns {TokenStream} An array of strings and tokens, a token stream.
     * @memberof Prism
     * @public
     * @example
     * let code = `var foo = 0;`;
     * let tokens = Prism.tokenize(code, Prism.languages.javascript);
     * tokens.forEach(token => {
     *     if (token instanceof Prism.Token && token.type === 'number') {
     *         console.log(`Found numeric literal: ${token.content}`);
     *     }
     * });
     */
    tokenize: function (text, grammar) {
      var rest = grammar.rest;

      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }

        delete grammar.rest;
      }

      var tokenList = new LinkedList();
      addAfter(tokenList, tokenList.head, text);
      matchGrammar(text, tokenList, grammar, tokenList.head, 0);
      return toArray(tokenList);
    },

    /**
     * @namespace
     * @memberof Prism
     * @public
     */
    hooks: {
      all: {},

      /**
       * Adds the given callback to the list of callbacks for the given hook.
       *
       * The callback will be invoked when the hook it is registered for is run.
       * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
       *
       * One callback function can be registered to multiple hooks and the same hook multiple times.
       *
       * @param {string} name The name of the hook.
       * @param {HookCallback} callback The callback function which is given environment variables.
       * @public
       */
      add: function (name, callback) {
        var hooks = _.hooks.all;
        hooks[name] = hooks[name] || [];
        hooks[name].push(callback);
      },

      /**
       * Runs a hook invoking all registered callbacks with the given environment variables.
       *
       * Callbacks will be invoked synchronously and in the order in which they were registered.
       *
       * @param {string} name The name of the hook.
       * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
       * @public
       */
      run: function (name, env) {
        var callbacks = _.hooks.all[name];

        if (!callbacks || !callbacks.length) {
          return;
        }

        for (var i = 0, callback; callback = callbacks[i++];) {
          callback(env);
        }
      }
    },
    Token: Token
  };
  _self.Prism = _; // Typescript note:
  // The following can be used to import the Token type in JSDoc:
  //
  //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

  /**
   * Creates a new token.
   *
   * @param {string} type See {@link Token#type type}
   * @param {string | TokenStream} content See {@link Token#content content}
   * @param {string|string[]} [alias] The alias(es) of the token.
   * @param {string} [matchedStr=""] A copy of the full string this token was created from.
   * @class
   * @global
   * @public
   */

  function Token(type, content, alias, matchedStr) {
    /**
     * The type of the token.
     *
     * This is usually the key of a pattern in a {@link Grammar}.
     *
     * @type {string}
     * @see GrammarToken
     * @public
     */
    this.type = type;
    /**
     * The strings or tokens contained by this token.
     *
     * This will be a token stream if the pattern matched also defined an `inside` grammar.
     *
     * @type {string | TokenStream}
     * @public
     */

    this.content = content;
    /**
     * The alias(es) of the token.
     *
     * @type {string|string[]}
     * @see GrammarToken
     * @public
     */

    this.alias = alias; // Copy of the full string this token was created from

    this.length = (matchedStr || '').length | 0;
  }
  /**
   * A token stream is an array of strings and {@link Token Token} objects.
   *
   * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
   * them.
   *
   * 1. No adjacent strings.
   * 2. No empty strings.
   *
   *    The only exception here is the token stream that only contains the empty string and nothing else.
   *
   * @typedef {Array<string | Token>} TokenStream
   * @global
   * @public
   */

  /**
   * Converts the given token or token stream to an HTML representation.
   *
   * The following hooks will be run:
   * 1. `wrap`: On each {@link Token}.
   *
   * @param {string | Token | TokenStream} o The token or token stream to be converted.
   * @param {string} language The name of current language.
   * @returns {string} The HTML representation of the token or token stream.
   * @memberof Token
   * @static
   */


  Token.stringify = function stringify(o, language) {
    if (typeof o == 'string') {
      return o;
    }

    if (Array.isArray(o)) {
      var s = '';
      o.forEach(function (e) {
        s += stringify(e, language);
      });
      return s;
    }

    var env = {
      type: o.type,
      content: stringify(o.content, language),
      tag: 'span',
      classes: ['token', o.type],
      attributes: {},
      language: language
    };
    var aliases = o.alias;

    if (aliases) {
      if (Array.isArray(aliases)) {
        Array.prototype.push.apply(env.classes, aliases);
      } else {
        env.classes.push(aliases);
      }
    }

    _.hooks.run('wrap', env);

    var attributes = '';

    for (var name in env.attributes) {
      attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
    }

    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
  };
  /**
   * @param {RegExp} pattern
   * @param {number} pos
   * @param {string} text
   * @param {boolean} lookbehind
   * @returns {RegExpExecArray | null}
   */


  function matchPattern(pattern, pos, text, lookbehind) {
    pattern.lastIndex = pos;
    var match = pattern.exec(text);

    if (match && lookbehind && match[1]) {
      // change the match to remove the text matched by the Prism lookbehind group
      var lookbehindLength = match[1].length;
      match.index += lookbehindLength;
      match[0] = match[0].slice(lookbehindLength);
    }

    return match;
  }
  /**
   * @param {string} text
   * @param {LinkedList<string | Token>} tokenList
   * @param {any} grammar
   * @param {LinkedListNode<string | Token>} startNode
   * @param {number} startPos
   * @param {RematchOptions} [rematch]
   * @returns {void}
   * @private
   *
   * @typedef RematchOptions
   * @property {string} cause
   * @property {number} reach
   */


  function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
    for (var token in grammar) {
      if (!grammar.hasOwnProperty(token) || !grammar[token]) {
        continue;
      }

      var patterns = grammar[token];
      patterns = Array.isArray(patterns) ? patterns : [patterns];

      for (var j = 0; j < patterns.length; ++j) {
        if (rematch && rematch.cause == token + ',' + j) {
          return;
        }

        var patternObj = patterns[j];
        var inside = patternObj.inside;
        var lookbehind = !!patternObj.lookbehind;
        var greedy = !!patternObj.greedy;
        var alias = patternObj.alias;

        if (greedy && !patternObj.pattern.global) {
          // Without the global flag, lastIndex won't work
          var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
          patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
        }
        /** @type {RegExp} */


        var pattern = patternObj.pattern || patternObj;

        for ( // iterate the token list and keep track of the current token/string position
        var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
          if (rematch && pos >= rematch.reach) {
            break;
          }

          var str = currentNode.value;

          if (tokenList.length > text.length) {
            // Something went terribly wrong, ABORT, ABORT!
            return;
          }

          if (str instanceof Token) {
            continue;
          }

          var removeCount = 1; // this is the to parameter of removeBetween

          var match;

          if (greedy) {
            match = matchPattern(pattern, pos, text, lookbehind);

            if (!match || match.index >= text.length) {
              break;
            }

            var from = match.index;
            var to = match.index + match[0].length;
            var p = pos; // find the node that contains the match

            p += currentNode.value.length;

            while (from >= p) {
              currentNode = currentNode.next;
              p += currentNode.value.length;
            } // adjust pos (and p)


            p -= currentNode.value.length;
            pos = p; // the current node is a Token, then the match starts inside another Token, which is invalid

            if (currentNode.value instanceof Token) {
              continue;
            } // find the last node which is affected by this match


            for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next) {
              removeCount++;
              p += k.value.length;
            }

            removeCount--; // replace with the new match

            str = text.slice(pos, p);
            match.index -= pos;
          } else {
            match = matchPattern(pattern, 0, str, lookbehind);

            if (!match) {
              continue;
            }
          } // eslint-disable-next-line no-redeclare


          var from = match.index;
          var matchStr = match[0];
          var before = str.slice(0, from);
          var after = str.slice(from + matchStr.length);
          var reach = pos + str.length;

          if (rematch && reach > rematch.reach) {
            rematch.reach = reach;
          }

          var removeFrom = currentNode.prev;

          if (before) {
            removeFrom = addAfter(tokenList, removeFrom, before);
            pos += before.length;
          }

          removeRange(tokenList, removeFrom, removeCount);
          var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
          currentNode = addAfter(tokenList, removeFrom, wrapped);

          if (after) {
            addAfter(tokenList, currentNode, after);
          }

          if (removeCount > 1) {
            // at least one Token object was removed, so we have to do some rematching
            // this can only happen if the current pattern is greedy

            /** @type {RematchOptions} */
            var nestedRematch = {
              cause: token + ',' + j,
              reach: reach
            };
            matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch); // the reach might have been extended because of the rematching

            if (rematch && nestedRematch.reach > rematch.reach) {
              rematch.reach = nestedRematch.reach;
            }
          }
        }
      }
    }
  }
  /**
   * @typedef LinkedListNode
   * @property {T} value
   * @property {LinkedListNode<T> | null} prev The previous node.
   * @property {LinkedListNode<T> | null} next The next node.
   * @template T
   * @private
   */

  /**
   * @template T
   * @private
   */


  function LinkedList() {
    /** @type {LinkedListNode<T>} */
    var head = {
      value: null,
      prev: null,
      next: null
    };
    /** @type {LinkedListNode<T>} */

    var tail = {
      value: null,
      prev: head,
      next: null
    };
    head.next = tail;
    /** @type {LinkedListNode<T>} */

    this.head = head;
    /** @type {LinkedListNode<T>} */

    this.tail = tail;
    this.length = 0;
  }
  /**
   * Adds a new node with the given value to the list.
   *
   * @param {LinkedList<T>} list
   * @param {LinkedListNode<T>} node
   * @param {T} value
   * @returns {LinkedListNode<T>} The added node.
   * @template T
   */


  function addAfter(list, node, value) {
    // assumes that node != list.tail && values.length >= 0
    var next = node.next;
    var newNode = {
      value: value,
      prev: node,
      next: next
    };
    node.next = newNode;
    next.prev = newNode;
    list.length++;
    return newNode;
  }
  /**
   * Removes `count` nodes after the given node. The given node will not be removed.
   *
   * @param {LinkedList<T>} list
   * @param {LinkedListNode<T>} node
   * @param {number} count
   * @template T
   */


  function removeRange(list, node, count) {
    var next = node.next;

    for (var i = 0; i < count && next !== list.tail; i++) {
      next = next.next;
    }

    node.next = next;
    next.prev = node;
    list.length -= i;
  }
  /**
   * @param {LinkedList<T>} list
   * @returns {T[]}
   * @template T
   */


  function toArray(list) {
    var array = [];
    var node = list.head.next;

    while (node !== list.tail) {
      array.push(node.value);
      node = node.next;
    }

    return array;
  }

  if (!_self.document) {
    if (!_self.addEventListener) {
      // in Node.js
      return _;
    }

    if (!_.disableWorkerMessageHandler) {
      // In worker
      _self.addEventListener('message', function (evt) {
        var message = JSON.parse(evt.data);
        var lang = message.language;
        var code = message.code;
        var immediateClose = message.immediateClose;

        _self.postMessage(_.highlight(code, _.languages[lang], lang));

        if (immediateClose) {
          _self.close();
        }
      }, false);
    }

    return _;
  } // Get current script and highlight


  var script = _.util.currentScript();

  if (script) {
    _.filename = script.src;

    if (script.hasAttribute('data-manual')) {
      _.manual = true;
    }
  }

  function highlightAutomaticallyCallback() {
    if (!_.manual) {
      _.highlightAll();
    }
  }

  if (!_.manual) {
    // If the document state is "loading", then we'll use DOMContentLoaded.
    // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
    // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
    // might take longer one animation frame to execute which can create a race condition where only some plugins have
    // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
    // See https://github.com/PrismJS/prism/issues/2102
    var readyState = document.readyState;

    if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
      document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
    } else {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(highlightAutomaticallyCallback);
      } else {
        window.setTimeout(highlightAutomaticallyCallback, 16);
      }
    }
  }

  return _;
}(_self);

if ( true && module.exports) {
  module.exports = Prism;
} // hack for components to work correctly in node.js


if (typeof __webpack_require__.g !== 'undefined') {
  __webpack_require__.g.Prism = Prism;
} // some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */

/* **********************************************
     Begin prism-markup.js
********************************************** */


Prism.languages.markup = {
  'comment': {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  'prolog': {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  'doctype': {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      'internal-subset': {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null // see below

      },
      'string': {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      'punctuation': /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      'name': /[^\s<>'"]+/
    }
  },
  'cdata': {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': [{
            pattern: /^=/,
            alias: 'attr-equals'
          }, /"|'/]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }
    }
  },
  'entity': [{
    pattern: /&[\da-z]{1,8};/i,
    alias: 'named-entity'
  }, /&#x?[\da-f]{1,8};/i]
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup; // Plugin to make entity title show the real entity, idea by Roman Komarov

Prism.hooks.add('wrap', function (env) {
  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside['language-' + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside['language-' + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
        return tagName;
      }), 'i'),
      lookbehind: true,
      greedy: true,
      inside: inside
    };
    Prism.languages.insertBefore('markup', 'cdata', def);
  }
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function (attrName, lang) {
    Prism.languages.markup.tag.inside['special-attr'].push({
      pattern: RegExp(/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'),
      lookbehind: true,
      inside: {
        'attr-name': /^[^\s=]+/,
        'attr-value': {
          pattern: /=[\s\S]+/,
          inside: {
            'value': {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, 'language-' + lang],
              inside: Prism.languages[lang]
            },
            'punctuation': [{
              pattern: /^=/,
              alias: 'attr-equals'
            }, /"|'/]
          }
        }
      }
    });
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism.languages.css = {
    'comment': /\/\*[\s\S]*?\*\//,
    'atrule': {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        'rule': /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: 'selector'
        },
        'keyword': {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        } // See rest below

      }
    },
    'url': {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
      greedy: true,
      inside: {
        'function': /^url/i,
        'punctuation': /^\(|\)$/,
        'string': {
          pattern: RegExp('^' + string.source + '$'),
          alias: 'url'
        }
      }
    },
    'selector': {
      pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
      lookbehind: true
    },
    'string': {
      pattern: string,
      greedy: true
    },
    'property': {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    'important': /!important\b/i,
    'function': {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    'punctuation': /[(){};:,]/
  };
  Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
  var markup = Prism.languages.markup;

  if (markup) {
    markup.tag.addInlined('style', 'css');
    markup.tag.addAttribute('style', 'css');
  }
})(Prism);
/* **********************************************
     Begin prism-clike.js
********************************************** */


Prism.languages.clike = {
  'comment': [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true,
    greedy: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  }],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      'punctuation': /[.\\]/
    }
  },
  'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  'boolean': /\b(?:false|true)\b/,
  'function': /\b\w+(?=\()/,
  'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  'punctuation': /[{}[\];(),.:]/
};
/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [Prism.languages.clike['class-name'], {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
    lookbehind: true
  }],
  'keyword': [{
    pattern: /((?:^|\})\s*)catch\b/,
    lookbehind: true
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: true
  }],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  'number': {
    pattern: RegExp(/(^|[^\w$])/.source + '(?:' + ( // constant
    /NaN|Infinity/.source + '|' + // binary integer
    /0[bB][01]+(?:_[01]+)*n?/.source + '|' + // octal integer
    /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' + // hexadecimal integer
    /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' + // decimal bigint
    /\d+(?:_\d+)*n/.source + '|' + // decimal number (integer or float) but no bigint
    /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source),
    lookbehind: true
  },
  'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: RegExp( // lookbehind
    // eslint-disable-next-line regexp/no-dupe-characters-character-class
    /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
    // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
    // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
    // with the only syntax, so we have to define 2 different regex patterns.
    /\//.source + '(?:' + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + '|' + // `v` flag syntax. This supports 3 levels of nested character classes.
    /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ')' + // lookahead
    /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
    lookbehind: true,
    greedy: true,
    inside: {
      'regex-source': {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: 'language-regex',
        inside: Prism.languages.regex
      },
      'regex-delimiter': /^\/|\/$/,
      'regex-flags': /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: 'function'
  },
  'parameter': [{
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }],
  'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
  'hashbang': {
    pattern: /^#!.*/,
    greedy: true,
    alias: 'comment'
  },
  'template-string': {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      'template-punctuation': {
        pattern: /^`|`$/,
        alias: 'string'
      },
      'interpolation': {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      'string': /[\s\S]+/
    }
  },
  'string-property': {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: 'property'
  }
});
Prism.languages.insertBefore('javascript', 'operator', {
  'literal-property': {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: 'property'
  }
});

if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined('script', 'javascript'); // add attribute support for all DOM events.
  // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events

  Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript');
}

Prism.languages.js = Prism.languages.javascript;
/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    return;
  } // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill


  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  var LOADING_MESSAGE = 'Loading…';

  var FAILURE_MESSAGE = function (status, message) {
    return '✖ Error ' + status + ' while fetching file: ' + message;
  };

  var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';
  var EXTENSIONS = {
    'js': 'javascript',
    'py': 'python',
    'rb': 'ruby',
    'ps1': 'powershell',
    'psm1': 'powershell',
    'sh': 'bash',
    'bat': 'batch',
    'h': 'c',
    'tex': 'latex'
  };
  var STATUS_ATTR = 'data-src-status';
  var STATUS_LOADING = 'loading';
  var STATUS_LOADED = 'loaded';
  var STATUS_FAILED = 'failed';
  var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])' + ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
  /**
   * Loads the given file.
   *
   * @param {string} src The URL or path of the source file to load.
   * @param {(result: string) => void} success
   * @param {(reason: string) => void} error
   */

  function loadFile(src, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status < 400 && xhr.responseText) {
          success(xhr.responseText);
        } else {
          if (xhr.status >= 400) {
            error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
          } else {
            error(FAILURE_EMPTY_MESSAGE);
          }
        }
      }
    };

    xhr.send(null);
  }
  /**
   * Parses the given range.
   *
   * This returns a range with inclusive ends.
   *
   * @param {string | null | undefined} range
   * @returns {[number, number | undefined] | undefined}
   */


  function parseRange(range) {
    var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');

    if (m) {
      var start = Number(m[1]);
      var comma = m[2];
      var end = m[3];

      if (!comma) {
        return [start, start];
      }

      if (!end) {
        return [start, undefined];
      }

      return [start, Number(end)];
    }

    return undefined;
  }

  Prism.hooks.add('before-highlightall', function (env) {
    env.selector += ', ' + SELECTOR;
  });
  Prism.hooks.add('before-sanity-check', function (env) {
    var pre =
    /** @type {HTMLPreElement} */
    env.element;

    if (pre.matches(SELECTOR)) {
      env.code = ''; // fast-path the whole thing and go to complete

      pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading
      // add code element with loading message

      var code = pre.appendChild(document.createElement('CODE'));
      code.textContent = LOADING_MESSAGE;
      var src = pre.getAttribute('data-src');
      var language = env.language;

      if (language === 'none') {
        // the language might be 'none' because there is no language set;
        // in this case, we want to use the extension as the language
        var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
        language = EXTENSIONS[extension] || extension;
      } // set language classes


      Prism.util.setLanguage(code, language);
      Prism.util.setLanguage(pre, language); // preload the language

      var autoloader = Prism.plugins.autoloader;

      if (autoloader) {
        autoloader.loadLanguages(language);
      } // load file


      loadFile(src, function (text) {
        // mark as loaded
        pre.setAttribute(STATUS_ATTR, STATUS_LOADED); // handle data-range

        var range = parseRange(pre.getAttribute('data-range'));

        if (range) {
          var lines = text.split(/\r\n?|\n/g); // the range is one-based and inclusive on both ends

          var start = range[0];
          var end = range[1] == null ? lines.length : range[1];

          if (start < 0) {
            start += lines.length;
          }

          start = Math.max(0, Math.min(start - 1, lines.length));

          if (end < 0) {
            end += lines.length;
          }

          end = Math.max(0, Math.min(end, lines.length));
          text = lines.slice(start, end).join('\n'); // add data-start for line numbers

          if (!pre.hasAttribute('data-start')) {
            pre.setAttribute('data-start', String(start + 1));
          }
        } // highlight code


        code.textContent = text;
        Prism.highlightElement(code);
      }, function (error) {
        // mark as failed
        pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
        code.textContent = error;
      });
    }
  });
  Prism.plugins.fileHighlight = {
    /**
     * Executes the File Highlight plugin for all matching `pre` elements under the given container.
     *
     * Note: Elements which are already loaded or currently loading will not be touched by this method.
     *
     * @param {ParentNode} [container=document]
     */
    highlight: function highlight(container) {
      var elements = (container || document).querySelectorAll(SELECTOR);

      for (var i = 0, element; element = elements[i++];) {
        Prism.highlightElement(element);
      }
    }
  };
  var logged = false;
  /** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */

  Prism.fileHighlight = function () {
    if (!logged) {
      console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
      logged = true;
    }

    Prism.plugins.fileHighlight.highlight.apply(this, arguments);
  };
})();

/***/ }),

/***/ 89:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
}); // runtime helper for setting properties on components
// in a tree-shakable way

exports.Z = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;

  for (const [key, val] of props) {
    target[key] = val;
  }

  return target;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/plugin/Vue3Prism.vue?vue&type=template&id=bec0dec0&scoped=true


const _withScopeId = n => (_pushScopeId("data-v-bec0dec0"), n = n(), _popScopeId(), n);

const _hoisted_1 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementBlock)("pre", {
    ref: "preNode",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)('language-' + $props.language)
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.createElementVNode)("code", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.normalizeClass)('language-' + $props.language),
    innerHTML: $setup.prismHTML
  }, null, 10, _hoisted_1)], 2);
}
;// CONCATENATED MODULE: ./src/plugin/Vue3Prism.vue?vue&type=template&id=bec0dec0&scoped=true

// EXTERNAL MODULE: ./node_modules/prismjs/prism.js
var prism = __webpack_require__(187);
var prism_default = /*#__PURE__*/__webpack_require__.n(prism);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/plugin/Vue3Prism.vue?vue&type=script&lang=js
 // default theme --> prism-a11y-dark
// https://github.com/PrismJS/prism-themes/blob/master/themes/prism-a11y-dark.css

 // import { ref } from "@vue/reactivity";
// https://icode.best/i/57529645443554
// import { onMounted } from "@vue/runtime-core";


/* harmony default export */ var Vue3Prismvue_type_script_lang_js = ({
  name: "Vue3Prism",
  // use like this
  // <Prism source="console.log('Prism');" language="javascript" theme="a11y-dark" copy="Copy the snippet!"></Prism>
  props: {
    source: {
      type: String,
      default: "console.log('Prism');"
    },
    language: {
      type: String,
      default: "javascript"
    },
    // TODO
    theme: {
      type: String,
      default: "a11y-dark"
    },
    copy: {
      type: String,
      default: "Copy the snippet!"
    },
    copiedTip: {
      type: String,
      default: "Copied!"
    }
  },

  setup(props) {
    const preNode = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)(null);
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
      // 1. line-numbers
      const lineNumbersDiv = document.createElement("div");
      lineNumbersDiv.setAttribute("class", "line-numbers-span");
      preNode.value.append(lineNumbersDiv);
      lineNumbersDiv.style.position = "absolute";
      lineNumbersDiv.style.top = "1.5em";
      lineNumbersDiv.style.left = "0em";
      lineNumbersDiv.style.width = "3em";
      lineNumbersDiv.style.borderRight = "1px solid #999";
      lineNumbersDiv.style.textAlign = "center";
      prismHTML.split("\n").forEach((_, index) => {
        let span = document.createElement("span");
        let br = document.createElement("br");
        br.style.userSelect = "none";
        span.innerHTML = index + 1;
        span.style.color = "#999";
        lineNumbersDiv.append(span);
        lineNumbersDiv.append(br);
      }); // 2. copy-to-clipboard

      const copySpan = document.createElement("span");
      copySpan.setAttribute("class", "copy-span");
      preNode.value.append(copySpan);
      copySpan.innerHTML = props.copy;
      copySpan.style.position = "absolute";
      copySpan.style.top = "0.3em";
      copySpan.style.right = "0em";
      copySpan.style.padding = "0 0.5em";
      copySpan.style.cursor = "pointer";
      copySpan.style.borderRadius = "0.5em";
      copySpan.style.color = "#bbb";
      copySpan.style.backgroundColor = "rgba(224, 224, 224, 0.2)";
      copySpan.style.boxShadow = "0 2px 0 0 rgb(0 0 0 / 20%)";
      copySpan.style.opacity = "0";

      copySpan.onclick = () => {
        // change content
        // copySpan.innerHTML = "Copied!";
        copySpan.innerHTML = props.copiedTip; // https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/

        if (navigator.clipboard) {
          // clipboard api
          navigator.clipboard.writeText(props.source);
        } else {
          const textarea = document.createElement("textarea");
          document.body.appendChild(textarea); // hide textarea

          textarea.style.position = "fixed"; // This property is deprecated. Use clip-path instead: https://developer.mozilla.org/en-US/docs/Web/CSS/clip
          // textarea.style.clip = "rect(0 0 0 0)";
          // css-tricks clip-path: https://css-tricks.com/almanac/properties/c/clip-path/

          textarea.style.clipPath = "circle(0)";
          textarea.style.top = "10px"; // assign value

          textarea.value = props.source;
          textarea.select();
          document.execCommand("copy", true); // remove

          document.body.removeChild(textarea);
        }

        setTimeout(() => {
          // recover content
          copySpan.innerHTML = props.copy;
        }, 1000);
      };

      preNode.value.onmouseover = () => {
        copySpan.style.opacity = "1";
      };

      preNode.value.onmouseout = () => {
        copySpan.style.opacity = "0";
      }; // 3. show language


      const languageSpan = document.createElement("span");
      languageSpan.setAttribute("class", "language-span");
      preNode.value.append(languageSpan);
      languageSpan.innerHTML = props.language;
      languageSpan.style.position = "absolute";
      languageSpan.style.bottom = "0.25em";
      languageSpan.style.right = "0.25em";
      languageSpan.style.color = "#00e0e0"; // 4. show Prism

      const prismSpan = document.createElement("span");
      prismSpan.setAttribute("class", "prism-span");
      preNode.value.append(prismSpan);
      prismSpan.innerHTML = "Hightlighted with ❤️ by ";
      prismSpan.style.position = "absolute";
      prismSpan.style.bottom = "0.25em";
      prismSpan.style.right = "50%";
      prismSpan.style.borderTop = "1px solid #999";
      prismSpan.style.transform = "translateX(50%)";
      prismSpan.style.color = "#999";
      const a = document.createElement("a");
      prismSpan.append(a);
      a.innerHTML = "Prism";
      a.href = "https://prismjs.com/";
      a.style.color = "#00e0e0";
    }); // highlight function: https://prismjs.com/docs/Prism.html#.highlight

    const prismHTML = prism_default().highlight(`${props.source}`, (prism_default()).languages[props.language], "javascript");
    return {
      preNode,
      prismHTML
    };
  }

});
;// CONCATENATED MODULE: ./src/plugin/Vue3Prism.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/plugin/Vue3Prism.vue?vue&type=style&index=0&id=bec0dec0&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/plugin/Vue3Prism.vue?vue&type=style&index=0&id=bec0dec0&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./src/plugin/Vue3Prism.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Vue3Prismvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-bec0dec0"]])

/* harmony default export */ var Vue3Prism = (__exports__);
;// CONCATENATED MODULE: ./src/plugin/index.js
// import VuePrism from "@/plugin/"


Vue3Prism.install = app => app.component(Vue3Prism.name, Vue3Prism);

/* harmony default export */ var src_plugin = (Vue3Prism);
;// CONCATENATED MODULE: ./src/index.js
// import index.js

 // store all components in an array

const components = [src_plugin]; // define install function

const install = App => {
  // 1. if installed, return
  if (install.installed) return; // 2. global registration for all components in components array

  components.map(component => {
    App.component(component.name, component);
  });

  if (typeof window != 'undefined' && window.Vue) {
    install(window.Vue);
  }
};

/* harmony default export */ var src_0 = ({
  // object must have install function
  // so that it can be used like this: Vue.use()
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // component to be exported
  Vue3Prism: src_plugin
});
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_0);


}();
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=Vue3Prism.common.js.map