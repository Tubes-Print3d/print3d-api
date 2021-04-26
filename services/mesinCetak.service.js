const listMesin = (mesinCetak)  => async (queries = {}) =>{
    const mesin = await mesinCetak.find(lokasi);
    return mesin;
}

module.exports = (model) => ({
    listMesin: listMesin(model),
  });