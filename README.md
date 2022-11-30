# 🚀 Managing gateways for Musala REST API!

*Requirements*
- NodeJS
- Postman (optional)

*Installation quide*
- Clone this repo
```
git clone https://github.com/dsilot/taskmusala.git
```
*Running develop environment to fast view*
```
npm install
```
```
npm run dev
```
*Running unit test*
```
npm run test
```
*Run API*
- Build that:
```
npm run build
```
or
```
yarn build
```
- Navigate to created folder "dist"
- Finally run in terminal:
```
node main.js
```
*Use API*
- Import colecction "gateway-musala.postman_collection.json" in POSTMAN test Software to use the API endpoints. 
- Use another http client if prefer tu use this.

*API endpoints and descriptions*
- GET /api/v1/gateway  Get a lists of all gateways
- GET /api/v1/gateway/:gatewayId Get a gateway for it ID
- POST /api/v1/gateway Create new gateway. Body params in json (serial, name, ipadress)
- DELETE /api/v1/gateway/:gatewayId Delete a gateway for it ID
- GET /api/v1/peripheral  Get a lists of all peripherals
- GET /api/v1/peripheral/:peripheralId Get a peripheral for it ID
- POST /api/v1/peripheral Create new peripheral. Body params in json (gatewayId, uid, vendor, state)
- DELETE /api/v1/peripheral/:peripheralId Delete a peripheral for it ID
