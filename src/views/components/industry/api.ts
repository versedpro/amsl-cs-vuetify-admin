import axios from 'axios';

export default {
  list: async () => axios.get('/Industry'),
  create: item => axios.post('/Industry', item),
  update: (id, item) => axios.put(`/Industry/${id}`, item),
  delete: id => axios.delete(`/Industry/${id}`),
};
