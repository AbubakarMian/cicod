import React from 'react'
import { View, ImageBackground, ScrollView, Text,TextInput, Dimensions, Image, Platform, TouchableOpacity, FlatList } from 'react-native'
import styles from '../css/AddDiliveryAddressCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from 'react-native-check-box';
import Header from '../views/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class AddDiliveryAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false
        }

    }
    render() {
        var radio_props_dilvery = [
            { label: 'Dilivery', value: 0 },

        ];
        var radio_props_pickup = [
            { label: 'No 8, Left right, Avenue Lekki Phase 1, Lagos Nigeria', value: 1 },

        ];
        var radio_props_payment = [
            { label: 'Pay Now', value: 0 },
            { label: 'Pay Acount', value: 1 },
            { label: 'Pay Invoice', value: 2 },

        ];
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View>
                        <View style={[{}, styles.backHeaderRowView]}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('BuyCreateOrder')}

                            >
                                <Icon name="arrow-left" size={25} color="#929497" />
                            </TouchableOpacity>
                            <View style={[{}, styles.backHeadingView]}>
                                <Text style={[{}, styles.backHeadingText]}>Add DELIVERY ADDRESS</Text>
                            </View>

                        </View>
                        <View style={[{}, styles.addressContainer]}>
                        <View style={[{ marginTop: 10 }, styles.mainFormView]}>
                           

                           
                           
                                <View>
                                    <TextInput
                                        placeholder="House No.*"
                                        onChangeText={text => this.setState({ delivery_house_no: text })}
                                    />
                                    <TextInput
                                        placeholder="Street*"
                                        onChangeText={text => this.setState({ delivery_street: text })}
                                    />
                                    <TextInput
                                        placeholder="Landmark"
                                        onChangeText={text => this.setState({ delivery_landmark: text })}
                                    />
                                    <View style={[{}, styles.formRow]}>
                                        <View style={[{}, styles.formColumn]}>
                                      
                                                <DropDownPicker
                                                    // items={this.state.countries_arr}
                                                    autoScrollToDefaultValue={true}
                                                    containerStyle={{ height: 50, width: width - 28, marginTop: 15 }}
                                                    style={{ backgroundColor: '#fff' }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    placeholder="Country *"
                                                    dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100 }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    onChangeItem={item => this.onDeliverySelectCountry(item.value)}
                                                />
                                        </View>

                                    </View>
                                    <View style={[{flexDirection:'row'}, styles.formRow]}>
                                        <View style={[{}, styles.formColumn]}>
                                          
                                                <DropDownPicker
                                                    // items={this.state.states_arr}
                                                    containerStyle={{ height: 50, width: width - 200, marginTop: 15 }}
                                                    style={{ backgroundColor: '#fff' }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    placeholder="States *"
                                                    dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    onChangeItem={item => this.onDeliverySelectState(item.value)}
                                                />
                                        </View>
                                        <View style={[{}, styles.formColumn]}>
                                          
                                                <DropDownPicker
                                                    items={this.state.lgas_arr}
                                                    containerStyle={{ height: 50, width: width - 200, marginTop: 15 }}
                                                    style={{ backgroundColor: '#fff' }}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start', zIndex: 0.99
                                                    }}
                                                    placeholder="LGA *"
                                                    dropDownStyle={{ backgroundColor: '#f0f0f5', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                                                    labelStyle={{ color: '#A9A9A9' }}
                                                    onChangeItem={item => this.onDeliverySelectLgas(item.value)}
                                                />
                                        </View>
                                    </View>
                                    <View>
                                        <CheckBox
                                            style={[{ width: width, }, styles.cheBox]}
                                            onClick={() => {
                                                this.setState({
                                                    is_default: !this.state.is_default
                                                })
                                            }}
                                            size={2}
                                            isChecked={this.state.is_default}
                                            rightText={"Set as default"}

                                        />
                                    </View>
                                </View>
                             
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('DiliveryAddress')}
                                style={[{}, styles.redBtn]}
                            >
                                <Text style={{ color: '#fff' }}>Save</Text>
                            </TouchableOpacity>

                        </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


