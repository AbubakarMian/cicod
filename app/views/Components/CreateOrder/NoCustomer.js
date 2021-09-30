import React from 'react'
import {View,Text} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from '../../../css/CreateOrderCss';
const NoCustomer=()=>(
    <View style={[{}, styles.customerContainerView]}>
        <Icon name="user-circle" size={50} color="#D8D8D8" />
        <Text style={[{}, styles.customerContainerheading]}>No Customer added</Text>
        <Text style={[{}, styles.customerContainerText]}>add customer</Text>
    </View>
)

export default NoCustomer;