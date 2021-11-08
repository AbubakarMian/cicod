import React from "react"
import {View,Text,Image,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const { width, height } = Dimensions.get('window')
import styles from '../../../css/CreateOrderCss';

const NoOrderDetail=()=>(
    <View style={[{}, styles.cartSlashView]}>
        <Image
            style={{ height: width / 3, width: width / 3 }}
            source={require('../../../images/cartSlash.png')}
        />
        <Text style={[{}, styles.cartSlashheadingText]}>No product added</Text>
        <Text style={[{}, styles.cartSlashNormalText]}>Add a product</Text>
    </View>
)

export default NoOrderDetail;