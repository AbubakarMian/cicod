const auth_url = 'https://api.cicodsaasstaging.com';
const base_url = 'https://com.cicodsaasstaging.com/com/api';
const tenantId = 'sandbox';
export const Constants = {
  base_url: base_url,
  
  autherizationKey:`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldmFuc0BzaGFya2xhc2Vycy5jb20iLCJleHAiOjE1ODg2NjgzMTYsImlzcyI6ImNpY29kc3NvIiwicm9sZXMiOiJTVVBFUkFETUlOIiwiZmlyc3RuYW1lIjoiTW9uaWNhIFJpbyIsImxhc3RuYW1lIjoiLSIsImVtYWlsIjoiZXZhbnNAc2hhcmtsYXNlcnMuY29tIiwidG9rZW4iOiJqa0Vsb3BpdlFxNlh3NkpTcDR0VEU3bE96b1F1MjIiLCJpZCI6MTE5LCJjdXN0b21lcklkIjoxMjYsInRlbmFudElEIjoiZXZhbnNuaWdlcmlhIn0.9B6ULKtIZqgV_wjtZDyIZk-lfvpdmAziO3uqA6FuTznPRcFMK6UWPC0j_PbtuLxhmQiOwtFbGC75fc6nqpY6lw`,
  login: `${auth_url}/sso/auth/login`,
  products: `${base_url}/products`,
  customerlist: `${base_url}/customers`,
  productslist: `${base_url}/products`,
  orderslist: `${base_url}/orders`,
  productcategorylist: `${base_url}/categories`, //https://com.cicodsaasstaging.com/com/api/categories
  supplierlist:`${base_url}/value-chain/suppliers`,
  stateslist:`${base_url}/states`,
  countrieslist:`${base_url}/countries`,
  lgaslist:`${base_url}/lgas`,
};


