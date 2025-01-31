// @ts-check

import fs from 'fs';
import { Console } from '@woowacourse/mission-utils';

/**
 *
 * @param {string} path
 * @returns {string}
 */
export function inputReadFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

/**
 *
 * @param {string} message
 */
export function output(message) {
  Console.print(message);
}
