const server_adress =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:7000'
    : 'http://localhost:8000';

console.log(process.env);

export { server_adress };
