"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchInput;

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ClearIcon = require("./ClearIcon");

var _SearchIcon = require("./SearchIcon");

var _jsxRuntime = require("react/jsx-runtime");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function SearchInput(_ref) {
  var searchString = _ref.searchString,
      setSearchString = _ref.setSearchString,
      autoFocus = _ref.autoFocus,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      onClear = _ref.onClear,
      placeholder = _ref.placeholder,
      _ref$showIcon = _ref.showIcon,
      showIcon = _ref$showIcon === void 0 ? true : _ref$showIcon,
      _ref$showClear = _ref.showClear,
      showClear = _ref$showClear === void 0 ? true : _ref$showClear;
  var ref = (0, _react.useRef)(null);
  var manualFocus = true;

  var setFocus = function setFocus() {
    manualFocus = false;
    (ref === null || ref === void 0 ? void 0 : ref.current) && ref.current.focus();
    manualFocus = true;
  };

  var handleOnFocus = function handleOnFocus(event) {
    manualFocus && onFocus(event);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StyledSearchInput, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SearchIcon.SearchIcon, {
      showIcon: showIcon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: ref,
      spellCheck: false,
      value: searchString,
      onChange: setSearchString,
      onBlur: onBlur,
      onFocus: handleOnFocus,
      placeholder: placeholder,
      autoFocus: autoFocus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClearIcon.ClearIcon, {
      showClear: showClear,
      setSearchString: setSearchString,
      searchString: searchString,
      onClear: onClear,
      setFocus: setFocus
    })]
  });
}

var StyledSearchInput = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  min-height: ", ";\n  width: 100%;\n\n  display: flex;\n  align-items: center;\n\n  > input {\n    width: 100%;\n\n    padding: 0 0 0 13px;\n\n    border: none;\n    outline: none;\n\n    background-color: rgba(0, 0, 0, 0);\n    font-size: inherit;\n    font-family: inherit;\n\n    color: ", ";\n\n    ::placeholder {\n      color: ", ";\n      opacity: 1;\n\n    :-ms-input-placeholder {\n      color: ", ";\n    }\n\n    ::-ms-input-placeholder {\n      color: ", ";\n    }\n  }\n"])), function (props) {
  return props.theme.height;
}, function (props) {
  return props.theme.color;
}, function (props) {
  return props.theme.placeholderColor;
}, function (props) {
  return props.theme.placeholderColor;
}, function (props) {
  return props.theme.placeholderColor;
});