const server_adress =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export { server_adress };
