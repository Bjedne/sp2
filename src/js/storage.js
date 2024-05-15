export default {
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get: (key) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return null;
  },

  clear: () => {
    localStorage.clear();
  },
};
