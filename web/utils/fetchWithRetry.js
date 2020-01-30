export default function fetchWithRetry(url, method = 'GET', body = {}) {
  const config = method === 'GET' ? undefined : {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return new Promise((resolve, reject) => {
    async function fetchData() {
      const response = await fetch(url, config);
      const result = await response.json();

      return result;
    }

    fetchData.then(resolve).catch(() => {
      console.info('Retrying request…');

      // Try request again after half a second
      setTimeout(() => {
        fetchData.then(resolve).catch(reject);
      }, 500);
    });
  });
}
