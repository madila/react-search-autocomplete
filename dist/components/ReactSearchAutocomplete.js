"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReactSearchAutocomplete;
exports.MAX_RESULTS = exports.DEFAULT_INPUT_DEBOUNCE = void 0;

var _fuse = _interopRequireDefault(require("fuse.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _config = require("../config/config");

var _utils = require("../utils/utils");

var _Results = _interopRequireDefault(require("./Results"));

var _SearchInput = _interopRequireDefault(require("./SearchInput"));

var _jsxRuntime = require("react/jsx-runtime");

var _templateObject;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_INPUT_DEBOUNCE = 200;
exports.DEFAULT_INPUT_DEBOUNCE = DEFAULT_INPUT_DEBOUNCE;
var MAX_RESULTS = 10;
exports.MAX_RESULTS = MAX_RESULTS;

function ReactSearchAutocomplete(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      _ref$fuseOptions = _ref.fuseOptions,
      fuseOptions = _ref$fuseOptions === void 0 ? _config.defaultFuseOptions : _ref$fuseOptions,
      _ref$inputDebounce = _ref.inputDebounce,
      inputDebounce = _ref$inputDebounce === void 0 ? DEFAULT_INPUT_DEBOUNCE : _ref$inputDebounce,
      _ref$onSearch = _ref.onSearch,
      onSearch = _ref$onSearch === void 0 ? function () {} : _ref$onSearch,
      _ref$onHover = _ref.onHover,
      onHover = _ref$onHover === void 0 ? function () {} : _ref$onHover,
      _ref$onSelect = _ref.onSelect,
      onSelect = _ref$onSelect === void 0 ? function () {} : _ref$onSelect,
      _ref$onClear = _ref.onClear,
      onClear = _ref$onClear === void 0 ? function () {} : _ref$onClear,
      _ref$showIcon = _ref.showIcon,
      showIcon = _ref$showIcon === void 0 ? true : _ref$showIcon,
      _ref$showClear = _ref.showClear,
      showClear = _ref$showClear === void 0 ? true : _ref$showClear,
      _ref$maxResults = _ref.maxResults,
      maxResults = _ref$maxResults === void 0 ? MAX_RESULTS : _ref$maxResults,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? false : _ref$autoFocus,
      _ref$styling = _ref.styling,
      styling = _ref$styling === void 0 ? {} : _ref$styling,
      _ref$resultStringKeyN = _ref.resultStringKeyName,
      resultStringKeyName = _ref$resultStringKeyN === void 0 ? 'name' : _ref$resultStringKeyN,
      _ref$inputSearchStrin = _ref.inputSearchString,
      inputSearchString = _ref$inputSearchStrin === void 0 ? '' : _ref$inputSearchStrin;

  var theme = _objectSpread(_objectSpread({}, _config.defaultTheme), styling);

  var options = _objectSpread(_objectSpread({}, _config.defaultFuseOptions), fuseOptions);

  var fuse = new _fuse.default(items, options);
  fuse.setCollection(items);

  var _useState = (0, _react.useState)(inputSearchString),
      _useState2 = _slicedToArray(_useState, 2),
      searchString = _useState2[0],
      setSearchString = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      results = _useState4[0],
      setResults = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isFocused = _useState6[0],
      setIsFocused = _useState6[1];

  var wrapperRef = (0, _react.useRef)(null);

  var callOnSearch = function callOnSearch(keyword) {
    var newResults;
    newResults = (keyword === null || keyword === void 0 ? void 0 : keyword.length) > 0 ? fuseResults(keyword) : items;
    setResults(newResults);
    onSearch(keyword, newResults);
  };

  var handleOnSearch = _react.default.useCallback(inputDebounce > 0 ? (0, _utils.debounce)(function (keyword) {
    return callOnSearch(keyword);
  }, inputDebounce) : function (keyword) {
    return callOnSearch(keyword);
  }, [items]);

  var handleClickOutside = function handleClickOutside(event) {
    console.log(event, wrapperRef.current);

    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsFocused(false);
    }
  };

  (0, _react.useEffect)(function () {
    document.addEventListener('keydown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);
    return function cleanup() {
      document.removeEventListener('keydown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  (0, _react.useEffect)(function () {
    setSearchString(inputSearchString);
  }, [inputSearchString]);
  (0, _react.useEffect)(function () {
    (searchString === null || searchString === void 0 ? void 0 : searchString.length) > 0 && results && (results === null || results === void 0 ? void 0 : results.length) > 0 && setResults(fuseResults(searchString));
  }, [items]);

  var handleOnClick = function handleOnClick(result) {
    setResults(items);
    onSelect(result);
    setIsFocused(true);
  };

  var handleOnBlur = function handleOnBlur() {
    setResults(results.length > 0 ? results : items);
  };

  var handleOnFocus = function handleOnFocus() {
    console.log('focused');
    setResults(results.length > 0 ? results : items);
    setIsFocused(true);
  };

  var formatResult = function formatResult(item) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      tabIndex: 0,
      type: 'button',
      "aria-label": 'Select ' + item.name,
      className: "select-result",
      children: item.name
    });
  };

  var fuseResults = function fuseResults(keyword) {
    return fuse.search(keyword, {
      limit: maxResults
    }).map(function (result) {
      return _objectSpread({}, result.item);
    }).slice(0, maxResults);
  };

  var handleSetSearchString = function handleSetSearchString(_ref2) {
    var target = _ref2.target;
    var keyword = target.value;
    setSearchString(keyword);
    handleOnSearch(keyword);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledComponents.ThemeProvider, {
    theme: theme,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledReactSearchAutocomplete, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "wrapper",
        ref: wrapperRef,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SearchInput.default, {
          searchString: searchString,
          setSearchString: handleSetSearchString,
          autoFocus: autoFocus,
          onBlur: handleOnBlur,
          onFocus: handleOnFocus,
          onClear: onClear,
          placeholder: placeholder,
          showIcon: showIcon,
          showClear: showClear
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Results.default, {
          results: results,
          onClick: handleOnClick,
          onHover: onHover,
          isFocused: isFocused,
          setSearchString: setSearchString,
          showIcon: showIcon,
          maxResults: maxResults,
          resultStringKeyName: resultStringKeyName,
          setIsFocused: setIsFocused,
          formatResult: formatResult
        })]
      })
    })
  });
}

var StyledReactSearchAutocomplete = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n\n  height: ", ";\n\n  > .wrapper {\n    position: absolute;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n\n    border: ", ";\n    border-radius: ", ";\n\n    background-color: ", ";\n    color: ", ";\n\n    font-size: ", ";\n    font-family: ", ";\n\n    z-index: ", ";\n\n    &:hover {\n      box-shadow: ", ";\n    }\n    &:active {\n      box-shadow: ", ";\n    }\n    &:focus-within {\n      box-shadow: ", ";\n    }\n  }\n"])), function (props) {
  return parseInt(props.theme.height) + 2 + 'px';
}, function (props) {
  return props.theme.border;
}, function (props) {
  return props.theme.borderRadius;
}, function (props) {
  return props.theme.backgroundColor;
}, function (props) {
  return props.theme.color;
}, function (props) {
  return props.theme.fontSize;
}, function (props) {
  return props.theme.fontFamily;
}, function (props) {
  return props.theme.zIndex;
}, function (props) {
  return props.theme.boxShadow;
}, function (props) {
  return props.theme.boxShadow;
}, function (props) {
  return props.theme.boxShadow;
});