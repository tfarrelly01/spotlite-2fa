import fetch from 'isomorphic-fetch';

export function apiParse(data) {
  console.log('data.status::', data.status);
  switch (data.status) {
    case "ok":
      return data.result;
    case "error":
      throw new Error(data.error || 'Unknown Error');
    default:
      throw new Error('Unknown Status');
  }
}

export function getRequest(URI) {
  // Performs GET request on passed Experian URI
  return fetch(URI, {
    method: 'GET',
    headers: {
      'Auth-Token': '81837610-8308-42d3-8288-41785455ebe3'
    },
    Accept: 'application.json'
  })
  .then(data => data.json())
  .catch(err => err)
}

export function postRequest(URI, options) {
  // Performs Post request on passed Experian URI and options
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

export function postApplicant(URI, options) {
  return fetch(URI, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(options)
  })
  .then(res => res.json())
  .catch(err => err)
}

export function getNewPin(URI) {
  return fetch(URI, {
    method: 'GET',
    Accept: 'application.json',
    credentials: 'include',
    /*
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    */
  })
  .then(data => data.json())
  .catch(err => err)
}