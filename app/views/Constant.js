const auth_url = 'https://api.cicodsaasstaging.com';
const base_url = 'https://com.cicodsaasstaging.com/com/api';
const webshop_url = 'cicodsaasstaging.com/webshop';
const crm_url = 'https://api.cicodsaasstaging.com/crm';
const sass_url = 'https://www.cicodsaasstaging.com';
const tenantId = 'sandbox';
export const Constants = {
  sass_url,
  webshop_url,
  renewalLink: 'cicodsaasstaging.com/admin/merchant/billing',
  base_url: base_url,
  UnauthorizedErrorMsg: 'Same User can only login in single device at a time',
  autherizationKey: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJldmFuc0BzaGFya2xhc2Vycy5jb20iLCJleHAiOjE1ODg2NjgzMTYsImlzcyI6ImNpY29kc3NvIiwicm9sZXMiOiJTVVBFUkFETUlOIiwiZmlyc3RuYW1lIjoiTW9uaWNhIFJpbyIsImxhc3RuYW1lIjoiLSIsImVtYWlsIjoiZXZhbnNAc2hhcmtsYXNlcnMuY29tIiwidG9rZW4iOiJqa0Vsb3BpdlFxNlh3NkpTcDR0VEU3bE96b1F1MjIiLCJpZCI6MTE5LCJjdXN0b21lcklkIjoxMjYsInRlbmFudElEIjoiZXZhbnNuaWdlcmlhIn0.9B6ULKtIZqgV_wjtZDyIZk-lfvpdmAziO3uqA6FuTznPRcFMK6UWPC0j_PbtuLxhmQiOwtFbGC75fc6nqpY6lw`,
  login: `${auth_url}/sso/auth/login`,
  getSectors: `${crm_url}/integration/v2/fetchSectors`,
  changePassword: `${auth_url}/sso/user/password_update`,
  getMerchants: `${auth_url}/sso/user/network/merchantlist`,
  unReadNetwork: `${auth_url}/sso/user/network/count/unread`,
  validatedUser: `${auth_url}/sso/user/validateUser/com`,
  products: `${base_url}/products`,
  update_product_category: `${base_url}/categories`,
  customerlist: `${base_url}/customers`,
  customerdelivery: `${base_url}/customer-delivery-address`,
  productslist: `${base_url}/products`,
  quickInvoice: `${base_url}/qr-invoices`,
  orderslist: `${base_url}/orders`,
  sellerOrderHistory: `${base_url}/value-chain/seller-order-history`,
  viewSellerOrder: `${base_url}/value-chain/view-seller-order`,
  sellerProductList: `${base_url}/value-chain/seller-products`,
  sellerProductCategoryList: `${base_url}/value-chain/seller-product-categories`,
  productcategorylist: `${base_url}/categories`,
  supplierlist: `${base_url}/value-chain/suppliers`,
  buyerlist: `${base_url}/value-chain/buyers`,
  viewBuyer: `${base_url}/value-chain/view-buyer`,
  viewSuplier: `${base_url}/value-chain/view-supplier`,
  stateslist: `${base_url}/states`,
  countrieslist: `${base_url}/countries`,
  deliveryCountriesList: `${base_url}/delivery-countries`,
  deliveryStateList: `${base_url}/delivery-states`,
  deliveryLgaList: `${base_url}/delivery-lgas`,
  deliveryCost: `${base_url}/delivery-cost`,
  lgaslist: `${base_url}/lgas`,
  dashboard: `${base_url}/dashboard`,
  marchantDetail: `${auth_url}/sso/auth/merchant_details`,
  connectsentrequest: `${base_url}/value-chain/sent-requests?sort=-id`,
  connectreceivedrequest: `${base_url}/value-chain/recieved-requests?sort=-id`,
  searchMerchant: `${base_url}/value-chain/search-merchant`,
  connectRequest: `${base_url}/value-chain/request`,
  suspendBuyer: `${base_url}/value-chain/suspend-buyer`,
  unsuspendBuyer: `${base_url}/value-chain/unsuspend-buyer`,
  updateBuyerProduct: `${base_url}/value-chain/update-buyer-products`,
  decline_request: `${base_url}/value-chain/reject-request`,
  approve_request: `${base_url}/value-chain/approve-request`,
  approved_buyer_products: `${base_url}/value-chain/approved-buyer-products`,
  seller_customer_details: `${base_url}/value-chain/seller-customer-details`,
  ussd_codes: `${base_url}/ussd-codes`,
  reset_password: `${auth_url}/sso/auth/forgot_password`,
  currency: `${base_url}/currency`,
  get_attribute: `${base_url}/product-attributes`,
  get_attribute: `${base_url}/product-attributes`,
  forgot_password: `${auth_url}/sso/auth/forgot_password/v2`,
};
