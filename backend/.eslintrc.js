module.exports = {
  extends: ['plugin:prettier/recommended'],

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'error'
  },
  env: {
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2017
  }
}
