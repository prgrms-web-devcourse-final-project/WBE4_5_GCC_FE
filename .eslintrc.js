module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'import', 'tailwindcss'],
  rules: {
    //'react/react-in-jsx-scope': 'off', React17 이상에서 필요 없음
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/prop-types': 'off',
    'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
    'import/no-duplicates': 'error',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
  },
};
