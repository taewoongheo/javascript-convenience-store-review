import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import pluginJs from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';
import eslintConfigPrettier from 'eslint-config-prettier';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...compat.extends('eslint-config-airbnb-base'),
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      ecmaVersion: 'latest',
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
      'class-methods-use-this': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'no-underscore-dangle': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
