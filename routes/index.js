var express = require('express');
var router = express.Router();
var OpenGISService = require('../services/opengis')

const GisService = new OpenGISService();

router.get('/parks', async (req, res, next) => {
	try{
		const compact = req.query.compact === 'true';
		const filters = [{name:req.query.name},{type:req.query.type}];
		const parks = await GisService.getAllParks(compact);
  		res.json(parks);
	}catch(err){
		res.json({
			error: err.message
		})
	}
});

router.get('/park/:id', async (req, res, next) => {
	try{
		let parks = await GisService.getParkById(req.params.id)
  		res.json(parks);
	}catch(err){
		console.log(err);
		res.json({})
	}
});

module.exports = router;
