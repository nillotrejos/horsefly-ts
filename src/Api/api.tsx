import {endpoint} from './env'

const token = "xtempx"
export const getContries = async () => {
    const url = `${endpoint}users/testAccessCountries`;
    const body = new FormData();
    body.append("token", token);
    const res = await fetch(url, {
        method: "POST",
        body,
       
      });
   return res.json()
  }

  export const getCities = async (country: any,location: any) => {
    
    console.log(country,location,'location')
    const url = `${endpoint}suggestions/testCity`;
    const body = new FormData();
    body.append("token", token);
    body.append("country", country);
    body.append("keyword", location);
    const res = await fetch(url, {
        method: "POST",
        body,
      });
   return res.json()
  }

  export const suggestionTag = async (allTags: any) => {
    const tags = JSON.stringify(allTags)
    const url = `${endpoint}suggestions/testKeywordSuggestions`;
    const body = new FormData();
    body.append("token", token);
    body.append("tags", tags);
  
    const res = await fetch(url, {
        method: "POST",
        body,
      });
   return res.json()
  }

  export const demand = async (location:any,filterBox:any,tagData:any,country:any,currency:any) => {

   const locationData = JSON.stringify(location)
    const filter = JSON.stringify(filterBox || {"male":1,"female":1,"yoe0":1,"yoe1":1,"yoe2":1})
    const tag = JSON.stringify(  {"or":[{"include":1,"keywords":tagData}]})
    const url = `${endpoint}list/search/demand`;
    const body = new FormData();
    body.append("token", token);
    body.append("tags", tag);
    body.append("locations", locationData);
    body.append("currency", currency);
    body.append("filters", filter);
    const res = await fetch(url, {
        method: "POST",
        body,
      });
   return res.json()
  }

  export const getTags = async (groupTitle: any) => {
    const url = `${endpoint}suggestions/testKeywordNames?keyword=${groupTitle}`;
    const body = new FormData();
    body.append("token", token);
    const res = await fetch(url, {
      method: 'get',
  })
   return res.json()
  }