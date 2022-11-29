import { v1 as uuidv1 } from 'uuid';

import { getAllGateways, getGateway, addGateway, deleteGateway } from '../database/gateways.js';

const getAllService = async () => {
    try {
        return getAllGateways();
    } catch (error) {
        throw new Error({ message: `Fail to get gateways list: ${error.message ? error.message : error }` });
    }
};

const getGatewayService = async (gateid) => {
    try {
        return getGateway(gateid);
    } catch (error) {
        console.log(error.message.Error)
        throw new Error({ message: `Fail to get gateway: ${error.message ? error.message : error}` });
    }
};

const newGatewayService = async (serial, name, ipadress) => {
    try {
        const newGateway = {
            "id": uuidv1(),
            "serial": serial,
            "name": name,
            "ipv4": ipadress,
            "peripherals": [

            ]
        }
        return addGateway(newGateway);
    } catch (error) {
        throw new Error({ message: `Fail to create gateway: ${error.message ? error.message : error}` });
    }
};

const deleteGatewayService = async (gateid) => {
    try {
        return deleteGateway(gateid);
    } catch (error) {
        throw new Error({ message: `Fail to delete gateway: ${error.message ? error.message : error}` });
    }
};

export { getAllService, getGatewayService, newGatewayService, deleteGatewayService };
