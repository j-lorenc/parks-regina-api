const CONFIG = {

    SERVICES: {
		OPENGIS: {
			API_STRING: "https://opengis.regina.ca/arcgis/rest/services/CGISViewer/Parks/MapServer/0/query?f=json&where=1%3D1&outFields=*&outSR=3857",
			CACHE_KEY: 'parks',
			FILTERS: ["name", "type", "address", "amenities"],
			COMPACT_VIEW_FIELDS: ["name", "type", "address", "amenities"],
            SOURCE_PROJECTION: `+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0
                                    +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs`,
            LAT_LNG_PROJECTION: `+proj=longlat +datum=WGS84 +no_defs`
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
