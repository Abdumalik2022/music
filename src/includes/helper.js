export default {
  formatDate(time) {
    const minutes = Math.floor(time / 60 || 0);
    const secunds = Math.round(time - minutes * 60 || 0);
    return `${minutes}:${secunds < 10 ? "0" : ""}${secunds}`;
  },
};
