/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const GridView = ({item, supplierProd = false,addToCart=f=>f}) => {
  return (
    <View
      style={{
        width: width - 20,
        height: width - 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 20,
      }}>
      {item.is_active == false ? (
        <View
          style={[
            {
              zIndex: 1000,
              position: 'absolute',
              top: 20,
              right: 10,
              backgroundColor: '#e3b8be',

              paddingHorizontal: 10,
              borderRadius: 50,
            },
          ]}>
          <Text style={[{color: '#ba071f'}]}>IN ACTIVE</Text>
        </View>
      ) : (
        <View
          style={[
            {
              top: 20,
              zIndex: 1000,
              position: 'absolute',
              right: 10,
              backgroundColor: '#DAF8EC',

              paddingHorizontal: 10,
              borderRadius: 50,
            },
          ]}>
          <Text style={[{color: '#26C281'}]}>ACTIVE</Text>
        </View>
      )}
      <View style={{height: (width - 20) / 1.3}}>
        {supplierProd ? (
          item.image_url == null || item.image_url === '' ? (
            <Image
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              source={require('../../images/local-business.png')}
            />
          ) : (
            <Image
              style={[
                {
                  flex: 1,
                  width: '100%',
                  height: '100%',

                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  resizeMode: 'cover',
                },
              ]}
              source={{uri: item.image_url}}
            />
          )
        ) : item.image == null ? (
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            source={require('../../images/local-business.png')}
          />
        ) : (
          <Image
            style={[
              {
                flex: 1,
                width: '100%',
                height: '100%',

                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                resizeMode: 'cover',
              },
            ]}
            source={{uri: item.image}}
          />
        )}
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <Text style={{color: '#B1272C', fontWeight: 'bold'}}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 12}}>
            QTY:{' '}
            {supplierProd
              ? item.no_qty_limit
                ? 'NO LIMIT'
                : item.qnty
              : item.no_qty_limit
              ? 'NO LIMIT'
              : item.quantity}
          </Text>

          <Text>
            {item.currency}
            {(item.has_vat ? item.price + item.vat_amount : item.price).toFixed(
              2,
            )}
          </Text>
        </View>
      </View>

      {(!supplierProd &&  item.is_active) && <TouchableOpacity
      onPress={()=>addToCart()}
        style={{
          padding: 10,
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 55,
          right: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        // onPress={()=>item.purchased_quantity > 0 ? _that.counterFun('sub', index):_that.counterFun('add', index)}
        hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}>
        <Image
          style={{width: 25, height: 25}}
          source={
            item.purchased_quantity > 0
              ? require('../../images/shopping-cart-selected.png')
              : require('../../images/shopping-cart-inactive.png')
          }
        />
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  titleViewStyle: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: 100,
  },
  activeView: {
    backgroundColor: '#C9C9C9',
  },
});

export default GridView;
