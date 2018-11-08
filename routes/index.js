var express = require('express');
var router = express.Router();
var OpenGISService = require('../services/opengis')



router.get('/parks', async (req, res, next) => {
	try{
		const GisService = new OpenGISService(req.query);
		const parks = await GisService.getAllParks();
  		res.json(parks);
	}catch(err){
		res.json({
			error: err.message
		})
	}
});

router.get('/park/:id', async (req, res, next) => {
	try{
		const GisService = new OpenGISService();
		let parks = await GisService.getParkById(req.params.id)
  		res.json(parks);
	}catch(err){
		console.log(err);
		res.json({})
	}
});

module.exports = router;
