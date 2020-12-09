import axios from "axios";

export default {
  get: async (path, options?) => axios.get(path, { params: options }),
  create: (path, item) => axios.post(path, item),
  update: (path, item, config?) => axios.put(path, item, config),
  delete: (path) => axios.delete(path)
};
