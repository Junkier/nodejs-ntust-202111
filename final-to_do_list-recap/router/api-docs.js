const express = require("express");
const swaggerUi         = require('swagger-ui-express');
const YAML              = require('yamljs');
const swaggerDocument   = YAML.load('./config/api-doc.yaml');

var router = express.Router();

let options = {
    customCss: '.swagger-ui .wrapper { width: 80% }'
};


router.use(
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument,options)
);


module.exports = router;
