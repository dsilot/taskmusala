const { v1 } = require('uuid');

const { getAllGateways, getGateway, addGateway, deleteGateway } = require( '../database/gateways');

const getAllService = async () => {
    try {
        return getAllGateways();
    } catch (error) {
        throw ({ message: `Fail to get gateways list: ${error.message ? error.message : error }` });
    }
};

const getGatewayService = async (gateid) => {
    try {
        return getGateway(gateid);
    } catch (error) {
        throw ({ message: `Fail to get gateway: ${error.message ? error.message : error}` });
    }
};

const newGatewayService = async (serial, name, ipadress) => {
    try {
        const newGateway = {
            "id": v1(),
            "serial": serial,
            "name": name,
            "ipv4": ipadress,
            "peripherals": [

            ]
        }
        return addGateway(newGateway);
    } catch (error) {
        throw ({ message: `Fail to create gateway: ${error.message ? error.message : error}` });
    }
};

const deleteGatewayService = async (gateid) => {
    try {
        return deleteGateway(gateid);
    } catch (error) {
        throw ({ message: `Fail to delete gateway: ${error.message ? error.message : error}` });
    }
};

module.exports= { getAllService, getGatewayService, newGatewayService, deleteGatewayService };
