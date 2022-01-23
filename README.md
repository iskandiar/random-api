## Random API

This poject is bootstraped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)!


### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Endpoints
* Get random item from the list
   * `/api/random/item?list=abc|bcd|dsa&pick=2`
* Get UUID
   * `/api/random/uuid`
* Get random number
   * `/api/random/number?min=1&max=100`
* Get dice result
   * `/api/random/dice`

You can change format by adding `&format=json` to response, and save query with `&save=true`.

##### TODO
Project not finished :)
* Add tests
* Create UI
* Create documentation
* Add more types
* Refactor, remove some unused code

