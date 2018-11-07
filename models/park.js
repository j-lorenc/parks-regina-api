const CONFIG = require('../config')
const Case = require('case');
const {NameCase} = require('../utilities/StringUtils')

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
		geometry.coords = coords.map((coord)=>{
			return {
				latitude:coord[0],
				longitude:coord[1]
			}
		})
		
		this.geometry = geometry;
	}
	
	parse(park){
		const amenities = this.constructor.determineAmenities(park);
		
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
		
		if(this.compact!==true){
			this.area = AREA;
			this.length = LENGTH;
			this.coords = COORDS[0];
		}
	}
	
	
}

module.exports = Park;
