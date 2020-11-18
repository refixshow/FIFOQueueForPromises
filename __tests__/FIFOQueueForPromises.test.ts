import FIFOQueueForPromises from "../FIFOQueueForPromises"

describe("Testing FIFOQueueForPromises", () => {
  const goodPromiseCreator = (id: number, time: number) => {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve("goodPromise " + id)
      }, time)
    })
  }

  const badPromiseCreator = (id: number, time: number) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject("badPromise " + id)
      }, time)
    })
  }

  it("should have name after class constructor call", () => {
    const MockedClass = new FIFOQueueForPromises("test")
    expect(MockedClass.queueName).toBe("test")
  })

  it("should throw an error on get() call when promises aren't solved", () => {
    const MockedClass = new FIFOQueueForPromises("test")

    const mockedgoodPromise = goodPromiseCreator(1, 1000)

    MockedClass.add(mockedgoodPromise)
    MockedClass.add(mockedgoodPromise)
    MockedClass.add(mockedgoodPromise)

    const mockedCall = () => {
      MockedClass.get()
    }

    expect(mockedCall).toThrow(new Error("Wait until promises solve"))
  })

  it("should return results using good promises", async (done) => {
    const MockedClass = new FIFOQueueForPromises("test")

    const mockedgoodPromise = goodPromiseCreator(1, 100)

    const numberOfPromises = 2

    MockedClass.add(mockedgoodPromise)
    MockedClass.add(mockedgoodPromise)

    setTimeout(() => {
      const result = MockedClass.get()
      const length = result.results.length

      const goodResult1 = result.results[0].promiseResult
      const goodResult2 = result.results[1].promiseResult

      const expectedGoodResult = "goodPromise 1"

      // check if number or promises are equal to number of results
      expect(length).toBe(numberOfPromises)

      expect(goodResult1).toBe(expectedGoodResult)
      expect(goodResult2).toBe(expectedGoodResult)
      done()
    }, 210)
  })

  it("should return results using bad promises", async (done) => {
    const MockedClass = new FIFOQueueForPromises("test")

    const mockedBadPromise = badPromiseCreator(1, 100)

    const numberOfPromises = 2

    MockedClass.add(mockedBadPromise)
    MockedClass.add(mockedBadPromise)

    setTimeout(() => {
      const result = MockedClass.get()
      const length = result.results.length

      const badResult1 = result.results[0].promiseResult
      const badResult2 = result.results[1].promiseResult

      const expectedBadResult = "badPromise 1"

      // check if number or promises are equal to number of results
      expect(length).toBe(numberOfPromises)

      expect(badResult1).toBe(expectedBadResult)
      expect(badResult2).toBe(expectedBadResult)
      done()
    }, 210)
  })

  it("should return results using good and bad promises", async (done) => {
    const MockedClass = new FIFOQueueForPromises("test")

    const mockedgoodPromise = goodPromiseCreator(1, 100)
    const mockedBadPromise = badPromiseCreator(1, 100)

    const numberOfPromises = 2

    MockedClass.add(mockedgoodPromise)
    MockedClass.add(mockedBadPromise)

    setTimeout(() => {
      const result = MockedClass.get()
      const length = result.results.length

      const goodResult = result.results[0].promiseResult
      const badResult = result.results[1].promiseResult

      const expectedGoodResult = "goodPromise 1"
      const expectedBadResult = "badPromise 1"

      // check if number or promises are equal to number of results
      expect(length).toBe(numberOfPromises)

      expect(goodResult).toBe(expectedGoodResult)
      expect(badResult).toBe(expectedBadResult)
      done()
    }, 210)
  })
})
