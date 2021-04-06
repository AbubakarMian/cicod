import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/AddCustomerCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            searchPress: 1
        }

    }
    seacrhClick() {
        if (this.state.searchPress === 1) {
            console.log("**********")
            this.setState({ searchPress: 2 })

        } else if (this.state.searchPress === 2) {
            console.log("#########")
            this.setState({ searchPress: 2 })
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
                        <Text style={[{}, styles.backHeadingText]}>ADD CUSTOMER</Text>
                    </View>
                </View>
                <View>
                    <ScrollView>
                        <View style={[{}, styles.searchContainer]}>
                            <Image
                                source={require('../images/products/searchicon.png')}
                            />
                            <TextInput
                                placeholder="Search Customer"
                                onPressIn={() => this.seacrhClick()}
                            />
                        </View>
                        {/* <View style={[{},styles.contentView]}>
                          <Image 
                          source={require('../images/user-circle.png')}
                          />
                          <Text style={[{},styles.contentViewHeadingText]}>No customer selected</Text>
                          <Text style={[{},styles.contentViewDescText]}>Search for a customer</Text>
                        </View> */}

                        <View
                            style={[{}, styles.custommerDeatailContainerView]}
                        >
                            <View style={[{}, styles.custommerDtailCarView]}>
                                <View style={[{}, styles.custommerNameRow]}>
                                    <Icon name="user-circle" size={15} />
                                    <Text style={[{}, styles.custommerNameText]}>Johnson James</Text>
                                    <Icon
                                        style={[{}, styles.custommerNameRightAngle]}
                                        name="angle-right"
                                        size={20} />
                                </View>
                                <View style={[{}, styles.custommerDtailCardRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Email: </Text>
                                    <Text style={[{}, styles.custommerDtailCardNormalText]}>j.joghnson@gmail.com</Text>
                                </View>
                                <View style={[{}, styles.custommerDtailCardRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Phone: </Text>
                                    <Text style={[{}, styles.custommerDtailCardNormalText]}>08123456789</Text>
                                </View>
                                <View style={[{}, styles.custommerDtailCardRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Customer Address: </Text>
                                    <Text
                                        numberOfLines={2}

                                        style={[{}, styles.custommerDtailCardNormalText]}>45b,45b Admiralty way, Lekki Phase 1,Lagos</Text>
                                </View>
                            </View>
                            <View style={[{}, styles.countingContainer]}>
                                <View style={[{}, styles.countingRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Avail. Balance</Text>
                                    <Text style={[{}, styles.custommerDtailCardNormalText]}>₦ 506,340.00</Text>
                                </View>
                                <View style={[{}, styles.countingRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Acct. Balance</Text>
                                    <Text style={[{}, styles.custommerDtailCardNormalText]}>₦ 6,340.00</Text>
                                </View>
                                <View style={[{}, styles.countingRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Credit Balance</Text>
                                    <Text style={[{}, styles.custommerDtailCardNormalText]}>₦ 500,000.00</Text>
                                </View>

                            </View>
                            <View style={[{}, styles.countingContainer]}>
                                <View style={[{}, styles.countingRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Loyalty Points</Text>
                                    <Text style={[{}, styles.custommerDtailCardNormalText]}>70.00</Text>
                                </View>
                                <View style={[{}, styles.countingRowView]}>
                                    <Text style={[{}, styles.custommerDtailCardBoldText]}>Credit Note</Text>
                                    <Text style={[{}, styles.custommerDtailCardNormalText]}>₦ 16,000.00</Text>
                                </View>
                                <View style={[{}, styles.countingRowView]}>

                                </View>

                            </View>
                            <TouchableOpacity 
                            onPress={()=>this.props.navigation.navigate('AddNewCustomer')}
                            style={[{},styles.addCustommerRowView]}>
                              <Image source={require('../images/circlePlus.png')} />
                              <Text style={[{},styles.addCustommerText]}>Add new customer</Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </View>
            </View>
        )
    }
}
