import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/CustomerCss'
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import Header from './Header'
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
            <View style={[{}, styles.mainView]}>
                <Header/>
                <View style={[{}, styles.headerRow]}>
                    <View style={[{}, styles.headerRowBackiconView]}>
                    <Icon name="arrow-left" size={25} color="#929497" />
                    </View>
                    <View>
                        <Text style={[{}, styles.headerRowText]}>customers</Text>
                    </View>
                    <View style={[{}, styles.headerRowPlusiconView]}>
                        <Image
                            source={require('../images/products/circlePlus.png')}
                        />
                    </View>
                </View>
                <View style={[{}, styles.searchBoxView]}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <TextInput
                        placeholder="Johnson James"
                    />
                </View>
                <View style={[{}, styles.searchBoxDividerView]}></View>
                <ScrollView>
                    <FlatList
                        data={[
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
                            { title: 'Johnson James', key: 'item1', qty: 'j.joghnson@gmail.com . 08123456789', brand: 'Pure Juice ' },
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
                                onPress={()=>this.props.navigation.navigate('CustomersDetal')}//() => this._onPress(item)
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={[{ flexDirection: 'row' }]}>
                                        <Image
                                            style={[{ height: 50, width: 50, marginRight:5 }]}
                                            source={require('../images/customer/usericon.png')}
                                        />
                                    </View>
                                    <View style={{ position: 'relative', flex: 3 }}>
                                        <Text>{item.title}</Text>
                                        <View style={{ flexDirection: 'row', }}>

                                            <Text style={{fontSize:10,color:'#929497'}}>{item.qty}</Text>
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
