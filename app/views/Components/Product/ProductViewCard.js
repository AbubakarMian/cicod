import { View, Dimensions, Image, Platform, Alert,TouchableOpacity} from 'react-native'
import React from 'react';
import { Text, TextInput, Modal  } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/ProductViewCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const ProductViewCard=()=>(
<>
    <View style={[{}, styles.productDeatailContainer]}>
    <View style={[{}, styles.productDeatailHeaderRow]}>

            {(_that.state.prodDetail.is_active == true) ?
            <View style={[{}, styles.aciveView]}>
                <Text style={{ color: '#26C281' }}>ACTIVE</Text>
                </View>
                :
                <View style={[{}, styles.inaciveView]}>
                <Text style={{ color: '#B1272C' }}>IN ACTIVE</Text>
                </View>
            }
        <Image
            style={[{ alignSelf: 'baseline',width:30,height:30 }]}
            
            source={require('../images/ticket.png')} />
      <TouchableOpacity
    style={[{}, styles.settingIcon]}
    onPress={() => _that.setState({ supendModal: true })}
      >
            <Icon
                
                size={25}
                color={'#929497'}
                name="ellipsis-h" />
        </TouchableOpacity>
    </View>
  
    <Text style={[{color:'#4E4D4D',textAlign:'center'},fontStyles.bold18]}>{_that.state.prodDetail.name + ' ' + _that.state.prodDetail.quantity}</Text>
    <Text style={[{color:'#929497',textAlign:'center'}, fontStyles.normal12]}>{_that.state.prodDetail.code}</Text>
    <View style={{ borderBottomWidth: 1, borderColor: '#E6E6E6', marginVertical: 10 }}></View>
    <View style={[{}, styles.descRow]}>
        <View style={[{}, styles.descColumn]}>
            <Text style={[{}, styles.lightGrayTex]}>Quantity</Text>
            <Text style={[{}, styles.darkGarayText]}>{_that.state.prodDetail.quantity}</Text>
        </View>
        <View style={[{}, styles.descColumn]}>
            <Text style={[{}, styles.lightGrayTex]}>Category</Text>
            <Text style={[{}, styles.darkGarayText]}>{_that.state.prodDetail.category}</Text>
        </View>
        <View style={[{}, styles.descColumn]}>
            <Text style={[{}, styles.lightGrayTex]}>Price</Text>
            <Text style={[{}, styles.darkGarayText]}>{_that.state.prodDetail.currency}{_that.state.prodDetail.price}</Text>

        </View>
    </View>
    <View style={[{}, styles.descRow]}>
        <View style={[{}, styles.descColumn]}>
            <Text style={[{}, styles.lightGrayTex]}>Reservation (Days)</Text>
            <Text style={[{}, styles.darkGarayText]}>0</Text>
        </View>
        <View style={[{}, styles.descColumn]}>
            <Text style={[{}, styles.lightGrayTex]}>Created By</Text>
            <Text style={[{}, styles.darkGarayText]}>{_that.state.prodDetail.created_by} </Text>
        </View>
        <View style={[{}, styles.descColumn]}>
            <Text style={[{}, styles.lightGrayTex]}>Created Date</Text>
            <Text style={[{}, styles.darkGarayText]}>{_that.state.prodDetail.date_created}</Text>
            {/* <Text style={[{}, styles.darkGarayText]}>10:30 AM</Text> */}

        </View>

    </View>
    <View style={[{}, styles.descRow]}>
        <View style={[{}, styles.descColumn]}>
            <Text style={[{}, styles.lightGrayTex]}>Updated Date</Text>
            <Text style={[{}, styles.darkGarayText]}>{_that.state.prodDetail.date_updated ||'-'}</Text>
        </View>
        <View style={[{}, styles.descColumn]}>
           
        </View>
        <View style={[{}, styles.descColumn]}>
            

        </View>

    </View>

</View>

<Text style={[{}, styles.imageHeadingText]}>IMAGE</Text>
                <TouchableOpacity
                    onPress={() => _that.setState({ productImageModal: true })}
                >
                    <Image
                        // style={[{}, styles.productImage]}
                        style={{height:60,width:60,marginLeft:10}}
                        // source={require('../images/juice.png')} />
                        source={{ uri: _that.state.prodDetail.image }} />
                </TouchableOpacity>
                <Modal
                    visible={_that.state.productImageModal}
                    transparent={true}
                >
                    <View style={[{}, styles.modalBackGroung]}>
                        <TouchableOpacity
                            onPress={() => _that.setState({ productImageModal: false })}
                            style={[{}, styles.modalCloseTouch]}
                        >
                            <Icon name="close"
                                color={'#fff'}
                                size={25}
                            />
                            <Text style={{ color: '#fff', marginLeft: 10 }}>Close</Text>
                        </TouchableOpacity>

                        <Image
                            style={{ height: height / 2, width: width / 1.3 }}
                            // source={require('../images/juice.png')}
                            
                            source={{ uri: _that.state.prodDetail.image }}
                        />
                    </View>

                </Modal>
            

</>
)