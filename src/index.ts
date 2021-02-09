import { Plugin, PluginCreator } from "postcss";

function plugin(): Plugin {
  return {
    postcssPlugin: 'postcss-color-5',
    prepare() {
      return {
        Declaration(decl, helpers) {
          //console.log(decl);
        }
      }
    }
  }
}

// This function makes the "hybrid type" that PostCSS requires for their plugin creator
function makeCreator(): PluginCreator<Record<string, never>> {
  const creator = plugin as PluginCreator<Record<string, never>>;
  creator.postcss = true;
  return creator;
}

export default makeCreator();
