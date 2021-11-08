import React from 'react';
import {View,Text,FlatList,Platform,Dimensions,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from '../../../css/CreateOrderCss';
const { width, height } = Dimensions.get('window')

const OrderDetail=({carts,counterFun,removeProduct,currency})=>(
     <FlatList
                                    data={carts}
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
                                        <View style={[{ flexDirection: 'column' }]}>
                                            <View style={[{}, styles.OrderDetailDataCOntainer]}>
                                                <View style={[{}, styles.OrderDetailDataCOntainerRow]}>
                                                    <View>
                                                        <Text style={[{width:width/1.5}, styles.OrderDetailDataCOntainerHeadingText]}>{item.name}  {item.quantity} PACK</Text>
                                                        <Text style={[{}, styles.OrderDetailHeadingRowText]}>{item.category}</Text>
                                                    </View>

                                                    <View style={[{}, styles.OrderDetailDataCOntainerCounterView]}>
                                                        <TouchableOpacity style={[{}, styles.iconView]}
                                                            onPress={() => counterFun('sub', index)}
                                                        >
                                                            <Icon name="minus" />
                                                        </TouchableOpacity>
                                                        <View style={[{}, styles.iconView]}>
                                                            <Text>{item.purchased_quantity}</Text>
                                                        </View>
                                                        <TouchableOpacity style={[{}, styles.iconView]}
                                                            onPress={() => counterFun('add', index)}
                                                        >
                                                            <Icon name="plus"
                                                                color="#B1272C"
                                                            />
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>

                                            </View>
                                            <View style={[{}, styles.orderDetailAmmountRow]}>
                                                <View style={[{}, styles.orderDetailAmmountColumn]}>
                                                    <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>
                                                        {currency + " " + item.price}</Text>
                                                </View>
                                                <View style={[{}, styles.orderDetailAmmountColumn]}>
                                                    <TouchableOpacity
                                                        style={[{ alignSelf: 'flex-end' }]}
                                                        onPress={() => removeProduct(index)}
                                                    >
                                                        <Text style={[{}, styles.orderDetailAmmountColumnRedText]}>Remove</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
)

export default OrderDetail;