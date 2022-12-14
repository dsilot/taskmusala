const express = require('express');
const { body } = require('express-validator');

const { getAllP, getPeripheral, newPeripheral, deletePeripheral } = require('../controllers/peripheralController');

const perip_routes = express.Router();

// new gateway peripheral rules
const rules = () => {
    return [
        body('gateid').notEmpty().trim().escape().withMessage("Gateway iD is empty"),
        body('gateid').isString().withMessage("Provide a valid Gateway iD"),
        body('uid').notEmpty().trim().escape().withMessage("UID is empty"),
        body('uid').isNumeric().withMessage("UID is unique number"),
        body('vendor').notEmpty().trim().escape().withMessage("Vendor is empty"),
        body('vendor').isString().withMessage("Provide a valid vendor"),
        body('state').notEmpty().trim().escape().withMessage("State is empty"),
        body('state').isString().withMessage("Provide valid state")
    ];
};

perip_routes.get("/:gatewayId/", getAllP);

perip_routes.get("/:gatewayId/:peripheralId", getPeripheral);

perip_routes.post("/", rules(), newPeripheral);

perip_routes.delete("/:gatewayId/:peripheralId", deletePeripheral);

module.exports = perip_routes;