const service = require("../services/machine");
const { StatusCodes } = require("http-status-codes");
const { responser } = require("../utils/responser");

const listMachine = async (req, res, next) => {
  try {
    const machines = await service.listMachine(req.query);
    responser(res, machines, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const addMachine = async (req, res, next) => {
  try {
    const idPemilik = res.locals.auth;
    const newMachine = await service.addMachine(idPemilik, req.body);
    responser(res, newMachine, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

const editMachine = async (req, res, next) => {
  try {
    const idMesin = req.params.id;
    const editedMachine = await service.editMachine(idMesin, req.body);
    responser(res, editedMachine, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const deleteMachine = async (req, res, next) => {
  try {
    const idPemilik = res.locals.auth;
    const { id } = req.params;
    const deleted = await service.deleteMachine(id, idPemilik);
    responser(res, deleted, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const deleteManyMachine = async (req, res, next) => {
  try {
    const idPemilik = res.locals.auth;
    const deletedResult = await service.deleteManyMachine(idPemilik, req.body);
    responser(res, deletedResult, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listMachine,
  deleteMachine,
  addMachine,
  editMachine,
  deleteManyMachine,
};
