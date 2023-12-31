const logger = require('pino')()
const fs = require('fs');

function getFlightOffers(data){
    const flights = [];

    let currentFlight = {};
    index = 0;
    for (let index = 0; index < data.length;) {    
      if (data[index + 1].includes('€')) {
        currentFlight = {
          "outbound flight": '(PMI-OPO) ' + data[index],
          "return flight": null,
          "price": data[index + 1]
        };
        index += 2;
      } else {
        currentFlight = {
          "outbound flight": '(PMI-OPO) ' + data[index],
          "return flight": '(OPO-PMI) ' + data[index + 1],
          "price": data[index + 2]
        };
        index += 3;
      }
    
      flights.push(currentFlight);
    }

    return flights;
};

function writeDBFile(data){
    const jsonData = JSON.stringify(data, null, 2); // Convert the data to formatted JSON

    fs.writeFile('./db/flightOffers.json', jsonData, 'utf8', (err) => {
      if (err) {
        logger.error('Error writing JSON file:', err);
      } else {
        logger.info('JSON file with flight data has been created successfully.');
      }
    });
};


module.exports = {
    getFlightOffers,
    writeDBFile
};