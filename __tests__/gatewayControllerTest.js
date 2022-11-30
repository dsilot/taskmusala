const { getAll, getGateway, newGateway, deleteGateway } = require ('../src/controllers/gatewayController');

describe("getAll function", () => {
    test("Return list of all gateways status 200", async () => {

        const output = {
            "success": true,
            "data": [
                {
                    "id": "60b40630-713c-11ec-8cff-7f82f42f57ce",
                    "serial": "yWuImr95L9rj0y74itnSC",
                    "name": "gate1",
                    "ipv4": "192.168.30.2",
                    "peripherals": [
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
                },
                {
                    "id": "60b40630-713c-11ec-8cff-7f82f42f57cf",
                    "serial": "yWuImr95L9rj0y74itnSD",
                    "name": "gate2",
                    "ipv4": "192.168.30.3",
                    "peripherals": [
                        {
                            "id": "aceaa425-7769-4ad7-af6b-422d25f23be3",
                            "uid": "1234567892",
                            "vendor": "Dell",
                            "create_date": "11/28/2022, 4:21:56 PM",
                            "status": "offline"
                        },
                        {
                            "id": "aceaa425-7769-4ad7-af6b-422d25f23be4",
                            "uid": "1234567893",
                            "vendor": "HP",
                            "create_date": "11/28/2022, 5:21:56 PM",
                            "status": "online"
                        }
                    ]
                }
            ]
        }

        const req = {
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
        await getAll(req, res);
        expect(resp_status).toBe(200);
        expect(response).toEqual(output);
    });
});

describe("Get Gateway", () => {
    test("Return a gateway with status 200", async () => {
        const output = {
            "success": true,
            "data": {
                "id": "60b40630-713c-11ec-8cff-7f82f42f57ce",
                "serial": "yWuImr95L9rj0y74itnSC",
                "name": "gate1",
                "ipv4": "192.168.30.2",
                "peripherals": [
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
            }
        };

        const req = {
            params: { gatewayId: '60b40630-713c-11ec-8cff-7f82f42f57ce' }
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
        await getGateway(req, res)
        expect(resp_status).toBe(200);
        expect(response).toEqual(output);
    });

    test("Return a error with status 500", async () => {
        const req = {
            params: { gatewayId: '70b40630-713c-11ec-8cff-7f82f42f57ce' }
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
        await getGateway(req, res)
        expect(resp_status).toBe(500);
        expect(response.error).toMatch(/^Fail to get gateway:/g);
    });
});

describe("Create a gateway", () => {
    test("New a gateway with status 200", async () => {
        const output = {
            "success": true,
            "data": {
                "serial": "yWuImr95L9rj0y74itnSE",
                "name": "Samsung",
                "ipv4": "192.168.30.4",
                "peripherals": []
            }
        };
        const req = {
            body: { "serial": "yWuImr95L9rj0y74itnSE", "name": "Samsung", "ipadress": "192.168.30.4" }
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
        await newGateway(req, res);
        expect(resp_status).toBe(201);
        expect(response.success).toBeTruthy();
        expect(response.data.id).toMatch(/[a-zA-Z0-9-]+/g);
        expect(response.data.serial).toEqual(output.data.serial);
        expect(response.data.name).toEqual(output.data.name);
        expect(response.data.ipv4).toEqual(output.data.ipv4);
    });

    test("Return error with status 500", async () => {

        const req = {
            body: { "serial": "yWuImr95L9rj0y74itnSC", "name": "Samsung", "ipadress": "192.168.30.4" }
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
        await newGateway(req, res);
        expect(resp_status).toBe(500);
        expect(response.error).toMatch(/^Fail to create gateway:/g);
    });
});

describe("Delete Gateway", () => {
    test("Delete a gateway with status 200", async () => {
        const output = {
            "success": true,
            "data": {
                "id": "60b40630-713c-11ec-8cff-7f82f42f57cf",
                "serial": "yWuImr95L9rj0y74itnSD",
                "name": "gate2",
                "ipv4": "192.168.30.3",
                "peripherals": [
                    {
                        "id": "aceaa425-7769-4ad7-af6b-422d25f23be3",
                        "uid": "1234567892",
                        "vendor": "Dell",
                        "create_date": "11/28/2022, 4:21:56 PM",
                        "status": "offline"
                    },
                    {
                        "id": "aceaa425-7769-4ad7-af6b-422d25f23be4",
                        "uid": "1234567893",
                        "vendor": "HP",
                        "create_date": "11/28/2022, 5:21:56 PM",
                        "status": "online"
                    }
                ]
            }
        };

        const req = {
            params: { gatewayId: '60b40630-713c-11ec-8cff-7f82f42f57cf' }
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
        await deleteGateway(req, res)
        expect(resp_status).toBe(200);
        expect(response).toEqual(output);
    });

    test("Return a error with status 500", async () => {
        const req = {
            params: { gatewayId: '70b40630-713c-11ec-8cff-7f82f42f57ce' }
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
        await deleteGateway(req, res)
        expect(resp_status).toBe(500);
        expect(response.error).toMatch(/^Fail to delete gateway:/g);
    });
});