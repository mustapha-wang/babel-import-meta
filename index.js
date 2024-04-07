/**
 * @author mustapha.wang 2024/4/7
 * modified from 'babel-plugin-transform-import-meta';
 * (1)rewrite "import.meta.url" to "__filename"
 * (2)rewrite "import.meta.resolve" to "require.resolve"
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var template = require('@babel/template');

function index () {
  return {
    name: 'transform-import-meta',
    visitor: {
      Program: function (path, state) {
        var _a;
        var _b = ((_a = state.opts) !== null && _a !== void 0 ? _a : {}).module;
        var target = _b === void 0 ? 'CommonJS' : _b;
        if (target !== 'CommonJS') return;

        var metaUrls = [];
        var metaResolves = [];
        path.traverse({
          MemberExpression: function (memberExpPath) {
            var node = memberExpPath.node;
            if (node.object.type === 'MetaProperty' &&
              node.object.meta.name === 'import' &&
              node.object.property.name === 'meta' &&
              node.property.type === 'Identifier'){
              if (node.property.name === 'url') {
                metaUrls.push(memberExpPath);
              }
              else if (node.property.name === 'resolve') {
                metaResolves.push(memberExpPath);
              }
            }
          }
        });
        if (metaUrls.length === 0 && metaResolves.length===0) {
          return;
        }
        var metaUrlReplacement=template.smart.ast('__filename');
        var metaRequireReplacement=template.smart.ast('require.resolve');
        for (var _i = 0, metas_1 = metaUrls; _i < metas_1.length; _i++) {
          var meta = metas_1[_i];
          meta.replaceWith(metaUrlReplacement);
        }
        for (var _i = 0, metas_1 = metaResolves; _i < metas_1.length; _i++) {
          var meta = metas_1[_i];
          meta.replaceWith(metaRequireReplacement);
        }
      }
    }
  };
}

exports["default"] = index;