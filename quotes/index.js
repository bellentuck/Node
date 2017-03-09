//// I. fetch data ////
const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
const fetch = require('node-fetch')

//// II. create generator ////
function* createQuoteFetcher() {
  // fetch API data
  const response = yield fetch(url)
  // parse response
  const quote = yield response.json()
  // return formatted quote
  return `${quote.quoteText} -${quote.quoteAuthor}`
}

//// III. generator helper function, coroutine() ////
//  [can also npm install co and write,
//  `const coroutine = require('co')`.]
const coroutine = (gen) => {
  const generator = gen()
  // call generator recursively via handle(), which will
  // get result from generator.next() and do something with it
  const handle = (result) => {
    // if generator {done: true}, end recursion
    if (result.done) return Promise.resolve(result.value)
    // if generator {done: false}, both wait until promise has resolved...
    return Promise.resolve(result.value)
      // ...and then pass result back into handle
      .then(res => handle(generator.next(res)))
  }
  return handle(generator.next())
}

//// IV. generator in action ////
// create generator instance
const quoteFetcher = coroutine(createQuoteFetcher)
// run generator
quoteFetcher.then(quote => console.log(quote))

/** The following is what we've generalized via coroutine():
quoteFetcher.next().value  // start generator; 'value' is a promise
  .then(res => quoteFetcher.next(res).value)
  .then(res => quoteFetcher.next(res).value)
  .then(quote => console.log(quote))
  .catch(error => console.log(error))
*/
