import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/ProductViewCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class ProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            searchPress: 1
        }

    }
  
    render() {

        return (
            <View style={[{}, styles.mainView]}>
                <Header />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity>
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>PRODUCT</Text>
                    </View>
                </View>
                <View style={[{},styles.productDeatailContainer]}>
                    <View style={[{},styles.productDeatailHeaderRow]}>
                      <View style={[{},styles.aciveView]}>
                          <Text style={{color:'#26C281'}}>ACTIVE</Text>
                         

                      </View>
                      <Image 
                      style={[{alignSelf:'baseline'}]}
                      source={require('../images/ticket.png')} />
                      <Icon 
                          style={[{},styles.settingIcon]}
                          size={25}
                          color={'#929497'}
                          name="ellipsis-h" />
                           
                    </View>
                    <Text style={[{},styles.productDeatailHeadingText]}>Pure ORANGE JUICE 12PACK</Text>
                    <Text style={[{},styles.lightGrayTex]}>PJ836439</Text>
                    <View style={{borderBottomWidth:1,borderColor:'#E6E6E6',marginVertical:10}}></View>
                    <View style={[{},styles.descRow]}>
                       <View style={[{},styles.descColumn]}>
                           <Text style={[{},styles.lightGrayTex]}>Quantity</Text>
                           <Text style={[{},styles.darkGarayText]}>100</Text>  
                       </View>
                       <View style={[{},styles.descColumn]}>
                           <Text style={[{},styles.lightGrayTex]}>Category</Text>
                           <Text style={[{},styles.darkGarayText]}>Pure Juice</Text>    
                       </View>
                       <View style={[{},styles.descColumn]}>
                           <Text style={[{},styles.lightGrayTex]}>Price</Text>
                           <Text style={[{},styles.darkGarayText]}>N40,500</Text>    
                           
                       </View>
                    </View>
                    <View style={[{},styles.descRow]}>
                       <View style={[{},styles.descColumn]}>
                           <Text style={[{},styles.lightGrayTex]}>Reservation (Days)</Text>
                           <Text style={[{},styles.darkGarayText]}>0</Text>  
                       </View>
                       <View style={[{},styles.descColumn]}>
                           <Text style={[{},styles.lightGrayTex]}>Category</Text>
                           <Text style={[{},styles.darkGarayText]}>Andrew </Text>    
                           <Text style={[{},styles.darkGarayText]}> Blakes</Text>    
                       </View>
                       <View style={[{},styles.descColumn]}>
                           <Text style={[{},styles.lightGrayTex]}>Created Date</Text>
                           <Text style={[{},styles.darkGarayText]}>2020-11-18</Text>    
                           <Text style={[{},styles.darkGarayText]}>10:30 AM</Text>    
                           
                       </View>
                       
                    </View>
                    
                </View>
                <Text style={[{},styles.imageHeadingText]}>IMAGE</Text>
                <Image 
                style={[{},styles.productImage]}
                source={require('../images/juice.png')}/>
            </View>
        )
    }
}
