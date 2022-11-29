import db from './db.json' assert { type: "json" };
import save from './utils.js'

function getAllGateways() {
    try {
        return db.gateways;
    } catch (error) {
        throw ({ message: error.message ? error.message : error });
    }
}

function getGateway(gateid) {
    try {
        const gate = db.gateways.find((gateway) => gateway.id === gateid);
        if (!gate) {
            throw {
                message: `Can't find gateway with the id '${gateid}'`,
            };
        }
        return gate;
    } catch (error) {
        throw ({ message: error.message ? error.message : error });
    }
}

function addGateway(newGate) {
    try {
        const find = db.gateways.findIndex((gateway) => gateway.serial === newGate.serial) > -1;
        if (find) {
            throw {
                message: `Gateway with the serial '${newGate.serial}' already exists`,
            };
        }
        db.gateways.push(newGate);
        //save(db);
        return newGate;
    } catch (error) {
        throw ({ message: error?.message || error });
    }
}

function deleteGateway(gateid) {
    try {
        const index = db.gateways.findIndex((gateway) => gateway.id === gateid);
        if (index === -1) {
            throw {
                message: `Can't find gateway with the id '${gateid}'`,
            };
        }
        const deleted = db.gateways[index];
        db.gateways.splice(index, 1);
        //save(db);
        return deleted;
    } catch (error) {
        throw ({ message: error.message ? error.message : error });
    }
}

function getAllPeripheralsInGate(gateid) {
    try {
        const index = db.gateways.findIndex((gateway) => gateway.id === gateid);
        if (index === -1) {
            throw {
                message: `Can't find gateway with the id '${gateid}'`,
            };
        }
        return db.gateways[index].peripherals;
    } catch (error) {
        throw ({ message: error?.message || error });
    }
}

function getPeripheral(gateid, periid) {
    try {
        const index = db.gateways.findIndex((gateway) => gateway.id === gateid);
        if (index === -1) {
            throw {
                message: `Can't find gateway with the id '${gateid}'`,
            };
        }
        const indexp = db.gateways[index].peripherals.findIndex((peri) => peri.id === periid);
        if (indexp === -1) {
            throw {
                message: `Can't find peripheral with the id '${periid}'`,
            };
        }
        return db.gateways[index].peripherals[indexp];
    } catch (error) {
        throw ({ message: error?.message || error });
    }
}

function addPeripheraltoGate(gateid, newperipheral) {
    try {
        const index = db.gateways.findIndex((gateway) => gateway.id === gateid);
        if (index === -1) {
            throw {
                message: `Can't find gateway with the id '${gateid}'`,
            };
        }
        db.gateways[index].peripherals.push(newperipheral);
        //save(db);
        return newperipheral;
    } catch (error) {
        throw ({ message: error?.message || error });
    }
}

function deletePeripheral(gateid, periid) {
    try {
        const index = db.gateways.findIndex((gateway) => gateway.id === gateid);
        if (index === -1) {
            throw {
                message: `Can't find gateway with the id '${gateid}'`,
            };
        }
        const indexp = db.gateways[index].peripherals.findIndex((peri) => peri.id === periid);
        if (indexp === -1) {
            throw {
                message: `Can't find peripheral with the id '${periid}'`,
            };
        }
        const deleted = db.gateways[index].peripherals[indexp];
        db.gateways[index].peripherals.splice(indexp, 1)
        //save(db);
        return deleted;
    } catch (error) {
        throw ({ message: error?.message || error });
    }
}


export {
    getAllGateways,
    getGateway,
    addGateway,
    deleteGateway,
    getAllPeripheralsInGate,
    getPeripheral,
    addPeripheraltoGate,
    deletePeripheral,
};