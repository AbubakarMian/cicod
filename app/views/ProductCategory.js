import React from 'react'
import { View, ScrollView, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, } from 'react-native'
import { Text, TextInput, Alert } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/ProductCategoryCss'
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class ProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            searchPress: 1,
            updateProductModal: false
        }

    }

    render() {

        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>PRODUCT CATEGORY</Text>
                    </View>
                    <TouchableOpacity
                        style={[{}, styles.plusTouch]}
                    >
                        <Image source={require('../images/circlePlus.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', height: 50, paddingHorizontal: 10, borderRadius: 5, width: width - 80 }}>
                        <Image
                            source={require('../images/products/searchicon.png')}
                        />

                        <TextInput
                            label="Search a category"
                            // selectionColor={'#fff'}

                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            // onChangeText={text => this.setState({ search_product: text })}
                            // onSubmitEditing={() => this.search()}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() => this.props.navigation.navigate('Filter')}
                    >
                        <Image
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View>
                {/* <View style={[{}, styles.searchRow]}>
                    <Image source={require('../images/products/searchicon.png')} />
                    <TextInput
                        label="Search a category"
                        style={{ backgroundColor: 'transparent', }}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Filter')}

                        style={[{}, styles.settingTouch]}
                    >
                        <Image source={require('../images/Order/settingicon.png')} />
                    </TouchableOpacity>
                </View> */}
                <View style={{borderBottomWidth:1,width:width-20,alignSelf:'center',borderBottomColor:'#E6E6E6',marginVertical:10}}></View>
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
                        { title: 'Title Text', key: 'item2' },
                        { title: 'Title Text', key: 'item3' },
                        { title: 'Title Text', key: 'item4' },
                        { title: 'Title Text', key: 'item1' },
                        { title: 'Title Text', key: 'item2' },
                        { title: 'Title Text', key: 'item3' },
                        { title: 'Title Text', key: 'item4' },
                        { title: 'Title Text', key: 'item1' },
                        { title: 'Title Text', key: 'item2' },
                        { title: 'Title Text', key: 'item3' },
                        { title: 'Title Text', key: 'item4' },
                        { title: 'Title Text', key: 'item1' },
                        { title: 'Title Text', key: 'item2' },
                        { title: 'Title Text', key: 'item3' },
                        { title: 'Title Text', key: 'item4' },


                    ]}
                    renderItem={({ item, index, separators }) => (
                        // <TouchableOpacity
                        //     key={item.key}
                        //     // onPress={() => this._onPress(item)}
                        //     onShowUnderlay={separators.highlight}
                        //     onHideUnderlay={separators.unhighlight}>
                            <View style={[{}, styles.listContainer]}>
                                <View style={[{flex:1,justifyContent:'center',alignItems:'center'}, styles.listImageView]}>
                                    <Image source={require('../images/product_cat_icon.png')} />
                                </View>
                                <View style={[{flex:6}, styles.listDescView]}>
                                    <Text style={[{}, styles.listDescBoldText]}>Pure Juice</Text>
                                    <Text style={[{}, styles.listDescNormalText]}>This is a description of that hold all pure juice.</Text>
                                </View>
                                <View style={[{flex:2,justifyContent:'flex-end',alignItems:'flex-end'}, styles.listActionView]}>
                                    <TouchableOpacity
                                        style={[{alignSelf:'flex-end',marginHorizontal:5}, styles.dotsTouch]}
                                    >
                                        <Icon name="ellipsis-h"
                                            color="#929497"
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[{alignSelf:'flex-end'}, styles.actionText]}>ACTIVE</Text>
                                </View>
                            </View>
                        // </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}
