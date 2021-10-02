import React from 'react';
import { View, Image, TouchableOpacity, Dimensions,FlatList, Touchable, ScrollView,Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import styles from '../../../css/OrderDetail_pendingCss';
import fontStyles from '../../../css/FontCss'


import NumberFormat from 'react-number-format';

var { width, height } = Dimensions.get('window');

const OrderDetailSection=({delivery_amount=0, order_id,resendRecipt=f=>f,pay=f=>f,send_order_confirmation=f=>f,customer_address,customer_email,customer_name,customer_phone,order_status,payment_mode,payment_status,delivery_address,delivery_type,payment_date,ticket_id,amount_paid_from_credit_limit,total_amount,currency,data})=>(
<>


<View style={[{}, styles.textInputView]}>
<Text style={{ color: '#aaa' }}>CICOD Order ID</Text>
<Text style={{ fontWeight: 'bold' }}>{order_id}</Text>
{/* {payment_status=="PAID" &&(
    <TouchableOpacity
    onPress={() => resendRecipt()}
    style={[ styles.btnContinuueView,{ backgroundColor: '#B1272C',
    borderRadius: 50,
    width: width - 50,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,}]}>
    <Text style={{ color: '#FFFFFF' }}>Send receipt</Text>
</TouchableOpacity>
)} */}

{payment_status=="PENDING" &&(
    <TouchableOpacity
    onPress={() => pay()}
    style={[ styles.btnContinuueView,{ backgroundColor: '#B1272C',
    borderRadius: 50,
    width: width - 50,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,}]}>
    <Text style={{ color: '#FFFFFF' }}>Pay</Text>
</TouchableOpacity>
)}


 {/* {payment_status=="PENDING" &&(

                        <View style={[{flexDirection:'row',width:width-20,alignSelf:'center'}]}>

 <TouchableOpacity
                            // onPress={() => this.ReciptResend()}
    onPress={()=>pay()}
    style={[{}, styles.btnContinuueView]}>
    <Text style={{ color: '#FFFFFF' }}>Pay</Text>
</TouchableOpacity>
<TouchableOpacity
    // onPress={() => this.ReciptResend()}
    onPress={()=>send_order_confirmation()}
    style={[{}, styles.btnSend]}>
    <Text style={{ color: '#B1272C' }}>Send order confirmation</Text>
</TouchableOpacity>

</View>
 )
 } */}

</View>
<View style={[{}, styles.detailMainView]}>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Customer Name</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{customer_name}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Phone Number</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{customer_phone ?? 0}</Text>
                            </View>
                        </View>
                        
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Order Channel</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>Order Channel</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Customer Address</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{customer_address ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Email Address</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{ fontSize: 12 }, styles.detailColumn2text]}>{customer_email ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Mode</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{payment_mode ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Delivery Type</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{delivery_type=="DELIVERY" ?'DELIVERY': 'PICKUP'}</Text>
                            </View>
                        </View>

                       

                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Order Status</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                    
                       

                                    <Text style={[{
                                        backgroundColor:order_status=='PENDING'?'#FFF3DB': 
                                    order_status=='CANCELLED'? '#FFF4F4':
                                    order_status=='PAID'? '#DAF8EC':
                                    order_status=='PART PAYMENT'? '#E6E6E6'
                                    :null,color:order_status=='PENDING'?'#FDB72B': 
                                    order_status=='CANCELLED'? '#B1272C':
                                    order_status=='PAID'? '#26C281':
                                    order_status=='PART PAYMENT'? '#929497'
                                    :null},styles.orderStatusText]}>
                                       
                                        {order_status}
                                    </Text>      
                      
                        </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Status</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{
                                     backgroundColor:payment_status=='PENDING'?'#FFF3DB': 
                                     payment_status=='CANCELLED'? '#FFF4F4':
                                     payment_status=='PAID'? '#DAF8EC':
                                     payment_status=='PART PAYMENT'? '#E6E6E6'
                                     :null,color:payment_status=='PENDING'?'#FDB72B': 
                                     payment_status=='CANCELLED'? '#B1272C':
                                     payment_status=='PAID'? '#26C281':
                                     payment_status=='PART PAYMENT'? '#929497'
                                     :null}, styles.orderStatusText]}>{payment_status ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Ticket Id</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{ticket_id ?? '--'}</Text>
                            </View>
                        </View>
                        {/* <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Created By</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{data.created_by ?? '--'}</Text>
                            </View>
                        </View> */}
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Payment Due Date</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{payment_date ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{}, styles.detailColumn1text]}>Delivery Address</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{delivery_address ?? '--'}</Text>
                            </View>
                        </View>
                        <View style={{}, styles.detailRow}>
                            <View style={[{}, styles.detailColumn1]}>
                                <Text style={[{ fontSize: 11 }, styles.detailColumn1text]}>Amount Paid From Credit Limit</Text>
                            </View>
                            <View style={[{}, styles.detailColumn2]}>
                                <Text style={[{}, styles.detailColumn2text]}>{amount_paid_from_credit_limit ?? '--'}</Text>
                            </View>
                        </View>
                    </View>




                    
                    <View style={[{}, styles.detailMainView]}>
                        <View style={[{ alignSelf: 'flex-start', borderBottomWidth: 0.25, paddingBottom: 10, width: width - 20, paddingHorizontal: 10, marginVertical: 10, flexDirection: 'row' }]}>
                            <Image
                                style={{height:40,width:30}}
                                source={require('../../../images/Order/invoice.png')}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Text style={[{}, styles.detailInvoiceGraytext]}>Invoice Number:</Text>
                                <Text style={[{ fontWeight: 'bold' }, styles.detailInvoiceDarkGraytext]}>PCIN {order_id}</Text>
                            </View>
                        </View>
                        <FlatList
                        data={data}
                        ItemSeparatorComponent={
                            Platform.OS !== 'android' &&
                            (({ highlighted }) => (
                                <View
                                    style={[
                                        style.separator,
                                        highlighted && { marginLeft: 0 }
                                    ]}
                                />
                            ))
                        }
                        renderItem={({ item, index, separators }) => (
                            <View style={{}, styles.invoiceRow}>
                                <View style={{ flexDirection: 'column', width: width - 50 }}>
                                    <Text style={[{}, styles.detailInvoiceLable]}>{item.name|| item.inv_name}</Text>
                                    {/* <Text style={{ color: '#929497', fontSize: 12 }}>LAGOS- Palms</Text> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>Unit Price: </Text>
                                        <Text style={{ fontSize: 13, color: '#929497', marginRight: 20 }}> <NumberFormat decimalScale={2} renderText={(value, props) => <Text {...props}>{value}</Text>} value={item.price||item.inv_price} displayType={'text'} thousandSeparator={true}  prefix={currency}/> </Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#929497' }}>QTY: </Text>
                                        <Text style={{  fontSize: 13, color: '#929497', marginRight: width / 4 }}>{item.quantity||item.inv_qnty} </Text>
                                        <Text style={{ position:'absolute',right:20,fontSize: 13, fontWeight: 'bold', color: '#929497', textAlign: 'right', alignSelf: 'flex-end' }}>
                                             <NumberFormat decimalScale={2} renderText={(value, props) => <Text {...props}>{value}</Text>} value={(item.quantity||item.inv_qnty*item.price||item.inv_price)} displayType={'text'} thousandSeparator={true}  prefix={currency}/></Text>
                                    </View>
                                </View>
                            </View>

                        )}
                       />
                        {delivery_type=="DELIVERY" ? (
                        <View>
                        <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: 20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>Sub Total:  </Text>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>
                                
                                <NumberFormat decimalScale={2} renderText={(value, props) => <Text {...props}>{value}</Text>} value={total_amount} displayType={'text'} thousandSeparator={true}  prefix={currency}/>
{/*                                     
                                {currency+ total_amount} */}
                                {/* {this.props.currency.currency+total_amount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")} */}
                                </Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: 20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>Delivery Fee:  </Text>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>
                                
                                <NumberFormat decimalScale={2} renderText={(value, props) => <Text {...props}>{value}</Text>} value={delivery_amount} displayType={'text'} thousandSeparator={true}  prefix={currency}/>
{/*                                     
                                {currency+ total_amount} */}
                                {/* {this.props.currency.currency+total_amount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")} */}
                                </Text>
                        </View>

                        <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: 20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>Total:  </Text>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>
                                
                                <NumberFormat decimalScale={2} renderText={(value, props) => <Text {...props}>{value}</Text>} value={parseFloat(total_amount)+parseFloat(delivery_amount)} displayType={'text'} thousandSeparator={true}  prefix={currency}/>
{/*                                     
                                {currency+ total_amount} */}
                                {/* {this.props.currency.currency+total_amount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")} */}
                                </Text>
                        </View>

                        </View>
                        ):
                            <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: 20, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>Total:  </Text>
                            <Text style={{ fontWeight: 'bold', color: '#4E4D4D', fontSize: 17, fontFamily: 'Open Sans' }}>
                                
                                <NumberFormat decimalScale={2} renderText={(value, props) => <Text {...props}>{value}</Text>} value={total_amount} displayType={'text'} thousandSeparator={true}  prefix={currency}/>
{/*                                     
                                {currency+ total_amount} */}
                                {/* {this.props.currency.currency+total_amount.replace(/\B(?=(\d{1})+(?!\d))/g, ",")} */}
                                </Text>
                        </View>
                        }

                        

                    </View>
                    <View style={[{},styles.noteView]}>
                        <Text style={[{color:'#929497',marginLeft:10,marginBottom:10},fontStyles.bold15]}>Notes</Text>
                        <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6'}}></View>
                        <View style={{justifyContent:'center',alignItems:'center',paddingVertical:20}}>
                            <Image
                            style={{height:width/6,width:width/6}} 
                            source={require('../../../images/Order/note.png')}
                            />
                            <Text style={[{color:'#929497'},fontStyles.normal15]}>No note found</Text>
                        </View> 
                    </View>
</>
)

export default OrderDetailSection