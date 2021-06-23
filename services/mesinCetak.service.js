const listMesin =
  (mesinCetak) =>
  async (queries = {}) => {
    const mesin = await mesinCetak.find(queries);
    return mesin;
  };

module.exports = (model) => ({
  listMesin: listMesin(model),
});
