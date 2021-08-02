this.setState({
    area: buyer_detail.area,
    business_sector: buyer_detail.business_sector,
    business_type: buyer_detail.business_type,
    buyer_id: buyer_detail.merchant_id,
    buyer_name: buyer_detail.merchant_name,
    date_joined: buyer_detail.date_joined,
    buyer_data: {
        buyer_id: responseJson.data.merchant_id,
        buyer_name: responseJson.data.merchant_name
    },
})



this.setState({
    area: buyer_detail.area,
    business_sector: buyer_detail.business_sector,
    business_type: buyer_detail.business_type,
    buyer_id: buyer_detail.merchant_id,
    buyer_name: buyer_detail.merchant_name,
    date_joined: buyer_detail.date_joined,
    buyer_data: {
        buyer_id: responseJson.data.merchant_id,
        buyer_name: responseJson.data.merchant_name
    },
})