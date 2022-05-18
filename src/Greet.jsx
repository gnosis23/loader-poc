import React from 'react'
import { calc, fetcher } from './utils'

export const loader = () => {
  return fetcher('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
};

export default () => {
  const [count, setCount] = React.useState(1);
  return <h1>Greet {calc(1, count)}</h1>
}
