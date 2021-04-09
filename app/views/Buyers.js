import React from 'react'
import { View, ImageBackground, Text, FlatList, TouchableHighlight, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';

import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../css/BuyersCss';
import { Container, Left, Body, Right, Button, Title, Segment, Content, } from 'native-base';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Buyers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toolTipVisible: false
        }
    }
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.mainRow]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                        style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginLeft: 5 }]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>BUYERS</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center', borderBottomColor: '#E6E6E6', borderBottomWidth: 2, paddingBottom: 10 }}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, width: width - 30, alignSelf: 'center' }}>
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
                                onPress={() => this.props.navigation.navigate('BuyersFilter')}
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
                    marginTop={10}
                >
                    <FlatList
                        data={[
                            { title: 'WellFoods NG', key: 'item1', cat: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'CPMART', key: 'item1', cat: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'BuyTime Stores', key: 'item1', cat: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'Allday Buy', key: 'item1', cat: 'Product Category: 5', brand: 'Pure Juice ' },
                            { title: 'TIP SHOPS', key: 'item1', cat: 'Product Category: 5', brand: 'Pure Juice ' },

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
                                onPress={()=>this.props.navigation.navigate('BuyersView')}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatCardView]}>
                                    <View style={[{}, styles.cardRow]}>
                                        <Image
                                            source={require('../images/bage.png')}
                                        />
                                        <View style={[{}, styles.cardContentView]}>
                                            <Text style={[{}, styles.cardContentDarkText]}>{item.title}</Text>
                                            <Text style={[{}, styles.lightGrayText]}>{item.cat}</Text>
                                        </View>
                                        <View style={[{}, styles.cardActionView]}>

                                            <View style={[{}, styles.cardActionView]}>
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ toolTipVisible: true })}
                                                    style={[{}, styles.cardActionTouch]}
                                                >
                                                    <Icon name="ellipsis-h" color={'#929497'} size={20} />
                                                    
                                                </TouchableOpacity>
                                                <Text style={[{}, styles.statusText]}>Active</Text>
                                                 
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
