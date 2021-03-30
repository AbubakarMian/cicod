import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/CustomerDeatailCss';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../views/Header';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
export default class CustomersDetal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    render() {

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={[{}, styles.mainView]}>
                <Header/>
                <View style={[{},styles.headerRow]}>
                    <View>
                    <Icon name="arrow-left" size={25} color="#929497" />
                    </View>
                    <View>
                        <Text style={[{},styles.headerRowText]}>customers</Text>
                    </View>
                    
                </View>
                <View style={[{},styles.mainContentView]}>
                 <View style={[{},styles.mainContentUserImageView]}>
                     <Image 
                     source={require('../images/customer/usericon.png')}
                     />
                 </View>
                 <View>
                     <Text style={{fontWeight:'bold',textAlign:'center'}}>Johnson James</Text>
                     <View style={[{},styles.mainContentUserInfoView]}>
                        <Text style={[{},styles.mainContentUserInfoHeading]}>Email: </Text>
                        <Text style={[{},styles.mainContentUserInfo]}>j.joghnson@gmail.com</Text>
                     </View>
                 </View>
                 <View>
                     <View style={[{},styles.mainContentUserInfoView]}>
                        <Text style={[{},styles.mainContentUserInfoHeading]}>Phone: </Text>
                        <Text style={[{},styles.mainContentUserInfo]}>08123456789</Text>
                     </View>
                 </View>
                 <View>
                     <View style={[{},styles.mainContentUserInfoView]}>
                        <Text style={[{},styles.mainContentUserInfoHeading]}>Customer Address: </Text>
                        <Text 
                        numberOfLines={3}
                        style={[{width:width/2},styles.mainContentUserInfo]}>45b,45b Admiralty way, Lekki Phase 1,Lagos</Text>
                     </View>
                 </View>
                </View>
                <View style={[{},styles.balanceView]}>
                  <View style={[{},styles.balanceRowView]}>
                      <View style={[{},styles.balanceColumn1View]}>
                        <Text style={[{},styles.balanceColumn1Text]}>Avail. Balance</Text>
                      </View>
                      <View style={[{},styles.balanceColumn2View]}>
                        <Text style={[{},styles.balanceColumn2Text]}>₦ 506,340.00</Text>
                      </View>
                  </View>
                  <View style={[{},styles.balanceRowView]}>
                      <View style={[{},styles.balanceColumn1View]}>
                        <Text style={[{},styles.balanceColumn1Text]}>Acct. Balance</Text>
                      </View>
                      <View style={[{},styles.balanceColumn2View]}>
                        <Text style={[{},styles.balanceColumn2Text]}>₦ 6,340.00</Text>
                      </View>
                  </View>
                  <View style={[{},styles.balanceRowView]}>
                      <View style={[{},styles.balanceColumn1View]}>
                        <Text style={[{},styles.balanceColumn1Text]}>Loyalty Points</Text>
                      </View>
                      <View style={[{},styles.balanceColumn2View]}>
                        <Text style={[{},styles.balanceColumn2Text]}>70</Text>
                      </View>
                  </View>
                  <View style={[{paddingBottom:10},styles.balanceRowView]}>
                      <View style={[{},styles.balanceColumn1View]}>
                        <Text style={[{},styles.balanceColumn1Text]}>Credit Note</Text>
                      </View>
                      <View style={[{},styles.balanceColumn2View]}>
                        <Text style={[{},styles.balanceColumn2Text]}>₦ 16,000.00</Text>
                      </View>
                  </View>
                  
                </View>
            </View>
        )
    }
}
