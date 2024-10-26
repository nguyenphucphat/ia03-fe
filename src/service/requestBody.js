export const loginBody = (login) => ({
  username: login.username,
  password: login.password,
});

export const registerBody = (register) => ({
  email: register.email,
  username: register.username,
  password: register.password,
  name: register.name,
});
