// Stwórz kolejkę typu FILO - First In Last Out dla zbioru promisów
// klasa powinna być podobnej struktury co do przykładu, jednak poniższa klasa nie zawiera wszystkich wymaganych metod

class FILOQueueForPromises {
  promises = [] // lista dodanych do kolejki, nie wywołanych promisów
  results = [] // lista wyników (error to też wynik) z wywołanych promisów, łącznie z timestampem wykonania
  constructor(queueName) {
    // queueName - nazwa kolejki w celach identyfikacyjnym
  }

  add(functionWrapperForPromise) {
    // metoda, która dodaje do kolejki this.promises kolejną niewykonaną promisę
  }

  runNext() {
    // metoda, która odpowiada za uruchamianie ostatnio dodanej do kolejki promisy
  }

  onResult(callback) {
    // metoda, wywołująca się po ukończeniu każdej promisy z kolejki z argumentem callback
    // który działa tak -> callback(promiseId, promiseResult, promiseDoneAt)
  }
}
