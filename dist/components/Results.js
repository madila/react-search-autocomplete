"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Results;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _SearchIcon = require("./SearchIcon");

var _jsxRuntime = require("react/jsx-runtime");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Results(_ref) {
  var _ref$results = _ref.results,
      results = _ref$results === void 0 ? [] : _ref$results,
      onClick = _ref.onClick,
      setSearchString = _ref.setSearchString,
      showIcon = _ref.showIcon,
      maxResults = _ref.maxResults,
      _ref$resultStringKeyN = _ref.resultStringKeyName,
      resultStringKeyName = _ref$resultStringKeyN === void 0 ? 'name' : _ref$resultStringKeyN,
      onHover = _ref.onHover,
      formatResult = _ref.formatResult;
  var formatResultWithKey = formatResult ? formatResult : function (item) {
    return item[resultStringKeyName];
  };

  var handleClick = function handleClick(result) {
    onClick(result);
    setSearchString(result[resultStringKeyName]);
  };

  if ((results === null || results === void 0 ? void 0 : results.length) <= 0) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StyledResults, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "line"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: results.slice(0, maxResults).map(function (result) {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          type: "button",
          onMouseEnter: function onMouseEnter() {
            return onHover(result);
          },
          "data-test": "result",
          onMouseDown: function onMouseDown() {
            return handleClick(result);
          },
          onClick: function onClick() {
            return handleClick(result);
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SearchIcon.SearchIcon, {
            showIcon: showIcon
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "ellipsis",
            title: result[resultStringKeyName],
            children: formatResultWithKey(result)
          })]
        }, "rsa-result-".concat(result.id));
      })
    })]
  });
}

var StyledResults = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  > div.line {\n    border-top-color: ", ";\n    border-top-style: solid;\n    border-top-width: 1px;\n\n    margin-bottom: 0px;\n    margin-left: 14px;\n    margin-right: 20px;\n    margin-top: 0px;\n\n    padding-bottom: 4px;\n  }\n\n  > ul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0px 0 16px 0;\n    max-height: ", ";\n\n    > li {\n      display: flex;\n      align-items: center;\n      padding: 4px 0 4px 0;\n\n      &:hover {\n        background-color: ", ";\n        cursor: default;\n      }\n\n      > div {\n        margin-left: 13px;\n      }\n    }\n  }\n\n  .ellipsis {\n    text-align: left;\n    width: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"])), function (props) {
  return props.theme.lineColor;
}, function (props) {
  return props.theme.maxHeight;
}, function (props) {
  return props.theme.hoverBackgroundColor;
});