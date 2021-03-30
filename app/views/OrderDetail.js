import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Touchable, ScrollView, Alert } from 'react-native';
import styles from '../css/OrderDetailCss';
import Header from '../views/Header'
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';


var { width, height } = Dimensions.get('window');

export default class OrderDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isChecked:false
        }
    }

    render() {
        return (
            <ScrollView>
            <View style={[{}, styles.mainView]}>
              <Header/>
              <View style={[{},styles.headingRow]}>
              <Icon name="arrow-left" size={25} color="#929497" />
                <Text style={[{},styles.resetText]}>ORDER DETAIL</Text>
              </View>
              <View style={[{},styles.textInputView]}>
                <Text style={{color:'#aaa'}}>CICOD ORDER ID</Text>
                <Text style={{fontWeight:'bold'}}>103943535</Text>
                <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('Home')}
                    style={[{}, styles.btnContinuueView]}>
                    <Text style={{ color: '#FFFFFF' }}>Send receipt</Text>
                </TouchableOpacity>
              </View>
              <View style={[{},styles.detailMainView]}>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Customer Name</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>James Abinibi</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Phone Number</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>09051390405</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Delivery Type</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>ONLINE</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Order Channel</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>ACCOUNT</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Customer Address</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>10, Ajala, Cresent, Alimosho, Alimosho, Lagos</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Email Address</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{fontSize:12},styles.detailColumn2text]}>JamesAbinibi@gmail.com</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Payment Mode</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>ACCOUNT</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Order Status</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{borderRadius:50,paddingHorizontal:5,backgroundColor:'#DAF8EC',color:'#26C281',width:width/8,alignSelf:'flex-end'},styles.detailColumn2text]}>PAID</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Payment Status</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>PAID FROM CREDIT</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Ticket Id</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>1623</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Created By</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>Andrew Blakes</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Payment Due Date</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>-</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{},styles.detailColumn1text]}>Delivery Address</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>10, Ajala, Cresent, Alimosho, Alimosho, Lagos</Text>
                     </View>
                 </View>
                 <View style={{},styles.detailRow}>
                     <View style={[{},styles.detailColumn1]}>
                     <Text style={[{fontSize:11},styles.detailColumn1text]}>Amount Paid From Credit Limit</Text>
                     </View>
                     <View style={[{},styles.detailColumn2]}>
                         <Text style={[{},styles.detailColumn2text]}>-</Text>
                     </View>
                 </View>
              </View>
              <View style={[{},styles.detailMainView]}>
                  <View style={[{alignSelf:'flex-start',width:width-20,paddingHorizontal:10,marginVertical:10,flexDirection:'row'}]}>
                      <Image 
                      source={require('../images/Order/invoice.png')}
                      />
                      <View style={{marginLeft:10,flexDirection:'column'}}>
                          <Text style={[{},styles.detailColumn1text]}>Invoice Number:</Text>
                          <Text style={[{fontWeight:'bold'},styles.detailColumn2text]}>PCIN00000915</Text>
                      </View> 
                  </View>
                 <View style={{},styles.invoiceRow}>
                    <View style={{flexDirection:'column',width:width-50}}>
                      <Text style={{color:'#4E4D4D'}}>Pure ORANGE JUICE 12PACK</Text>
                      <Text style={{color:'#929497',fontSize:12}}>LAGOS- Palms</Text>
                      <View style={{flexDirection:'row'}}>
                       <Text style={{fontSize:10,fontWeight:'bold',color:'#929497'}}>Unit Price: </Text>
                       <Text style={{fontSize:8,color:'#929497',marginRight:20}}>N100,000 </Text>
                       <Text style={{fontSize:10,fontWeight:'bold',color:'#929497'}}>QTY: </Text>
                       <Text style={{fontSize:8,color:'#929497',marginRight:width/4}}>5 </Text>
                       <Text style={{fontSize:15,fontWeight:'bold',color:'#929497',textAlign:'right',alignSelf:'flex-end'}}>N500,000 </Text>
                      </View>
                    </View>
                 </View>
                 <View style={{},styles.invoiceRow}>
                    <View style={{flexDirection:'column',width:width-50}}>
                      <Text style={{color:'#4E4D4D'}}>Pure ORANGE JUICE 12PACK</Text>
                      <Text style={{color:'#929497',fontSize:12}}>LAGOS- Palms</Text>
                      <View style={{flexDirection:'row'}}>
                       <Text style={{fontSize:10,fontWeight:'bold',color:'#929497'}}>Unit Price: </Text>
                       <Text style={{fontSize:8,color:'#929497',marginRight:20}}>N100,000 </Text>
                       <Text style={{fontSize:10,fontWeight:'bold',color:'#929497'}}>QTY: </Text>
                       <Text style={{fontSize:8,color:'#929497',marginRight:width/4}}>5 </Text>
                       <Text style={{fontSize:15,fontWeight:'bold',color:'#929497',textAlign:'right',alignSelf:'flex-end'}}>N500,000 </Text>
                      </View>
                    </View>
                 </View>
                 <View style={{alignSelf:'flex-end',marginRight:20,marginVertical:20,flexDirection:'row'}}>
                     <Text style={{fontWeight:'bold'}}>Total:  </Text>
                     <Text style={{fontWeight:'bold'}}>N750,000</Text>
                 </View>
              
              </View>
              
            </View>
            </ScrollView>
        );
    }
}
