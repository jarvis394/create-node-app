module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "no-console": "off",
    "no-inner-declarations": "off",
    "no-mixed-spaces-and-tabs": [
      "error",
      "smart-tabs"
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};