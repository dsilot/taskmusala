const express = require('express');
const { body } = require('express-validator');

const { getAll, getGateway, newGateway, deleteGateway } = require('../controllers/gatewayController');

const gate_routes = express.Router();

// new gateway validation rules
const rules = () => {
    return [
        body('serial').notEmpty().trim().escape().withMessage("Serial is empty"),
        body('serial').isString().withMessage("Provide a valid serial"),
        body('name').notEmpty().trim().escape().withMessage("Name is empty"),
        body('name').isString().withMessage("Provide a valid name"),
        body('ipadress').notEmpty().trim().escape().withMessage("Ipadress is empty"),
        body('ipadress').isIP(4).withMessage("Provide valid IPV4 address")
    ];
};

gate_routes.get("/", getAll);

gate_routes.get("/:gatewayId", getGateway);

gate_routes.post("/", rules(), newGateway);

gate_routes.delete("/:gatewayId", deleteGateway);

module.exports = gate_routes;