const qs = require("qs");

class Service {
	constructor(SERVICE, params){
		this.compactViewFields = SERVICE.COMPACT_VIEW_FIELDS;
		this.filters = SERVICE.FILTERS;
		this.params = params || {};
		this.compact = params["compact"] === 'true';
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
				return this._shouldApplyFilter(queryStringFilter, unfilteredDataRow)
			}
			return true;
		})
		return filteredData;
	}

	_shouldApplyFilter(filterFromQueryString, unfilteredDataRow){
		const keyToFilterOn = Object.keys(filterFromQueryString)[0];
		const filter = filterFromQueryString[keyToFilterOn]

		if(typeof(filter) === "string" ){
			if(!this._isEqual(unfilteredDataRow[keyToFilterOn], filter)){
				return false;
			}
		}else if(typeof(filterFromQueryString[keyToFilterOn]) === "object"){
			const includesFilterList = filterFromQueryString[keyToFilterOn]["inc"];

			if(includesFilterList){
				if(!this._isIncluded(unfilteredDataRow[keyToFilterOn],includesFilterList)){
					return false;
				}
			}
		}

		return true;
	}

	_isIncluded(listToLookFor = [], listToLookIn){
		for(const listItem of listToLookIn){
			if(!listToLookFor || !listToLookFor.includes(listItem)){
				return false;
			}
		}
		return true;
	}

	_isEqual(a, b){
		if(!b) return false;
		return a == b;
	}
}

module.exports = Service;
