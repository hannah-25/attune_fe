declare module 'node:assert/strict' {
  type ThrowsInput = RegExp | ((error: unknown) => boolean) | object | Error;

  const assert: {
    ok(value: unknown, message?: string): asserts value;
    equal(actual: unknown, expected: unknown, message?: string): void;
    deepEqual(actual: unknown, expected: unknown, message?: string): void;
    throws(fn: () => unknown, expected?: ThrowsInput, message?: string): void;
    rejects(
      promiseOrFn: Promise<unknown> | (() => Promise<unknown>),
      expected?: ThrowsInput,
      message?: string,
    ): Promise<void>;
  };

  export default assert;
}

declare module 'node:test' {
  export default function test(name: string, fn: () => void | Promise<void>): void;
}
