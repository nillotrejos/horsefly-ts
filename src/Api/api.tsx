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

  export const demand = async (location:any,filterBox:any,tagData:any,country:any) => {
    const currency ="pound"
    const locationData = JSON.stringify([location])
    const filter = JSON.stringify(filterBox)
    const tag = JSON.stringify({"or":[{"include":1,"keywords":[{tagData}]}]})
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