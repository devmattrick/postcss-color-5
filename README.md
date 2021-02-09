# PostCSS Color 5

[PostCSS] plugin to add support for [CSS Color Module Level 5] (color-mix, color-contrast, color-adjust).

[PostCSS]: https://github.com/postcss/postcss
[CSS Color Module Level 5]: https://drafts.csswg.org/css-color-5/

```css
.foo {
  /* TODO */
}
```

```css
.foo {
  /* Output example */
}
```

## Compatibility Notice
This plugin currently tracks the [editor's draft] of CSS Color Module Level 5, which is still in a state of uncertainty.
This means that a lot of the syntax may change. This plugin follows semver and will not break existing setups, but just
be aware that the CSS you write now may not be standard when the draft is actually accepted! It also may break between
major versions of postcss-color-5.

[editor's draft]: https://drafts.csswg.org/css-color-5/

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-color-5
```

**Step 2:** Check you project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-color-5'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
