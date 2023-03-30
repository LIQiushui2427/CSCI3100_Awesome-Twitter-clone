export async function getThings() {
  try {
    const { data } = await client.get('/api');
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}