module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', {
      "code": 80,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignorePattern: 'd="([\\s\\S]*?)"',
    }],
  },
  plugins: ['prettier'],
};
