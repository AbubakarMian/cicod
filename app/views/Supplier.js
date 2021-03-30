import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss'
import Header from '../views/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
export default class Supplier extends React.Component {
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
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '##F0F0F0', }}>
                <Header />
                <View style={{ flexDirection: 'row',marginVertical:10, alignContent: 'center', alignItems: 'center', width: width - 20, alignSelf: 'center' }}>
                    <View>
                    <Icon name="arrow-left" size={25} color="#929497" />
                    </View>
                    <View>
                    <Text style={{ color: '#2F2E7C', fontWeight: 'bold',marginHorizontal:20 }}>SUPPLIER</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 0 }}>
                        <Image
                            source={require('../images/products/circlePlus.png')}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <View>
                        <TextInput
                            placeholder="Search supplier"
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Filter')}
                        >
                            <Image
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    horizontal={true}
                    paddingHorizontal={20}
                    marginBottom={20}
                    scrollEnabled={true}
                >
                    <View style={{ width: width - 20, flexDirection: 'row' }}>
                        <View >
                            <Text style={{ marginRight: 5,backgroundColor:'#E6E6E6',paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff' }}>All</Text>
                        </View>
                        <View >
                          <Text style={{color:'#909090',backgroundColor:'#E6E6E6', marginRight:5, paddingHorizontal:10,borderRadius:50,backgroundColor:'#fff',fontSize:10}}>PENDING</Text>
                      </View>
                      <View >
                          <Text style={{color:'#909090',backgroundColor:'#E6E6E6', marginRight:5, paddingHorizontal:10,borderRadius:50,backgroundColor:'#fff',fontSize:10}}>PAID</Text>
                      </View>
                      <View >
                          <Text style={{color:'#909090',backgroundColor:'#E6E6E6', marginRight:5, paddingHorizontal:10,borderRadius:50,backgroundColor:'#fff',fontSize:10}}>PART PAYMENT</Text>
                      </View>
                      <View >
                          <Text style={{color:'#909090',backgroundColor:'#E6E6E6', marginRight:5, paddingHorizontal:10,borderRadius:50,backgroundColor:'#fff',fontSize:10}}>PAID FROM CREDIT</Text>
                      </View>

                    </View>
                </ScrollView>

                <ScrollView>
                    <FlatList
                        data={[
                            { title: 'TestKing Nigeria', key: 'item1', customer: 'Product Category: 5', brand: 'Pure Juice ', date: '2017-01-30 / 10:45 AM' },
                            { title: 'KNGS CROWN', key: 'item1', customer: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'Wholesale NG', key: 'item1', customer: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: '103943535', key: 'item1', customer: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: '103943535', key: 'item1', customer: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: '103943535', key: 'item1', customer: 'Product Category: 5', brand: 'Pure Juice ' },
                             ]}
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
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../images/supplier/bage.png')}
                                                />
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                                    <Text style={[{ color: '#aaa' }]}>{item.customer}</Text>
                                                </View>
                                            </View>
                                           
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'column' }}>
                                        
                                        <View style={[{ backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                            <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </ScrollView>

            </View>
        )
    }
}
