// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier', 'plugin:vue/vue3-recommended'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'vue/no-unused-vars': 'error',
    'prettier/prettier': 'error',
  },
};
