import axios from 'axios';

export default {
  list: async () => axios.get('/Supplier'),
  create: item => axios.post('/Supplier', item),
  update: (id, item) => axios.put(`/Supplier/${id}`, item),
  delete: id => axios.delete(`/Supplier/${id}`),
  datatable: (sort, page,  per_page, filter) => axios.get(`/Industry/Datatable?sort=${sort}&page=${page}&per_page=${per_page}&filter=${filter}`)
};
