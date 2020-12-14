import axios from "axios";

export default {
  list: async () => axios.get("/SupplierProduct"),
  create: (item) => axios.post("/SupplierProduct", item),
  update: (id, item) => axios.put(`/SupplierProduct/${id}`, item),
  delete: (id) => axios.delete(`/SupplierProduct/${id}`),
  datatable: async (options) => axios.get("/SupplierProduct/Datatable", { params: options })
};