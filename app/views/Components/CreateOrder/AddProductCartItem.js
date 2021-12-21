import React from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import styles from '../../../css/AddProductCss';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const {width, height} = Dimensions.get('screen');

const AddProductCartItem = ({
  isValueChain = true,
  item,
  counterFunAdd,
  counterFunSub,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          marginBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#DCDCDC',
          paddingBottom: 7,
        },
      ]}>
      <View style={[{}, styles.OrderDetailDataCOntainer]}>
        <View style={[{}, styles.OrderDetailDataCOntainerRow]}>
          <View>
            <Text style={[{}, styles.OrderDetailDataCOntainerHeadingText]}>
              {item.name}{' '}
            </Text>
            <Text style={[styles.OrderDetailHeadingRowText, {fontSize: 11}]}>
              {item.name}{' '}
              {item.no_qty_limit
                ? 'Qty: No Limit'
                : '| Qty: ' + (isValueChain ? item.qnty : item.quantity)}
            </Text>
          </View>
        </View>
      </View>
      <View style={[{}, styles.orderDetailAmmountRow]}>
        <View style={[{}, styles.orderDetailAmmountColumn]}>
          <Text style={[{}, styles.orderDetailAmmountColumnGaryBolText]}>
            {item.currency} {item.price}
          </Text>
        </View>
        {item.is_active ? (
          <View style={[{}, styles.orderDetailAmmountColumn]}>
            <View
              style={[styles.OrderDetailDataCOntainerCounterView, {right: 20}]}>
              <TouchableOpacity
                onPress={counterFunSub}
                style={[{}, styles.iconView]}>
                <Icon name="minus" />
              </TouchableOpacity>
              <View style={[{}, styles.iconView]}>
                <Text>{item.purchased_quantity}</Text>
              </View>
              <TouchableOpacity
                style={[{}, styles.iconView]}
                onPress={counterFunAdd}>
                <Icon name="plus" color="#B1272C" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#FFF4F4',
              justifyContent: 'center',
              right: 10,
              borderRadius: 60,
              width: width / 6,
              alignItems: 'center',
            }}>
            <Text style={{color: '#B1272C', fontSize: 7}}>INACTIVE</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AddProductCartItem;
