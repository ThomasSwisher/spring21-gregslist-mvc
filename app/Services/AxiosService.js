// NOTE URL doesn't need a / and will need to import this into the appropriate service pages
// Keep in mind pulling from one api and pushiing to another will need different imports. See Pokemon
export const api = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api'
})