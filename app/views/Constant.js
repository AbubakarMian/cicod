const auth_url = 'https://api.cicodsaasstaging.com';
const base_url = 'https://com.cicodsaasstaging.com/com/api';

const tenantId = 'sandbox';
export const Constants = {
  base_url: base_url,
  UnauthorizedErrorMsg : 'Same User can only login in single device at a time',
  autherizationKey: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldmFuc0BzaGFya2xhc2Vycy5jb20iLCJleHAiOjE1ODg2NjgzMTYsImlzcyI6ImNpY29kc3NvIiwicm9sZXMiOiJTVVBFUkFETUlOIiwiZmlyc3RuYW1lIjoiTW9uaWNhIFJpbyIsImxhc3RuYW1lIjoiLSIsImVtYWlsIjoiZXZhbnNAc2hhcmtsYXNlcnMuY29tIiwidG9rZW4iOiJqa0Vsb3BpdlFxNlh3NkpTcDR0VEU3bE96b1F1MjIiLCJpZCI6MTE5LCJjdXN0b21lcklkIjoxMjYsInRlbmFudElEIjoiZXZhbnNuaWdlcmlhIn0.9B6ULKtIZqgV_wjtZDyIZk-lfvpdmAziO3uqA6FuTznPRcFMK6UWPC0j_PbtuLxhmQiOwtFbGC75fc6nqpY6lw`,
  login: `${auth_url}/sso/auth/login`,
  changePassword: `${auth_url}/sso/user/password_update`,
  products: `${base_url}/products`,
  update_product_category: `${base_url}/categories`,
  customerlist: `${base_url}/customers`,
  customerdelivery: `${base_url}/customer-delivery-address`,
  productslist: `${base_url}/products`,
  orderslist: `${base_url}/orders`,
  sellerOrderHistory: `${base_url}/seller-order-history`,
  sellerProductList: `${base_url}/value-chain/seller-products`,
  productcategorylist: `${base_url}/categories`,
  supplierlist: `${base_url}/value-chain/suppliers`,
  buyerlist: `${base_url}/value-chain/buyers`,
  stateslist: `${base_url}/states`,
  countrieslist: `${base_url}/countries`,
  lgaslist: `${base_url}/lgas`,
  dashboard: `${base_url}/dashboard`,
  marchantDetail: `${auth_url}/sso/auth/merchant_details`,
  connectsentrequest: `${base_url}/value-chain/sent-requests`,
  connectreceivedrequest: `${base_url}/value-chain/recieved-requests`,
  searchMerchant: `${base_url}/value-chain/search-merchant`,
  connectRequest: `${base_url}/value-chain/request`,
  suspendBuyer: `${base_url}/value-chain/suspend-buyer`,
  unsuspendBuyer: `${base_url}/value-chain/unsuspend-buyer`,
  updateBuyerProduct: `${base_url}/value-chain/update-buyer-products`,
  decline_request: `${base_url}/value-chain/reject`,
  ussd_codes: `${base_url}/ussd-codes`,
  reset_password: `${auth_url}/sso/auth/forgot_password`,
  currency: `${base_url}/currency`,
  
};


