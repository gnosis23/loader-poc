// import React from 'react'
import { calc } from './utils'
import { fetcher } from './utils'

export const loader = () => {
  return fetcher('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
};

export default () => <h1>Greet {calc(1, 100)}</h1>
