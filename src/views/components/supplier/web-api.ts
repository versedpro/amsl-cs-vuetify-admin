import axios from "axios";

export default {
  list: async () => axios.get("/Supplier"),
  create: (item) => axios.post("/Supplier", item),
  update: (id, item) => axios.put(`/Supplier/${id}`, item),
  delete: (id) => axios.delete(`/Supplier/${id}`),
  datatable: async (options) => axios.get("/Supplier/Datatable", { params: options })
};
