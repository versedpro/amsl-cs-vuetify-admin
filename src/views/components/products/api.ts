import axios from 'axios';

export default {
  list: async () => axios.get('/Product'),
  datatable: async (options) => axios.get('/Product/Datatable', { params: options }),
  create: item => axios.post('/Product', item),
  update: (id, item) => axios.put(`/Product/${id}`, item),
  delete: id => axios.delete(`/Product/${id}`),
};
