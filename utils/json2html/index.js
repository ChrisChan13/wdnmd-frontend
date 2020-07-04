/* eslint-disable no-param-reassign */
/* eslint no-bitwise: off */
/* eslint no-restricted-syntax: off */
/* eslint guard-for-in: off */
export default (() => {
  const { indexOf } = [];
  const { toString } = Object.prototype;

  function makePrefixer(prefix) {
    return (name) => `${prefix}-${name}`;
  }

  function isArray(obj) {
    return toString.call(obj) === '[object Array]';
  }

  function sn(tagName, className, data) {
    const result = document.createElement(tagName);

    result.className = className;
    result.appendChild(document.createTextNode(`${data}`));

    return result;
  }

  function scn(tagName, className, child) {
    const result = document.createElement(tagName);
    let i;
    let len;

    result.className = className;

    if (isArray(child)) {
      for (i = 0, len = child.length; i < len; i += 1) {
        result.appendChild(child[i]);
      }
    } else {
      result.appendChild(child);
    }

    return result;
  }

  const prefixer = makePrefixer('j2h');
  const p = prefixer;
  const ARRAY = 2;
  const BOOL = 4;
  const INT = 8;
  const FLOAT = 16;
  const STRING = 32;
  const OBJECT = 64;
  const SPECIAL_OBJECT = 128;
  const FUNCTION = 256;
  const UNK = 1;

  const STRING_CLASS_NAME = p('type-string');
  const STRING_EMPTY_CLASS_NAME = `${p('type-string')} ${p('empty')}`;

  const BOOL_TRUE_CLASS_NAME = p('type-bool-true');
  const BOOL_FALSE_CLASS_NAME = p('type-bool-false');
  const BOOL_IMAGE = p('type-bool-image');
  const INT_CLASS_NAME = `${p('type-int')} ${p('type-number')}`;
  const FLOAT_CLASS_NAME = `${p('type-float')} ${p('type-number')}`;

  const OBJECT_CLASS_NAME = p('type-object');
  const OBJ_KEY_CLASS_NAME = `${p('key')} ${p('object-key')}`;
  const OBJ_VAL_CLASS_NAME = `${p('value')} ${p('object-value')}`;
  const OBJ_EMPTY_CLASS_NAME = `${p('type-object')} ${p('empty')}`;

  const FUNCTION_CLASS_NAME = p('type-function');

  const ARRAY_KEY_CLASS_NAME = `${p('key')} ${p('array-key')}`;
  const ARRAY_VAL_CLASS_NAME = `${p('value')} ${p('array-value')}`;
  const ARRAY_CLASS_NAME = p('type-array');
  const ARRAY_EMPTY_CLASS_NAME = `${p('type-array')} ${p('empty')}`;

  const HYPERLINK_CLASS_NAME = p('a');

  const UNKNOWN_CLASS_NAME = p('type-unk');

  function linkNode(child, href, target) {
    const a = scn('a', HYPERLINK_CLASS_NAME, child);
    a.setAttribute('href', href);
    a.setAttribute('target', target);
    return a;
  }

  function getType(obj) {
    const type = typeof obj;

    switch (type) {
      case 'boolean':
        return BOOL;
      case 'string':
        return STRING;
      case 'number':
        return (obj % 1 === 0) ? INT : FLOAT;
      case 'function':
        return FUNCTION;
      default:
        if (isArray(obj)) {
          return ARRAY;
        } if (obj === Object(obj)) {
          if (obj.constructor === Object) {
            return OBJECT;
          }
          return OBJECT | SPECIAL_OBJECT;
        }
        return UNK;
    }
  }

  function _format(data, options, parentKey) {
    let result;
    let container;
    let key;
    let keyNode;
    let valNode;
    let len;
    let childs;
    let tr;
    let value;
    let isEmpty = true;
    let isSpecial = false;
    const type = getType(data);

    // Initialized & used only in case of objects & arrays
    let hyperlinksEnabled;
    let aTarget;
    let hyperlinkKeys;

    if (type === BOOL) {
      const boolOpt = options.bool;
      container = document.createElement('div');

      if (boolOpt.showImage) {
        const img = document.createElement('img');
        img.setAttribute('class', BOOL_IMAGE);

        img.setAttribute('src',
          `${data ? boolOpt.img.true : boolOpt.img.false}`);

        container.appendChild(img);
      }

      if (boolOpt.showText) {
        container.appendChild(data
          ? sn('span', BOOL_TRUE_CLASS_NAME, boolOpt.text.true)
          : sn('span', BOOL_FALSE_CLASS_NAME, boolOpt.text.false));
      }

      result = container;
    } else if (type === STRING) {
      if (data === '') {
        result = sn('span', STRING_EMPTY_CLASS_NAME, '(Empty Text)');
      } else if (/^http(s)?:\/\//.test(data)) {
        const child = sn('span', STRING_CLASS_NAME, data);
        result = scn('a', HYPERLINK_CLASS_NAME, child);
        result.setAttribute('href', data);
        result.setAttribute('target', '_blank');
      } else {
        result = sn('span', STRING_CLASS_NAME, data);
      }
    } else if (type === INT) {
      result = sn('span', INT_CLASS_NAME, data);
    } else if (type === FLOAT) {
      result = sn('span', FLOAT_CLASS_NAME, data);
    } else if (type & OBJECT) {
      if (type & SPECIAL_OBJECT) {
        isSpecial = true;
      }
      childs = [];

      aTarget = options.hyperlinks.target;
      hyperlinkKeys = options.hyperlinks.keys;

      // Is Hyperlink Key
      hyperlinksEnabled = options.hyperlinks.enable
                && hyperlinkKeys
                && hyperlinkKeys.length > 0;

      for (key in data) {
        isEmpty = false;

        value = data[key];

        valNode = _format(value, options, key);
        keyNode = sn('th', OBJ_KEY_CLASS_NAME, key);

        if (hyperlinksEnabled
                    && typeof (value) === 'string'
                    && indexOf.call(hyperlinkKeys, key) >= 0) {
          valNode = scn('td', OBJ_VAL_CLASS_NAME, linkNode(valNode, value, aTarget));
        } else {
          valNode = scn('td', OBJ_VAL_CLASS_NAME, valNode);
        }

        tr = document.createElement('tr');
        tr.appendChild(keyNode);
        tr.appendChild(valNode);

        childs.push(tr);
      }

      if (isSpecial) {
        result = sn('span', STRING_CLASS_NAME, data.toString());
      } else if (isEmpty) {
        result = sn('span', OBJ_EMPTY_CLASS_NAME, '(Empty Object)');
      } else {
        result = scn('table', OBJECT_CLASS_NAME, scn('tbody', '', childs));
      }
    } else if (type === FUNCTION) {
      result = sn('span', FUNCTION_CLASS_NAME, data);
    } else if (type === ARRAY) {
      if (data.length > 0) {
        childs = [];
        const showArrayIndices = options.showArrayIndex;

        aTarget = options.hyperlinks.target;
        hyperlinkKeys = options.hyperlinks.keys;

        // Hyperlink of arrays?
        hyperlinksEnabled = parentKey && options.hyperlinks.enable
                    && hyperlinkKeys
                    && hyperlinkKeys.length > 0
                    && indexOf.call(hyperlinkKeys, parentKey) >= 0;

        for (key = 0, len = data.length; key < len; key += 1) {
          keyNode = sn('th', ARRAY_KEY_CLASS_NAME, key);
          value = data[key];

          if (hyperlinksEnabled && typeof (value) === 'string') {
            valNode = _format(value, options, key);
            valNode = scn('td', ARRAY_VAL_CLASS_NAME,
              linkNode(valNode, value, aTarget));
          } else {
            valNode = scn('td', ARRAY_VAL_CLASS_NAME,
              _format(value, options, key));
          }

          tr = document.createElement('tr');

          if (showArrayIndices) {
            tr.appendChild(keyNode);
          }
          tr.appendChild(valNode);

          childs.push(tr);
        }

        result = scn('table', ARRAY_CLASS_NAME, scn('tbody', '', childs));
      } else {
        result = sn('span', ARRAY_EMPTY_CLASS_NAME, '(Empty List)');
      }
    } else {
      result = sn('span', UNKNOWN_CLASS_NAME, data);
    }

    return result;
  }

  function validateArrayIndexOption(options) {
    if (options.showArrayIndex === undefined) {
      options.showArrayIndex = true;
    } else {
      // Force to boolean just in case
      options.showArrayIndex = !!options.showArrayIndex;
    }
    return options;
  }

  function validateHyperlinkOptions(options) {
    const hyperlinks = {
      enable: false,
      keys: null,
      target: '',
    };

    if (options.hyperlinks && options.hyperlinks.enable) {
      hyperlinks.enable = true;

      hyperlinks.keys = isArray(options.hyperlinks.keys) ? options.hyperlinks.keys : [];

      if (options.hyperlinks.target) {
        hyperlinks.target = `${options.hyperlinks.target}`;
      } else {
        hyperlinks.target = '_blank';
      }
    }

    options.hyperlinks = hyperlinks;

    return options;
  }

  function validateBoolOptions(options) {
    if (!options.bool) {
      options.bool = {
        text: {
          true: 'true',
          false: 'false',
        },
        img: {
          true: '',
          false: '',
        },
        showImage: false,
        showText: true,
      };
    } else {
      const boolOptions = options.bool;

      // Show text if no option
      if (!boolOptions.showText && !boolOptions.showImage) {
        boolOptions.showImage = false;
        boolOptions.showText = true;
      }

      if (boolOptions.showText) {
        if (!boolOptions.text) {
          boolOptions.text = {
            true: 'true',
            false: 'false',
          };
        } else {
          const t = boolOptions.text.true; const
            f = boolOptions.text.false;

          if (getType(t) !== STRING || t === '') {
            boolOptions.text.true = 'true';
          }

          if (getType(f) !== STRING || f === '') {
            boolOptions.text.false = 'false';
          }
        }
      }

      if (boolOptions.showImage) {
        if (!boolOptions.img.true && !boolOptions.img.false) {
          boolOptions.showImage = false;
        }
      }
    }

    return options;
  }

  function validateOptions(options) {
    options = validateArrayIndexOption(options);
    options = validateHyperlinkOptions(options);
    options = validateBoolOptions(options);

    // Add any more option validators here

    return options;
  }

  return (data, options) => {
    options = validateOptions(options || {});

    const result = _format(data, options);
    result.className = `${result.className} ${prefixer('root')}`;

    return result;
  };
})();
