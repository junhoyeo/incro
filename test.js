const ingang = require('./ingang');
const secrets = require('./secrets.json');

secrets.forEach((secret) => {
  ingang.apply(secret, 2);  
});
