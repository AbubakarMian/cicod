import React from "react"
import {View,Text} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from '../../../css/CreateOrderCss';
const CustomerDetail=({name,email,phone,isSupplier=false,customer={}})=>(
    <View style={[{}, styles.userDEtailCOntainer]}>
        <View style={[{}, styles.userDEtailCOntainerIconView]}>
            <Icon
                name="user-circle"
                color="#D8D8D8"
                size={20}
            />
            <Text style={[{}, styles.userDEtailCOntainerText]}>{name}</Text>
        </View>
        <View style={[{}, styles.userDEtailCOntainerIconView]}>
            <Text style={[{}, styles.usetDetailLableText]}>Email: </Text>
            <Text style={[{}, styles.usetDetailInfoText]}>{email}</Text>
        </View>
        <View style={[{}, styles.userDEtailCOntainerIconView]}>
            <Text style={[{}, styles.usetDetailLableText]}>Phone: </Text>
            <Text style={[{}, styles.usetDetailInfoText]}>{phone}</Text>
        </View>
        {isSupplier &&(
            <>
            <View style={[{}, styles.userDEtailCOntainerIconView]}>
            <Text style={[{}, styles.usetDetailLableText]}>Available Bal.: </Text>
            <Text style={[{}, styles.usetDetailInfoText]}>{customer.avail_balance==0?'0.0':customer.avail_balance}</Text>
        </View>
        {/* <View style={[{}, styles.userDEtailCOntainerIconView]}>
            <Text style={[{}, styles.usetDetailLableText]}>Minimum Spend: </Text>
            <Text style={[{}, styles.usetDetailInfoText]}>{customer.minimum_spend==0?'-':customer.minimum_spend}</Text>
        </View> */}
            </>
        )}
        {/* <View style={[{}, styles.downIconView]}>
            <Icon name="angle-down"
                size={20}
                color={'#929497'} />
        </View> */}
    </View>
)

export default CustomerDetail;