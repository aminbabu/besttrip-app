/**
 * @file /constants/_xss-whitelist.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// whitelist for xss
const WHITE_LIST = {
    whiteList: {
        h1: ['class'],
        h2: ['class'],
        h3: ['class'],
        h4: ['class'],
        h5: ['class'],
        h6: ['class'],
        a: ['class', 'href', 'title', 'target'],
        img: ['class', 'src', 'alt'],
        p: ['class'],
        div: ['class'],
        span: ['class'],
        ul: ['class'],
        ol: ['class'],
        li: ['class'],
        table: ['class'],
        thead: ['class'],
        tbody: ['class'],
        tr: ['class'],
        th: ['class'],
        td: ['class'],
        strong: ['class'],
        em: ['class'],
        br: ['class'],
        hr: ['class'],
        b: ['class'],
        i: ['class'],
        u: ['class'],
        code: ['class'],
    },
};

// export whiteList
module.exports = {
    WHITE_LIST,
};
