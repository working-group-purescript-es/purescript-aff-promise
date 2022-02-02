// module Control.Promise

export const promise = f => () => {
  return new Promise(function (success, error) {
    var succF = function (s) {
      return function () {
        return success(s)
      }
    }
    var failF = function (s) {
      return function () {
        return error(s)
      }
    }

    // This indicates the aff was wrong?
    try {
      f(succF)(failF)()
    } catch (e) {
      error(e)
    }
  })
}

export const thenImpl = promise => errCB => succCB => () => {
  promise.then(succCB, errCB)
}
