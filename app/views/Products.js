import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss'
import CalendarPicker from 'react-native-calendar-picker';
import SearchBar from 'react-native-search-bar';
import Header from '../views/Header';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
export default class Products extends React.Component {
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
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '#F0F0F0' }}>
                <Header />
               <View style={{flexDirection:'row',paddingHorizontal:10,alignItems:'center',justifyContent:'center'}}>
                <View style={{flex:1}}>
                  <Text style={{fontWeight:'bold',color:'#2F2E7C'}}>Products</Text>
                </View>
                <View style={{flex:2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                  <Text style={{fontSize:12,color:'#B1272C',marginRight:10}}>View Product Category</Text>
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
                            placeholder="Search order ID, customer, amount, tic"
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('ProductFilter')}
                        >
                            <Image
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <ScrollView>
                    <FlatList
                        data={[
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },
                            { title: 'Pure ORANGE JUICE 12PACK', key: 'item1', qty: '100', brand: 'Pure Juice ' },

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
                                    <View style={[{ flexDirection: 'row' }]}>
                                        <Image
                                            style={[{ height: 50, width: 50 }]}
                                            source={require('../images/products/ticket.png')}
                                        />

                                    </View>

                                    <View style={{ position: 'relative', flex: 3 }}>
                                        <Text>{item.title}</Text>
                                        <View style={{ flexDirection: 'row', }}>

                                            <Text>QTY:  {item.qty}</Text>
                                            <View style={[{ position: 'absolute', right: 0, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                            </View>
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
