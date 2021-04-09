import React from 'react';
import { Container, Input, InputGroup, List, ListItem } from 'native-base';
import { View, Text, TouchableOpacity, Image, Dimensions, TouchableHighlight, TextInput, Touchable, FlatList, ScrollView, Modal } from 'react-native';
import styles from '../css/BuyersViewCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';


var { width, height } = Dimensions.get('window');
export default class BuyersView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            supendModal:false,
            moreDeatailMOdal:false,
        }
    }
    render() {
        return (

            <View>
                <Header navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={[{}, styles.backRowView]}>
                        <TouchableOpacity>
                            <Icon name="arrow-left" size={25} color={'#929497'} />
                        </TouchableOpacity>
                        <View style={[{}, styles.backRowHeadingView]}>
                            <Text style={[{}, styles.backRowHeadingText]}>SUPPLIERS</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={[{}, styles.productDetailContainerView]}>
                            <Image source={require('../images/bage.png')} />
                            <Text>WellFoods NG</Text>
                            <Text>836439034</Text>
                            <TouchableOpacity
                            onPress={()=>this.setState({supendModal:true})}
                                style={[{}, styles.iconRight]}
                            >
                                <Icon

                                    name="ellipsis-h"
                                    size={25}
                                    color={'#929497'}
                                />
                            </TouchableOpacity>


                        </View>
                        <View style={[{ borderWidth: 0.2, width: width - 30, marginVertical: 10, alignSelf: 'center' }]}></View>
                        <View>

                        </View>
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>No of Products</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>25</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>Orders Created</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>13</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>Values of orders</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>N10,500,000</Text>
                            </View>
                        </View>
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                <Text style={[{}, styles.lightGrayText]}>No of Products</Text>
                                <Text style={[{}, styles.darkGrayBoldText]}>25</Text>
                            </View>
                            <View style={[{}, styles.columnView]}>
                            </View>
                            <View style={[{}, styles.columnView]}>
                            </View>
                        </View>
                        <View style={[{}, styles.productDetailROwView]}>
                            <View style={[{}, styles.columnView]}>
                                <TouchableOpacity
                                    style={[{}, styles.redTouch]}
                                >
                                    <Text style={{ color: '#fff' }}>Update Products</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[{}, styles.columnView]}>
                                <TouchableOpacity
                                    style={[{}, styles.whiteTOuch]}
                                >
                                    <Text style={{ color: '#B1272C' }}>View Products</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <TouchableOpacity 
                        onPress={()=>this.setState({moreDeatailMOdal:true})}
                        style={[{}, styles.moreTOuct]}>
                            <Text style={[{ marginRight: 10 }, styles.lightGrayText]}>More Details</Text>
                            <Icon
                                name="arrow-right"
                                color={'#B1272C'}
                                size={15}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={[{}, styles.searRowView]}>
                        <Icon name="search" color={'#B1272C'} size={20} />
                        <TextInput
                            placeholder="Search order ID, amount, ticket Id"
                        />
                        <TouchableOpacity
                            style={[{}, styles.settingIconView]}
                        >
                            <Image

                                source={require('../images/Order/settingicon.png')} />
                        </TouchableOpacity>

                    </View>
                    <Text style={[{}, styles.historyHeadingText]}>ORDER HISTORY</Text>
                    <ScrollView style={{paddingBottom:50,marginBottom:20}}>
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
                            ]}
                            renderItem={({ item, index, separators }) => (
                                <TouchableHighlight
                                    key={item.key}
                                    onPress={() => this._onPress(item)}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={[{}, styles.flatlistMainContianer]}>
                                        <View style={[{},styles.flatlistMainRow]}>
                                            <Image 
                                            source={[{},styles.listImage]}
                                            source={require('../images/bage.png')} />
                                            <View style={{flexDirection:'column'}}>
                                              <Text style={[{},styles.darkGrayBoldText]}>103943535</Text>
                                              <Text style={[{}, styles.lightGrayText]}>Order contains 4 products</Text>
                                            </View>
                                            <View style={[{},styles.actionContainer]}>
                                                <Text style={[{},styles.darkGrayBoldText]}>N1,500,000</Text>
                                                <View style={[{},styles.greenView]}>
                                                    <Text style={[{},styles.greenText]}>PAID</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={[{}, styles.lightGrayText]}>2017-01-30 / 10:45 AM</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </ScrollView>
                </ScrollView>
                <Modal
                visible={this.state.supendModal}

                transparent={true}
                >
                    <TouchableHighlight
                    onPress={()=>this.setState({supendModal:false})}
                    >
                    <View style={[{},styles.modalBackGround]}>
                      <TouchableOpacity 
                      onPress={()=>this.setState({supendModal:false})}
                      style={[{},styles.suspendTouch]}>
                          <Image source={require('../images/ban.png')} style={[{},styles.banImage]} />
                          <Text style={{}}>Suspend</Text>
                      </TouchableOpacity>
                    </View>
                    </TouchableHighlight>
                    
                </Modal>
                {/* MoreDetail Modal */}
                <Modal
                  visible={this.state.moreDeatailMOdal}
                  transparent={true}
                >
                 <View style={[{},styles.modalBackGround]}>
                   <View style={[{},styles.moreDetailModalContentContainer]}>
                      <View style={[{},styles.moreDeatialModalHeadingRow]}>
                          <Text style={[{},styles.moreDetailHeadingText]}>MORE DETAIL</Text>
                          <TouchableOpacity
                          onPress={()=>this.setState({moreDeatailMOdal:false})}
                          style={[{},styles.moreDetailModalCloseTouch]}
                          >
                          <Icon name="close" size={20}/>
                          </TouchableOpacity>
                      </View>
                      <View style={[{},styles.moreDetailModalContentView]}>
                          <View style={[{},styles.moreDetailModalContentRow]}>
                              <Text style={[{},styles.moreDetailModalContentRowLable]}>Email: </Text>
                              <Text style={[{},styles.moreDetailModalContentRowInfo]}>j.joghnson@gmail.com</Text>
                          </View>
                          <View style={[{},styles.moreDetailModalContentRow]}>
                              <Text style={[{},styles.moreDetailModalContentRowLable]}>Phone: </Text>
                              <Text style={[{},styles.moreDetailModalContentRowInfo]}>08123456789</Text>
                          </View>
                          <View style={[{},styles.moreDetailModalContentRow]}>
                              <Text style={[{},styles.moreDetailModalContentRowLable]}>Address: </Text>
                              <Text style={[{},styles.moreDetailModalContentRowInfo]}>45b,45b Admiralty way, Lekki Phase 1,</Text>
                          </View>
                          <View style={[{},styles.moreDetailModalContentRow]}>
                              <Text style={[{},styles.moreDetailModalContentRowLable]}>Area: </Text>
                              <Text style={[{},styles.moreDetailModalContentRowInfo]}>Eti Osa</Text>
                          </View>
                          <View style={[{},styles.moreDetailModalContentRow]}>
                              <Text style={[{},styles.moreDetailModalContentRowLable]}>State: </Text>
                              <Text style={[{},styles.moreDetailModalContentRowInfo]}>Lagos</Text>
                          </View>
                          <View style={[{},styles.moreDetailModalContentRow]}>
                              <Text style={[{},styles.moreDetailModalContentRowLable]}>Country: </Text>
                              <Text style={[{},styles.moreDetailModalContentRowInfo]}>Nigeria</Text>
                          </View>
                      </View>
                   </View>
                 </View>
                </Modal>
            </View>
        );

    }
}