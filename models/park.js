const CONFIG = require('../config')
const Case = require('case');
const {NameCase} = require('../utilities/StringUtils')
const proj4 = require('proj4');
const geolib = require('geolib');


class Park{
	constructor(compact){
		this.id = 0,
		this.name='';
		this.type = '';
		this.address = '';
		this.compact = compact;
	}
	
	static determineAmenities(attributes){
		const amenities = CONFIG.PARK_DATA.AMENITIES;
		return amenities.filter((amenity)=>{
			return attributes[amenity] === "Yes"
		});
	}
	
	set area(area){
		const geometry = {...this.geometry};
		geometry.shape = {...geometry.shape};
		geometry.shape.area = area;
		
		this.geometry = geometry;
	}
	
	set length(length){
		const geometry = {...this.geometry};
		geometry.shape = {...geometry.shape};
		geometry.shape.length = length;
		
		this.geometry = geometry;
	}
	
	set coords(coords){
		const geometry = {...this.geometry};
        geometry.shape = {...geometry.shape};
		geometry.coords = coords.map((coord)=>{
            const latLng = proj4(CONFIG.SERVICES.OPENGIS.SOURCE_PROJECTION, CONFIG.SERVICES.OPENGIS.LAT_LNG_PROJECTION, coord);
			return {
				latitude:latLng[1],
				longitude:latLng[0]
			}
		});

        geometry.shape.center = geolib.getCenterOfBounds(geometry.coords);
		
		this.geometry = geometry;
	}
	
	parse(park){

		const amenities = this.constructor.determineAmenities(park.attributes);
		//console.log("amentites", amenities)
		
		const {
			OBJECTID, 
			NAME, 
			TYPE, 
			ADDRESS, 
			"SHAPE.AREA" : AREA, 
			"SHAPE.LEN" : LENGTH
		} = park.attributes;
		
		const {
			rings: COORDS
		} = park.geometry;
		
		
		this.id = OBJECTID;
		this.name = Case.name(NAME);
		this.type = Case.title(TYPE);
		this.address = Case.name(ADDRESS);
		
		if(amenities.length > 0) {
		   this.amenities = amenities; 
	   	}
		
		this.area = AREA;
		this.length = LENGTH;
		this.coords = COORDS[0];
		
	}
	
	
}

module.exports = Park;
