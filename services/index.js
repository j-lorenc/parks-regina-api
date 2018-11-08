const qs = require("qs");

class Service {
	constructor(SERVICE, params){
		this.compactViewFields = SERVICE.COMPACT_VIEW_FIELDS;
		this.filters = SERVICE.FILTERS;
		this.params = params || {};
		this.compact = params["compact"] === true;
	}
	
	get queryStringFilters(){
		let paramsFilters = Object.keys(this.params).filter((filter)=>{
			return this.filters.includes(filter);
		}).map((param)=>{
			const returnObj = {};
			returnObj[param] = this.params[param];
			return returnObj;	
		});
		
		return paramsFilters;
	}
	
	applyFilters(unfilteredDataList){
		
		const queryStringFilters = this.queryStringFilters;
		
		const filteredData  = unfilteredDataList.filter((unfilteredDataRow)=>{
			for(const queryStringFilter of queryStringFilters){
				const queryStringFilterKey = Object.keys(queryStringFilter)[0];
				
				if(typeof(queryStringFilter[queryStringFilterKey]) === "string" ){
					if(unfilteredDataRow[queryStringFilterKey] !== queryStringFilter[queryStringFilterKey]){
						return false;
					}
				}else if(typeof(queryStringFilter[queryStringFilterKey]) === "object"){
					const isIncludesFilter = queryStringFilter[queryStringFilterKey]["inc"];
					
					if(isIncludesFilter){
						for(const listItem of isIncludesFilter){
							if(!unfilteredDataRow[queryStringFilterKey] || !unfilteredDataRow[queryStringFilterKey].includes(listItem)){
								return false;
							}
						}	
					}
					
				}
				
				
			}
			return true;
		})
		return filteredData;
	}
}

module.exports = Service;