import {endpoint} from './env'

const token = "xtempx"
export const getContries = async () => {
    const url = `${endpoint}users/testAccessCountries`;
    const body = new FormData();
    body.append("token", token);
    const res = await fetch(url, {
        method: "POST",
        body,
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
   return res.json()
  }

  export const getCities = async () => {
    const url = `${endpoint}suggestions/testCity`;
    const body = new FormData();
    body.append("token", token);
    body.append("country", 'country');
    body.append("keyword", "keyword");
    const res = await fetch(url, {
        method: "POST",
        body,
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
   return res.json()
  }

  export const demand = async () => {
    const url = `${endpoint}list/search/demand?tags=`;
    const body = new FormData();
    body.append("token", token);
    body.append("tags", "tags");
    body.append("locations", 'locations');
    body.append("currency", "currency");
    body.append("filters", "filters");
    const res = await fetch(url, {
        method: "POST",
        body,
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
   return res.json()
  }

  export const getTags = async () => {
    const url = `${endpoint}suggestions/testKeywordNames?keyword=react`;
    const body = new FormData();
    body.append("token", token);

    const res = await fetch(url, {
        method: "GET",
        body,
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
   return res.json()
  }