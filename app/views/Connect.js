import React from 'react'
import { View, ImageBackground, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, } from 'react-native'
import splashImg from '../images/splash.jpg'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../css/ConnectCss';
import { Container, Left, Body, Right, Button, Title, Segment, Content, } from 'native-base';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Connect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabViewIndex: 1
        }
    }


    connectView() {
        return (
            <View>
                <View style={[{}, styles.contentView]}>
                    <Image
                        source={require('../images/home/connect.png')}
                    />
                    <Text style={{ width: width / 2, textAlign: 'center', fontWeight: 'bold', color: '#4E4D4D' }}>Search for Merchant you want to connect with</Text>
                    <View style={[{}, styles.searchView]}>
                        <Image
                            source={require('../images/connect/redsearch.png')}
                        />
                        <TextInput
                            placeholder="Merchant Domain Name"
                        />
                    </View>


                </View>
                <View style={[{}, styles.deatilcontentView]}>
                    <Icon
                        name="briefcase"
                        size={100}
                        color={'#D8D8D8'}
                    />
                    <Text style={{ fontWeight: 'bold', color: '#929497' }}>No Merchant</Text>
                    <Text style={{ color: '#929497', fontSize: 12 }}>Search for a merchant</Text>
                </View>
            </View>
        );
    }
    recievedView() {
        return (
            <ScrollView>
            <View>
                <View style={[{}, styles.searchContainer]}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <TextInput
                        placeholder="Search a products"
                    />
                </View>
                <View style={[{}, styles.recievedList]}>
                    <FlatList
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
                        data={[
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                        ]}
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatCardView]}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={require('../images/Order/bage.png')} />
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'column' }}>
                                        <Text>KNGS CROWN</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 12 }}>342345 .  </Text>
                                            <Text style={{ color: '#aaa', fontSize: 10 }}>2017-01-30 / 10:45 AM</Text>
                                        </View>
                                    </View>

                                    <View style={[{ position: 'absolute', right: 0, marginTop: 5, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                        <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </View>
            </View>
            </ScrollView>
        );
    }
    sentView() {
        return (
            <View>
                <View style={[{}, styles.searchContainer]}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <TextInput
                        placeholder="Search a products"
                    />
                </View>
                <View style={[{}, styles.recievedList]}>
                    <FlatList
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
                        data={[
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            { title: 'Title Text', key: 'item1' },
                            
                        ]}
                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={[{}, styles.flatCardView]}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={require('../images/Order/bage.png')} />
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'column' }}>
                                        <Text>KNGS CROWN</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 12 }}>342345 .  </Text>
                                            <Text style={{ color: '#aaa', fontSize: 10 }}>2017-01-30 / 10:45 AM</Text>
                                        </View>
                                    </View>

                                    <View style={[{ position: 'absolute', right: 0, marginTop: 5, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                        <Text style={[{ color: '#26C281' }]}>APROVED</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </View>
            </View>
        );
    }
    tabView = () => {
        if (this.state.tabViewIndex == 1) {
            return this.connectView();
        }
        else if (this.state.tabViewIndex == 2) {
            return this.recievedView();
        }
        else if (this.state.tabViewIndex == 3) {
            return this.sentView();
        }
    }

    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header />
                <View style={[{}, styles.mainRow]}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>CONNECT</Text>
                    </View>
                </View>
                <View style={[{}, styles.tabView]}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { this.setState({ tabViewIndex: 1 }) }}
                    >
                        <Text style={{ color: '#B1272C', fontWeight: 'bold', textAlign: 'center' }}>Connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { this.setState({ tabViewIndex: 2 }) }}
                    >
                        <Text style={{ textAlign: 'center' }}>Recieved</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => { this.setState({ tabViewIndex: 3 }) }}
                    >
                        <Text style={{ textAlign: 'center' }}>Sent</Text>
                    </TouchableOpacity>
                </View>

                <this.tabView />
            </View>
        )
    }
}
