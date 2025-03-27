// copy-shared.js
const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, 'shared');
const target = path.resolve(__dirname, 'backend', 'shared');

fs.cpSync(source, target, { recursive: true });
