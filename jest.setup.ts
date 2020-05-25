import { matcherHint } from 'jest-matcher-utils';

expect.extend({
  toBeCalledWithInstanceOf(received: any, expected: any) {
    const value = received.mock.calls[0][0];
    const pass = value instanceof expected;

    const passMessage = (expected: any) => () =>
      `${matcherHint('.not.toBeCalledWithIstanceOf', 'received', 'expected')}

      Expected constructor not to be: ${expected.name}`;

    const failMessage = (expected: any) => () =>
      `${matcherHint('.toBeCalledWithIstanceOf', 'received', 'expected')}

      Expected constructor to be: ${expected.name}`;

    return {
      pass,
      message: pass ? passMessage(expected) : failMessage(expected),
    };
  },
});
