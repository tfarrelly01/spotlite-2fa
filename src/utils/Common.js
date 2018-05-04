import fetch from 'isomorphic-fetch';

export function getRequest(URI, options) {
  // Performs GET request on passed URI
  return fetch(URI, {
    Accept: 'application.json'
  })
  .then(data => data.json())
}
