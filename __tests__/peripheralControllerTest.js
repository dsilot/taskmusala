const { getAllP, getPeripheral, newPeripheral, deletePeripheral } = require('../src/controllers/peripheralController');


describe("GetAll Peripherals of gateway", () => {
    test("Return list of all peripheral of gateway status 200", async () => {

        const output = {
            "success": true,
            "data": [
                {
                    "id": "aceaa425-7769-4ad7-af6b-422d25f23be1",
                    "uid": "1234567890",
                    "vendor": "Cisco",
                    "create_date": "11/28/2022, 2:21:56 PM",
                    "status": "offline"
                },
                {
                    "id": "aceaa425-7769-4ad7-af6b-422d25f23be2",
                    "uid": "1234567891",
                    "vendor": "TP-LINk",
                    "create_date": "11/28/2022, 3:21:56 PM",
                    "status": "online"
                }
            ]
        };

        const req = {
            params: { gatewayId: '60b40630-713c-11ec-8cff-7f82f42f57ce'}
        };
        let resp_status = 0;
        let response = {};
        const res = {
            json(body) {
                response = body;
            },
            status(status) {
                resp_status = status;
                return this;
            }
        };
        await getAllP(req, res);
        expect(resp_status).toBe(200);
        expect(response).toEqual(output);
    });
});

describe("Get Peripheral", () => {
    test("Return a peripheral with status 200", async () => {
        const output = {
            "success": true,
            "data": {
                "id": "aceaa425-7769-4ad7-af6b-422d25f23be1",
                "uid": "1234567890",
                "vendor": "Cisco",
                "create_date": "11/28/2022, 2:21:56 PM",
                "status": "offline"
            }
        };

        const req = {
            params: { gatewayId: '60b40630-713c-11ec-8cff-7f82f42f57ce', peripheralId: 'aceaa425-7769-4ad7-af6b-422d25f23be1' }
        };
        let resp_status = 0;
        let response = {};
        const res = {
            json(body) {
                response = body;
            },
            status(status) {
                resp_status = status;
                return this;
            }
        };
        await getPeripheral(req, res)
        expect(resp_status).toBe(200);
        expect(response).toEqual(output);
    });

    test("Return a error with status 500", async () => {
        const req = {
            params: { gatewayId: '60b40630-713c-11ec-8cff-7f82f42f57ce', peripheralId: 'aceaa425-7769-4ad7-af6b-522d25f23be2' }
        };
        let resp_status = 0;
        let response = {};
        const res = {
            json(body) {
                response = body;
            },
            status(status) {
                resp_status = status;
                return this;
            }
        };
        await getPeripheral(req, res)
        expect(resp_status).toBe(500);
        expect(response.error).toMatch(/^Fail to get Peripheral:/g);
    });
});

describe("Create a Peripheral", () => {
    test("New Peripheral with status 200", async () => {
        const output = {
            "success": true,
            "data": {
                "uid": "4567899876",
                "vendor": "Cisco",
                "status": "online"
            }
        };
        const req = {
            body: {
                "gateid": "60b40630-713c-11ec-8cff-7f82f42f57cf", "uid": "4567899876", "vendor": "Cisco", "state": "online"
            }
        };
        let resp_status = 0;
        let response = {};
        const res = {
            json(body) {
                response = body;
            },
            status(status) {
                resp_status = status;
                return this;
            }
        };
        await newPeripheral(req, res);
        expect(resp_status).toBe(201);
        expect(response.success).toBeTruthy();
        expect(response.data.id).toMatch(/[a-zA-Z0-9-]+/g);
        expect(response.data.uid).toEqual(output.data.uid);
        expect(response.data.vendor).toEqual(output.data.vendor);
        expect(response.data.status).toEqual(output.data.status);
    });

    test("Return error with status 500", async () => {

        const req = {
            body: {
                "gateid": "60b40630-713c-11ec-8cff-7f82f42f57fg", "uid": "4567899876", "vendor": "Cisco", "state": "online"
            }
        };
        let resp_status = 0;
        let response = {};
        const res = {
            json(body) {
                response = body;
            },
            status(status) {
                resp_status = status;
                return this;
            }
        };
        await newPeripheral(req, res);
        expect(resp_status).toBe(500);
        expect(response.error).toMatch(/^Fail to add Peripheral:/g);
    });
});

describe("Delete Peripheral", () => {
    test("Delete a Peripheral with status 200", async () => {
        const output = {
            "success": true,
            "data": {
                "id": "aceaa425-7769-4ad7-af6b-422d25f23be1",
                "uid": "1234567890",
                "vendor": "Cisco",
                "create_date": "11/28/2022, 2:21:56 PM",
                "status": "offline"
            }
        }

        const req = {
            params: { gatewayId: '60b40630-713c-11ec-8cff-7f82f42f57ce', peripheralId: 'aceaa425-7769-4ad7-af6b-422d25f23be1' }
        };
        let resp_status = 0;
        let response = {};
        const res = {
            json(body) {
                response = body;
            },
            status(status) {
                resp_status = status;
                return this;
            }
        };
        await deletePeripheral(req, res)
        expect(resp_status).toBe(200);
        expect(response).toEqual(output);
    });

    test("Return a error with status 500", async () => {
        const req = {
            params: { gatewayId: '60b40630-713c-11ec-8cff-7f82f42f57ce', peripheralId: 'aceaa425-7769-4ad7-af6b-422d25f23be8' }
        };
        let resp_status = 0;
        let response = {};
        const res = {
            json(body) {
                response = body;
            },
            status(status) {
                resp_status = status;
                return this;
            }
        };
        await deletePeripheral(req, res)
        expect(resp_status).toBe(500);
        expect(response.error).toMatch(/^Fail to delete Peripheral:/g);
    });
});