const CONFIG = {
	
	SERVICES: {
		OPENGIS: {
			API_STRING: "https://opengis.regina.ca/arcgis/rest/services/CGISViewer/Parks/MapServer/0/query?f=json&where=1%3D1&outFields=*&outSR=3857",
			CACHE_KEY: 'parks',
			FILTERS: ["name", "type", "address", "amenities"],
			COMPACT_VIEW_FIELDS: ["name", "type", "address", "amenities"]
		}
	},
	
	PARK_DATA: {
		AMENITIES: [
			"ARENA",
			"ATHLETICFIELD",
			"BASEBALL",
			"BASKETBALL",
			"CURLINGCLUB",
			"INDOORPOOL",
			"INDOORTENNIS",
			"PLAYGROUND",
			"OFFLEASHDOG",
			"OUTDOORFITNESSEQP",
			"OUTDOORTENNIS",
			"RECREATIONFACILITY",
			"SKATEBOARD",
			"SKATINGRINK",
			"SPRAYPAD",
			"SWIMMING",
			"WASHROOM",
			"WATERFEATURE"
		]
	},
	
	STRING: {
		CASE: {
			NAME_TRANSFORMS: ["Mc", "mc"],
			NAME_REPLACEMENTS: [{
				RAW_VALUE:"O_Neill",
				REPLACEMENT_VALUE:"O'Neill"
			},{
				RAW_VALUE:"Er ",
				REPLACEMENT_VALUE:"Environmental Reserve "
			},{
				RAW_VALUE:"Macneill",
				REPLACEMENT_VALUE:"MacNeill"
			}]
		}
	}
}


module.exports = CONFIG