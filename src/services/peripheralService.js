import { v1 as uuidv1 } from 'uuid';

import { getAllPeripheralsInGate, getPeripheral, addPeripheraltoGate, deletePeripheral, } from "../database/gateways.js";

const getAllService = async (gateid) => {
  try {
    return getAllPeripheralsInGate(gateid);
  } catch (error) {
    throw ({ message: `Fail to get Peripheral list of given Gateway: ${error?.message || error}` });
  }
};

const getPeripheralService = async (gateid, periid) => {
  try {
    return getPeripheral(gateid, periid);
  } catch (error) {
    throw ({ message: `Fail to get Peripheral: ${error?.message || error}` });
  }
};

const newPeripheralService = async (gateid, uid, vendor, state) => {
  try {
    if (getAllPeripheralsInGate(gateid).length >= 10) {
      throw {
        message: 'Allowed only 10 Peripheral for each gateway',
      };
    }
    const newperipheral = {
      "id": uuidv1(),
      "uid": uid,
      "vendor": vendor,
      "create_date": new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      "status": state
    }
    return addPeripheraltoGate(newperipheral);
  } catch (error) {
    throw ({ message: `Fail to add Peripheral: ${error?.message || error}` });
  }

};

const deletePeripheralService = async (gateid, periid) => {
  try {
    return deletePeripheral(gateid, periid);
  } catch (error) {
    throw ({ message: `Fail to delete Peripheral: ${error?.message || error}` });
  }
};

export { getAllService, getPeripheralService, newPeripheralService, deletePeripheralService };