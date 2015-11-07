'use strict';

/**
 * Dependencies
 */
const express = require('express');

const app = express();

app
  .post('/:format', () => {
    // 1. parse markdown
    // 2. Make some typography things
    // 3. Compile to given format
    // 4. Return result
    // 5. …
    // 6. PROFIT
  })
;
