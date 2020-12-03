import axios from "axios";

export default {
  list: async () => axios.get("/Industry"),
  datatable: async (options) => axios.get("/Industry/Datatable", { params: options }),
  create: (item) => axios.post("/Industry", item),
  update: (id, item) => axios.put(`/Industry/${id}`, item),
  delete: (id) => axios.delete(`/Industry/${id}`),
  fetchOngoing: (options) =>
    axios.get("https://sunbus-mdr.azurewebsites.net/api/Webapp/FetchOngoing", { params: options }),
  fetchOrders: (page, per_page) => axios.get("/api/OrdersDatatable", { params: { page, per_page } })
};
