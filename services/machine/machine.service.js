const { StatusCodes } = require("http-status-codes");

const listMachine =
  (Mesin) =>
  (queries = {}) => {
    return Mesin.find(queries).populate("pemilik", "nama").exec();
  };

const addMachine = (Mesin) => async (idPemilik, data) => {
  const newMachine = Mesin(data);
  newMachine.pemilik = idPemilik;
  return await newMachine.save();
};

const editMachine = (Mesin) => async (idMesin, data) => {
  const editedMachine = await Mesin.findByIdAndUpdate(idMesin, data, {
    new: true,
  }).exec();
  if (!editedMachine)
    return Promise.reject({
      status: StatusCodes.NOT_FOUND,
      error: "Mesin tidak ditemukan",
    });
  return editedMachine;
};

const deleteMachine = (Mesin) => async (idMesin, idPemilik) => {
  const mesin = await Mesin.findById(idMesin);
  if (!mesin)
    return Promise.reject({
      status: StatusCodes.NOT_FOUND,
      error: "Mesin tidak ditemukan",
    });
  if (String(mesin.pemilik) !== idPemilik)
    return Promise.reject({
      status: StatusCodes.FORBIDDEN,
      error: "Mesin milik orang lain",
    });
  const deleted = await Mesin.findByIdAndDelete(idMesin);
  return deleted;
};

const deleteManyMachine = (Mesin) => async (idPemilik, arrayId) => {
  for await (const mesin of Mesin.find({ _id: { $in: arrayId } })) {
    if (String(mesin.pemilik) !== idPemilik) {
      return Promise.reject({
        status: StatusCodes.FORBIDDEN,
        error: "Tidak dapat menghapus mesin milik orang lain",
      });
    }
  }

  const res = await Mesin.deleteMany({ _id: { $in: arrayId } });
  return res;
};

module.exports = (model) => ({
  listMachine: listMachine(model),
  addMachine: addMachine(model),
  editMachine: editMachine(model),
  deleteMachine: deleteMachine(model),
  deleteManyMachine: deleteManyMachine(model),
});
