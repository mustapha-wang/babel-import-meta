# import-meta
A Babel plugin,transform import.meta:

 - (1) rewrite "import.meta.url" to "__filename"
 - (2) rewrite "import.meta.resolve" to "require.resolve"


## usage

```
var babel = require("@babel/core");
let babel_preset_env=require('@babel/preset-env');
let babel_plugin_import_meta=require('import-meta');
let r=babel.transformSync(code,{
  presets: [babel_preset_env],
  plugins:[babel_plugin_import_meta]
});
```