import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/TabNavCss'
import fontStyles from '../css/FontCss'
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
export default class TabsNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false,
            screen: '',
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {

        console.log('props in tab !!!!!!!!')
        this.setState({
            screen: this.props.screen
        })
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    render() {
        const that = this;
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={[{}, styles.tabRoW]}>
                <TouchableOpacity style={[{}, styles.tabCoulumn]}
                onPress={()=> this.props.props.navigation.navigate('Dashboard')}
                >
                    {(this.state.screen == 'dashboard') ?
                        <View style={{ marginTop: 2 }}>
                            <Image
                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/red_chart.png')}
                            />


                            <Text style={[{ color: '#b00000' }, fontStyles.normal13]}>Dashboard</Text>
                        </View>
                        :
                        <View>
                            <Image
                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/chart.png')}
                            />
                            <Text style={[{ color: '#929497' }, fontStyles.normal13]}>Dashboard</Text>
                        </View>
                    }

                </TouchableOpacity>
                <TouchableOpacity style={[{}, styles.tabCoulumn]}
                onPress={()=> this.props.props.navigation.navigate('Order')}
                >
                    {(this.state.screen == 'order') ?
                        <View style={{ marginTop: 2 }}>
                            <Image

                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/red_order.png')}
                            />
                            <Text style={[{ color: '#b00000' }, fontStyles.normal13]}>Orders</Text>
                        </View> :
                        <View style={{ marginTop: 2 }}>
                            <Image

                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/order.png')}
                            />
                            <Text style={[{ color: '#929497' }, fontStyles.normal13]}>Orders</Text>
                        </View>
                    }

                </TouchableOpacity>
                <TouchableOpacity style={[{}, styles.tabCoulumn]}
                    onPress={()=> this.props.props.navigation.navigate('Products')}
                >
                    {(this.state.screen == 'product') ?
                        <View style={{ marginTop: 2 }}>
                            <Image
                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/red_products.png')}
                            />
                            <Text style={[{ color: '#b00000' }, fontStyles.normal13]}>Products</Text>
                        </View> :
                        <View>
                            <Image
                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/products.png')}
                            />
                            <Text style={[{ color: '#929497' }, fontStyles.normal13]}>Products</Text>
                        </View>}
                </TouchableOpacity>
                <TouchableOpacity style={[{}, styles.tabCoulumn]}
                onPress={()=> this.props.props.navigation.navigate('More')}
                >
                    {(this.state.screen == 'more') ?
                        <View style={{ marginTop: 2 }}>
                            <Image
                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/red_more.png')}
                            />
                            <Text style={[{ color: '#b00000' }, fontStyles.normal13]}>More</Text>
                        </View> :
                        <View style={{ marginTop: 2 }}>
                            <Image
                                style={{ height: 20, width: 20,alignSelf:'center' }}
                                source={require('../images/tabnav/more.png')}
                            />
                            <Text style={[{ color: '#929497' }, fontStyles.normal13]}>More</Text>
                        </View>}
                </TouchableOpacity>
            </View>
        )
    }
}
