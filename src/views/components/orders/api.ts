import axios from "axios";

export default {
  list: async () => axios.get("/Industry"),
  datatable: async (options) => axios.get("/Industry/Datatable", { params: options }),
  create: (item) => axios.post("/Industry", item),
  update: (id, item) => axios.put(`/Industry/${id}`, item),
  delete: (id) => axios.delete(`/Industry/${id}`),
  fetchOngoing: (options) => axios.get("/api/Webapp/FetchOngoing", { params: options })
};
