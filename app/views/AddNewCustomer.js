import React from 'react'
import { View, ImageBackground, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, Modal, } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import styles from '../css/AddNewCustomerCss';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class AddNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmModal: false,
            complainModal: true,
        }

    }

    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header />
                <View style={[{}, styles.backRowView]}>
                    <TouchableOpacity>
                        <Icon name="arrow-left" size={25} color={'#929497'} />
                    </TouchableOpacity>
                    <View style={[{}, styles.backRowHeadingView]}>
                        <Text style={[{}, styles.backRowHeadingText]}>ADD NEW CUSTOMER</Text>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View style={[{}, styles.mainFormView]}>
                            <TextInput
                                placeholder="First Name*"
                            />
                            <TextInput
                                placeholder="Last Name*"
                            />
                            <TextInput
                                placeholder="Customer Code"
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        placeholder="Phone Number"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        placeholder="House No."
                                    />
                                </View>
                            </View>
                            <TextInput
                                placeholder="Street"
                            />
                            <TextInput
                                placeholder="Landmark"
                            />
                            <View style={[{}, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>
                                    <TextInput
                                        placeholder="Country*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" />
                                </View>
                                <View style={[{}, styles.formColumn]}>
                                    <TextInput
                                        placeholder="State*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" />
                                </View>
                            </View>
                            <View style={[{}, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>
                                    <TextInput
                                        placeholder="LGA*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" />
                                </View>
                                <View style={[{}, styles.formColumn]}>

                                </View>
                            </View>
                            <View style={[{}, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>
                                    <CheckBox
                                        style={[{width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        isChecked={this.state.isChecked}
                                        rightText={"Enable Free Delivery"}

                                    />
                                </View>
                                <View style={[{}, styles.formColumn]}>
                                    <CheckBox
                                        style={[{width: width / 2, }, styles.cheBox]}
                                        onClick={() => {
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                        size={2}
                                        isChecked={this.state.isChecked}
                                        rightText={"Enable VAT Exemption"}

                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[{ marginTop: 10 }, styles.mainFormView]}>
                            <Text style={{ color: '#929497', fontWeight: 'bold' }}>Delivery Address</Text>
                            <View>
                                <CheckBox
                                    style={[{width: width,}, styles.cheBox]}
                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    size={2}
                                    isChecked={this.state.isChecked}
                                    rightText={"Same as customer’s address"}

                                />
                            </View>
                            <TextInput
                            placeholder="House No.*"
                            />
                            <TextInput
                            placeholder="Street*"
                            />
                            <TextInput
                            placeholder="Landmark"
                            />
                             <View style={[{}, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>
                                    <TextInput
                                        placeholder="LGA*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" />
                                </View>
                               
                            </View>
                            <View style={[{}, styles.formRow]}>
                                <View style={[{}, styles.formColumn]}>
                                    <TextInput
                                        placeholder="State*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" />
                                </View>
                                <View style={[{}, styles.formColumn]}>
                                    <TextInput
                                        placeholder="LGA*"
                                    />
                                    <Icon
                                        style={[{}, styles.gownIcon]}
                                        name="caret-down" />
                                </View>
                            </View>
                            <View>
                                <CheckBox
                                    style={[{width: width,}, styles.cheBox]}
                                    onClick={() => {
                                        this.setState({
                                            isChecked: !this.state.isChecked
                                        })
                                    }}
                                    size={2}
                                    isChecked={this.state.isChecked}
                                    rightText={"Set as default"}

                                />
                            </View>
                            <TouchableOpacity
                            style={[{},styles.redTouchView]}
                            >
                                <Text style={{color:'#fff'}}>Save</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>



            </View>
        )
    }
}
