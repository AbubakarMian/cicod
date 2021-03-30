import React from 'react'
import { View, ImageBackground, Text,FlatList,TouchableHighlight, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../css/ConnectCss';
import { Container,  Left, Body, Right, Button, Title, Segment, Content,  } from 'native-base';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Buyers extends React.Component {
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header />
                <View style={[{}, styles.mainRow]}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>BUYERS</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center',borderBottomColor:'#E6E6E6',borderBottomWidth:2,paddingBottom:30 }}>
                    <View style={{backgroundColor:'#fff',flexDirection:'row',alignItems:'center',paddingHorizontal:10,width:width-30,alignSelf:'center'}}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <View>
                        <TextInput
                            placeholder="Search buyers"
                            
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('BuyersFilter')}
                        >
                            <Image
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                </View>
                <ScrollView
                scrollEnabled={true}
                horizontal={true}
                marginTop={20}
                >
                       <FlatList
                        data={[
                            { title: 'WellFoods NG', key: 'item1', qty: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'CPMART', key: 'item1', qty: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'BuyTime Stores', key: 'item1', qty: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'Allday Buy', key: 'item1', qty: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'TIP SHOPS', key: 'item1', qty: 'Product Category: 5', brand: 'Pure Juice ' },
                           
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
                                            source={require('../images/Order/bage.png')}
                                        />

                                    </View>

                                    <View style={{ position: 'relative', flex: 3 }}>
                                        <Text>{item.title}</Text>
                                        <View style={{ flexDirection: 'row', }}>

                                            <Text style={{fontSize:10,color:'#929497'}}>{item.qty}</Text>
                                            <View style={{flexDirection:'column',position: 'absolute', right: 0,top:-15, alignItems:'center'}}>
                                            <Icon name="ellipsis-h" size={30} color="#929497" />
                                            <View style={[{  backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                
                                                <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                            </View>
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
