import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use((request) => {
  console.log('Sending request:');
  console.log('URL:', request.url);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);
  console.log('Data:', request.data);
  return request; // Kontynuuj wysyłanie żądania
});

api.interceptors.response.use(
  (response) => {
    console.log('Response received:');
    console.log('Status:', response.status);
    console.log('Data:', response.data);

    response.data = camelcaseKeys(response.data, { deep: true });
    return response; // Zwróć odpowiedź do aplikacji
  },
  (error) => {
    console.error('Request failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
