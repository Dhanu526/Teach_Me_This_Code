const fs = require('fs');
const path = require('path');

const appBuildDir = path.resolve(__dirname, '..', '..', '..', 'scratch', 'code-flow-visualizer', 'app_build');

const html = fs.readFileSync(path.join(appBuildDir, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(appBuildDir, 'styles.css'), 'utf-8');
const js = fs.readFileSync(path.join(appBuildDir, 'app.js'), 'utf-8');

console.log('Checking index.html top-bar rows:');
if (!html.includes('top-bar-primary')) throw new Error('Missing top-bar-primary in index.html');
if (!html.includes('top-bar-secondary')) throw new Error('Missing top-bar-secondary in index.html');
console.log('  ✓ top-bar-primary & top-bar-secondary present');

console.log('Checking styles.css updates:');
if (!css.includes('.top-bar-primary')) throw new Error('Missing .top-bar-primary in CSS');
if (!css.includes('.top-bar-secondary')) throw new Error('Missing .top-bar-secondary in CSS');
if (!css.includes('.decision-badge.is-pending')) throw new Error('Missing .decision-badge.is-pending in CSS');
if (!css.includes('.branch-option.is-neutral-branch')) throw new Error('Missing .branch-option.is-neutral-branch in CSS');
if (!css.includes('position: sticky;')) throw new Error('Missing position: sticky in CSS');
if (!css.includes('gap: 10px;')) throw new Error('Missing gap: 10px in CSS');
console.log('  ✓ styles.css tightened layout & classes present');

console.log('Checking app.js isPredictPending logic:');
if (!js.includes('isPredictPending')) throw new Error('Missing isPredictPending in app.js');
if (!js.includes('is-neutral-branch')) throw new Error('Missing is-neutral-branch in app.js');
if (!js.includes('🎯 Predict To Reveal')) throw new Error('Missing Predict To Reveal in app.js');
console.log('  ✓ app.js prediction neutral gate logic verified');

console.log('\nALL UI GAP ADJUSTMENT CHECKS PASSED!');
