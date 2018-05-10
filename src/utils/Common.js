import fetch from 'isomorphic-fetch';

export function getRequest(URI, options) {
  // Performs GET request on passed URI
  return fetch(URI, {
    Accept: 'application.json'
  })
  .then(data => data.json())
  .catch(err => err)
}

export function postRequest(URI, options) {
  // Performs Post request on passed URI and options
  return fetch(URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': '81837610-8308-42d3-8288-41785455ebe3'
    },
    body: JSON.stringify(options)
  })
  .then(res => res.json())
  .catch((err) => {console.log('err::', err); return err;})
}
