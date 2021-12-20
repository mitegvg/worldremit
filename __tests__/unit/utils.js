import {expandUser} from '../../src/utils/listUtils';
describe('Utils tests', () => {
  test('Expand user function should trigger the setExpanded function', done => {
    const testFunc = newExpanded => {
      expect(newExpanded[123]).toBe(true);
      done();
    };
    expandUser(123, {123: false}, testFunc);
  });
});
