import { fetcher  } from "./utils"

export const loader = () => {
  return fetcher('https://jsonplaceholder.typicode.com/todos/2')
    .then(response => response.json())
};

export default () => <h1>Hello</h1>
