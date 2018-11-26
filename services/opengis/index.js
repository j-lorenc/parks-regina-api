const {SERVICES} = require('../../config')
const Park = require("../../models/park")
const Service = require("../")
const cache = require('memory-cache');

class OpenGISService extends Service{
	
	constructor(params){
		super(SERVICES.OPENGIS, params);
		this.cacheKey = SERVICES.OPENGIS.CACHE_KEY;
	}
	
	async retrieveParks(){
		if(!cache.get(this.cacheKey)){
			const res = await fetch(SERVICES.OPENGIS.API_STRING)
			const data = await res.json();  
			const parks = data.features;
			cache.put(this.cacheKey, parks);
			return parks;
		}

		return await cache.get(this.cacheKey);
	}
	
	async getAllParks(){
		const rawParks = await this.retrieveParks();
		const parks = this.constructor.santizeParkData(rawParks, this.compact);
		const filteredParks = this.applyFilters(parks);
		return filteredParks;
	}
	
	async getParkById(id){
		const parks = await this.getAllParks();
		const filteredPark = parks.find((park)=>{
			return park.id === Number(id);
		})
		return filteredPark;
	}
	
	static uniquifyParks(rawParks){
		return rawParks.reduce((santizedParks, rawPark)=> {
			const park = santizedParks[rawPark.attributes.OBJECTID] || new Park(this.compact);
			park.parse(rawPark);
			santizedParks[rawPark.attributes.OBJECTID] = park;
			return santizedParks;
		}, {});
	}

	static transformToDisplayPark(uniqueParks, compact){
		const displayParks = Object.keys(uniqueParks).map((parkId)=> {
			if(compact){
				const returnObj = {
					id: uniqueParks[parkId]["id"]
				};
				for(const key of SERVICES.OPENGIS.COMPACT_VIEW_FIELDS){
					returnObj[key] = uniqueParks[parkId][key]
				}
				return returnObj;
			}else{
				return uniqueParks[parkId]
			}
		});
		return displayParks;
	}

	static santizeParkData(rawParks, compact){
		const uniqueParks = OpenGISService.uniquifyParks(rawParks);
		const displayParks = OpenGISService.transformToDisplayPark(uniqueParks, compact);

		return displayParks;
	}
}

module.exports = OpenGISService;
