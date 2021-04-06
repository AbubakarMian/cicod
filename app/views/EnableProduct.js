import React from 'react'
import { View, ImageBackground, TouchableHighlight, Text, TextInput, FlatList, Dimensions, Image, Platform, TouchableOpacity, Modal, } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import styles from '../css/EnableProductCss';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class EnableProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmModal: false,
            complainModal:true,
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
                        <Text style={[{}, styles.backRowHeadingText]}>CONNECT - ENABLE MERCHANT</Text>
                    </View>
                </View>
                <Text style={[{}, styles.headingDescText]}>
                    Select Product category or products you want Merchant to
                    have access to
                </Text>
                <View style={[{}, styles.redTextContainerView]}>
                    <View style={[{}, styles.inputRedBoxView]}>
                        <Image source={require('../images/bage.png')} />
                        <Text style={[{}, styles.redBoxText]}>KNGS CROWN</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <View>
                        <TextInput
                            placeholder="Search product or product category"
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ProductFilter')}
                        >
                            <Image
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[{}, styles.selectedSmallHeadingView]}>
                    <Text style={[{}, styles.selectedSmallHeadingBold]}>10</Text>
                    <Text style={[{}, styles.selectedSmallHeadingText]}>product selected</Text>
                </View>
                <ScrollView>
                    <View style={[{}, styles.productHeadingView]}>
                        <Text style={[{}, styles.productHeadingText]}>RUDY JUICE</Text>
                        <View style={[{}, styles.greenCheckView]}>
                            <Icon name="check-circle" color={'#26C281'} size={25} />
                        </View>
                    </View>
                    <View>
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



                            ]}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    // onPress={() => this._onPress(item)}
                                    onPress={() => (console.log("item item item:", item))}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={[{}, styles.flatelistContainerView]}>
                                        <Image source={require('../images/ticket.png')} />
                                        <Text>BIG APPLE RODY FRUTTA 500ML</Text>
                                        <View style={[{}, styles.greenCheckView]}>
                                            <Icon name="check-circle" color={'#26C281'} size={25} />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                    <View style={[{}, styles.productHeadingView]}>
                        <Text style={[{}, styles.productHeadingText]}>RUDY JUICE</Text>
                        <View style={[{}, styles.greenCheckView]}>
                            <Icon name="check-circle" color={'#E6E6E6'} size={25} />
                        </View>
                    </View>
                    <View>
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
                                { title: 'Title Text', key: 'item5' },
                                { title: 'Title Text', key: 'item6' },
                                { title: 'Title Text', key: 'item7' },
                                { title: 'Title Text', key: 'item8' },



                            ]}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    // onPress={() => this._onPress(item)}
                                    onPress={() => (console.log("item item item:", item))}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={[{}, styles.flatelistContainerView]}>
                                        <Image source={require('../images/ticket.png')} />
                                        <Text>BIG APPLE RODY FRUTTA 500ML</Text>
                                        <View style={[{}, styles.greenCheckView]}>
                                            <Icon name="check-circle" color={'#E6E6E6'} size={25} />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                    
                </ScrollView>
                <TouchableOpacity
                        onPress={() => this.setState({ confirmModal: true })}
                        style={[{}, styles.redTouchModal]}>
                        <Text style={{ color: '#fff' }}>Enable Products</Text>
                    </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={this.state.confirmModal}
                    dismiss={() => this.setState({ confirmModal: false })}
                >
                    <TouchableHighlight
                        onPress={() => this.setState({ confirmModal: false })}
                    >
                        <View style={[{}, styles.modalBackgroundCOntainerView]}>
                            <View style={[{}, styles.modalContentCOntainerView]}>
                                <Image source={require('../images/bluequesmark.png')} />
                                <Text>You are about to give </Text>
                                <View style={[{}, styles.modalTextRow]}>
                                    <Text style={[{}, styles.modalBoldText]}>KNGS CROWN </Text>
                                    <Text> access to </Text>
                                    <Text style={[{}, styles.modalBoldText]}>10</Text>
                                </View>
                                <View style={[{}, styles.modalTextRow]}>
                                    <Text style={[{}, styles.modalBoldText]}> products  </Text>
                                    <Text>in 3 product category</Text>
                                </View>
                                <TouchableHighlight
                                    style={[{backgroundColor:'#B1272C',}, styles.redTouchModal]}
                                >
                                    <Text style={{color:'#fff'}}>Confirm</Text>
                                </TouchableHighlight>
                                <View style={{borderWidth:1,width:width-50,borderColor:'#aaa'}}></View>
                                <TouchableHighlight
                                onPress={()=>this.setState({confirmModal:false})}
                                    style={[{}, styles.grayTouchModal]}
                                >
                                    <Text style={{}}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>
                <Modal
                    transparent={true}
                    visible={this.state.complainModal}
                    dismiss={() => this.setState({ complainModal: false })}
                >
                    <TouchableHighlight
                        onPress={() => this.setState({ complainModal: false })}
                    >
                        <View style={[{}, styles.modalBackgroundCOntainerView]}>
                            <View style={[{}, styles.modalContentCOntainerView]}>
                                <Image source={require('../images/redSquireCross.png')} />
                                <Text>You are about to give </Text>
                                <View style={[{}, styles.modalTextRow]}>
                                   
                                    <Text style={[{}, styles.modalBoldText]}> KNGS CROWN  </Text>
                                    <Text >request</Text>
                                </View>
                                <View style={[{},styles.complaintHeadingModalView]}>
                                 <Text style={[{},styles.complaintHeadingModalText]}>Reason</Text>
                                 <TextInput 
                                 placeholder=""
                                 height={height/5}
                                 />
                                </View>
                                <TouchableHighlight
                                    style={[{backgroundColor:'#B1272C',}, styles.redTouchModal]}
                                >
                                    <Text style={{color:'#fff'}}>Decline</Text>
                                </TouchableHighlight>
                                <View style={{borderWidth:1,width:width-50,borderColor:'#aaa'}}></View>
                                <TouchableHighlight
                                onPress={()=>this.setState({confirmModal:false})}
                                    style={[{}, styles.grayTouchModal]}
                                >
                                    <Text style={{}}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>
            </View>
        )
    }
}
