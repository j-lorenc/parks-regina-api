const CONFIG = require('../../config')
const Park = require("../../models/Park")

class OpenGISService {
	
	constructor(){
		
	}
	
	async retrieveParks(){
		const res = await fetch(CONFIG.APIS.PARKS)
		const data = await res.json();  
		const parks = data.features;
		return data.features;
	}
	
	async getAllParks(compact){
		const rawParks = await this.retrieveParks();
		const parks = this.constructor.santizeParkData(rawParks, compact);
		return parks;
	}
	
	async getParkById(id){
		const parks = await this.getAllParks();
		const filteredPark = parks.filter((park)=>{
			return park.id === Number(id);
		})
		return filteredPark;
	}
	
	async getParkByName(name){
		const parks = await this.getAllParks();
		const filteredPark = parks.filter((park)=>{
			return park.name.includes(name);
		})
		return filteredPark;
	}
	
	static santizeParkData(rawParks, isCompact){
		const uniqueParks = rawParks.reduce((santizedParks, rawPark)=> {
			const park = santizedParks[rawPark.attributes.OBJECTID] || new Park(isCompact);
			park.parse(rawPark);
			santizedParks[rawPark.attributes.OBJECTID] = park;
			return santizedParks;
		}, {});

		const displayParks = Object.keys(uniqueParks).map((parkId)=> {
			const {compact, ...displayPark} = uniqueParks[parkId]
			return displayPark;		
		});
		return displayParks;
	}
}

module.exports = OpenGISService;