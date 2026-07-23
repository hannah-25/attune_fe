// 하나의 공유 자원을 건드리는 비동기 작업을 호출 순서대로 직렬화한다.
//
// 앞 작업의 성공·실패와 무관하게 다음 작업을 잇는다 — 한 작업이 실패했다고 이후 작업이
// 영영 실행되지 않으면 락이 잠긴 채 남는다. 호출부에는 각자의 결과가 그대로 전달된다.

export type Mutex = <T>(operation: () => Promise<T>) => Promise<T>;

export function createMutex(): Mutex {
  let tail: Promise<unknown> = Promise.resolve();

  return <T>(operation: () => Promise<T>): Promise<T> => {
    const run = tail.then(operation, operation);
    // 체인에는 거부가 흐르지 않게 한다. run 자체는 호출부로 그대로 반환한다.
    tail = run.catch(() => {});
    return run;
  };
}
