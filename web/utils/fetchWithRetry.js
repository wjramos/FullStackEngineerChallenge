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

    async function fetchRetry() {
      try {
        const result = await fetchData();

        resolve(result);
      } catch (err) {
        console.info('Retrying request…');

        setTimeout(async () => {
          try {
            const result = await fetchData();

            resolve(result);
          } catch (e) {
            reject(e);
          }
        }, 500);
      }
    }

    fetchRetry();
  });
}
