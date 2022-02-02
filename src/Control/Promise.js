// module Control.Promise

export function promise(f) {
  return () => new Promise((success, error) => {
    const succF = s => () => success(s);
    const failF = s => () => error(s);

    // This indicates the aff was wrong?
    try { f(succF)(failF)(); }
    catch (e) {
      error(e);
    }
  });
}

export function thenImpl(promise) {
  return errCB => succCB => () => {
    promise.then(succCB, errCB);
  };
}
