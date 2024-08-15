/**
 * @file utils/global/currency-formatter.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 June, 2024
 * @update_date 15 Aug, 2024
 */

// dependencies
const currency = require('currency.js');

// export currency formatter function
module.exports = (price) =>
    currency(price, {
        symbol: 'BDT',
        separator: ',',
        decimal: '.',
        precision: 2,
        pattern: '# !',
        negativePattern: '-# !',
    }).format();
