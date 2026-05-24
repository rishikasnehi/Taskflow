import api from './api';

const authService = {

  // REGISTER
  register: async (email, password, name) => {

    const response = await api.post('/auth/register', {
      email,
      password,
      name,
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },


  // LOGIN
  login: async (email, password) => {

    const response = await api.post('/auth/login', {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },


  // GET CURRENT USER
  getMe: async () => {

    const response = await api.get('/auth/me');

    return response.data;
  },


  // LOGOUT
  logout: () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;