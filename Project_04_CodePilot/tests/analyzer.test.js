import test from 'node:test';import assert from 'node:assert/strict';import {analyze,validateCode} from '../analyzer.js';
test('flags embedded secrets',()=>assert.equal(analyze('const password = "abcd1234"').counts.critical,1));
test('flags HTML injection',()=>assert.equal(analyze('el.innerHTML = userInput').counts.warning,1));
test('empty code is rejected',()=>assert.throws(()=>validateCode('  '),/Enter some code/));
test('clean code scores 100',()=>assert.equal(analyze('const answer = 42;').score,100));
test('python bare except flagged',()=>assert.equal(analyze('try:\n pass\nexcept:', 'python').counts.warning,1));
