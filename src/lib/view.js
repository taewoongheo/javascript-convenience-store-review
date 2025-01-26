// @ts-check

import fs from 'fs';

/**
 *
 * @param {string} path
 * @returns {string}
 */
export default function inputReadFile(path) {
  return fs.readFileSync(path, 'utf-8');
}
