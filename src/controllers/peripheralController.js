const { validationResult } = require('express-validator');

const { getAllService, getPeripheralService, newPeripheralService, deletePeripheralService } = require("../services/peripheralService");

//get all peripheral from a gateway
const getAllP = async (req, res) => {
    const {
        params: { gatewayId },
    } = req;
    try {
        if (!gatewayId) {
            throw {
                message: 'Gateway id not provided',
            };
        }
        const alls = await getAllService(gatewayId);
        res.status(200).json({
            success: true,
            data: alls
        });
    } catch (error) {
        res.status(500)
            .json({ error: error.message ? error.message : error });
    }
};

//get a peripheral from a gateway
const getPeripheral = async (req, res) => {
    await get(req, res, "get");
};

// add mew peripheral to gateway
const newPeripheral = async (req, res) => {
    const { gateid, uid, vendor, state } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const perip = await newPeripheralService(gateid, uid, vendor, state);
        res.status(201).json({
            success: true,
            data: perip
        });
    } catch (error) {
        res.status(500)
            .json({ error: error.message ? error.message : error });
    }
};

// delete peripheral from gateway
const deletePeripheral = async (req, res) => {
    await get(req, res, "delete");
};

async function get(req, res, type) {
    const {
        params: { gatewayId, peripheralId },
    } = req;
    try {
        if (!gatewayId) {
            throw {
                message: 'Gateway id not provided',
            };
        }
        if (!peripheralId) {
            throw {
                message: 'Peripheral id not provided',
            };
        }
        const perip = type === "get" ? await getPeripheralService(gatewayId, peripheralId) : await deletePeripheralService(gatewayId, peripheralId)
        res.status(200).json({
            success: true,
            data: perip
        });
    } catch (error) {
        res.status(500)
            .json({ error: error.message ? error.message : error });
    }
}

module.exports = { getAllP, getPeripheral, newPeripheral, deletePeripheral };