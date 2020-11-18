interface Result {
  // promiseResult: Response <--- ADD WITHOUT TESTS
  promiseResult: unknown
  promiseDoneAt: string
}

class FIFOQueueForPromises {
  queueName: string = ""
  pending = false
  // private promises: Promise<Response>[] = [] <--- ADD WITHOUT TESTS
  promises: Promise<unknown>[] = []
  results: Result[] = []

  constructor(queueName: string) {
    this.queueName = queueName
  }

  // prepare result
  // fill results
  // free incoming promises
  // call runNext

  // private onResult(promiseResult: Response, date: Date) <--- ADD WITHOUT TESTS
  private onResult(promiseResult: unknown, date: Date) {
    const miliseconds = date.getMilliseconds()
    const seconds = date.getSeconds()
    const minutes = date.getMinutes()
    const hours = date.getHours()

    const time = [hours, minutes, seconds, miliseconds].join(";")

    const result: Result = {
      promiseResult,
      promiseDoneAt: time,
    }

    this.results.push(result)
    this.pending = false
    this.runNext()
  }

  // solve recently added promise
  // get timestamp
  // call onResult
  private async runNext() {
    // check if any promise is being solved
    if (this.pending) return

    // check if any promise is in quene
    if (this.promises.length === 0) return

    // block incoming promises
    this.pending = true

    // let result: Response  <--- ADD WITHOUT TESTS
    let promiseResult: unknown
    // solve promise
    try {
      promiseResult = await this.promises.shift()
    } catch (err) {
      promiseResult = err
    }

    // get timestamp
    const date = new Date()

    // call when promiseResult and timestamp are ready
    this.onResult(promiseResult, date)
  }

  // add promise
  // add(promise: Promise<Response>)  <--- ADD WITHOUT TESTS
  add(promise: Promise<unknown>) {
    this.promises.push(promise)
    // call runNext to start solving
    this.runNext()
  }

  // get resolved promises
  get() {
    if (this.promises.length > 0) {
      throw new Error("Wait until promises solve")
    }

    const solvedQuene = {
      queueName: this.queueName,
      results: this.results,
    }

    return solvedQuene
  }
}

export default FIFOQueueForPromises
