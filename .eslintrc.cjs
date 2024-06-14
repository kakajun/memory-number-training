/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  plugins: ['prettier'],
  rules: {
    'comma-dangle': 'off',
    'vue/valid-v-slot': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'prettier/prettier': 'off'
  }
}
