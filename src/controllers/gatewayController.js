const { validationResult } = require('express-validator');

const { getAllService, getGatewayService, newGatewayService, deleteGatewayService } = require( "../services/gatewayService");
// get all gateways
const getAll = async (req, res) => {
    try {
        const alls = await getAllService();
        res.status(200).json({
            success: true,
            data: alls
        });
    } catch (error) {
        res.status(500)
            .json({ error: error.message ? error.message : error });
    }
};
//get gateway by ID
const getGateway = async (req, res) => {
    await get(req, res, "get");
};
// create new gateway
const newGateway = async (req, res) => {
    const { serial, name, ipadress } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const gate = await newGatewayService(serial, name, ipadress);
        res.status(201).json({
            success: true,
            data: gate
        });
    } catch (error) {
        res.status(500)
            .json({ error: error.message ? error.message : error });
    }
};

//delete gateway by ID
const deleteGateway = async (req, res) => {
    await get(req, res, "delete");
};

async function get(req, res, type) {
    const {
        params: { gatewayId },
    } = req;
    try {
        if (!gatewayId) {
            throw {
                message: 'Gateway id not provided',
            };
        }
        const gate = type === "get" ? await getGatewayService(gatewayId) : await deleteGatewayService(gatewayId)
        res.status(200).json({
            success: true,
            data: gate
        });
    } catch (error) {
        res.status(500)
            .json({ error: error.message ? error.message : error });
    }
}


module.exports = { getAll, getGateway, newGateway, deleteGateway };