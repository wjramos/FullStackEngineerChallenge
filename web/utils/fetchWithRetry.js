export default function fetchWithRetry(url, config = {}) {
  return new Promise(async (resolve, reject) => {
    async function fetchData() {
      const response = await fetch(url, config);
      const result = await response.json();

      resolve(result);
    }

    try {
      await fetchData();
    } catch (error) {
      console.error(error, 'Retrying request…');

      setTimeout(async () => {
        try {
          await fetchData();
        } catch(e) {
          reject('Could not retrieve data');
        }
      }, 500);
    }
  });
}