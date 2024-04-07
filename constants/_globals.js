/**
 * @file constants/_globals.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 06 April, 2024
 * @update_date 06 April, 2024
 */

// pagination constants
const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE_NUMBER = 1;

// file size constants
const HALF_MEGA_BYTE = 512 * 1024;
const ONE_MEGA_BYTE = 1024 * 1024;
const MIN_FILE_SIZE = ONE_MEGA_BYTE;
const MAX_FILE_SIZE = 10 * ONE_MEGA_BYTE;
const DEFAULT_FILE_SIZE = 5 * ONE_MEGA_BYTE;

// export constants
module.exports = {
    HALF_MEGA_BYTE,
    ONE_MEGA_BYTE,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_NUMBER,
    MIN_FILE_SIZE,
    MAX_FILE_SIZE,
    DEFAULT_FILE_SIZE,
};
