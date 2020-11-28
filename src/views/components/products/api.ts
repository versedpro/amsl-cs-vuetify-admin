import axios from 'axios';

export default {
  list: async () => axios.get('/Product'),
  create: item => axios.post('/Product', item),
  update: (id, item) => axios.put(`/Product/${id}`, item),
  delete: id => axios.delete(`/Product/${id}`),
};
