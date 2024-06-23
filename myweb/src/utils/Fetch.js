export async function fetchFunction(credentials) {
    return fetch('http://localhost:8080/api' + credentials.reqType, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  };