import React from 'react'
import { View,Modal, ImageBackground,TouchableHighlight,TouchableWithoutFeedback, ScrollView,Alert,  Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import {   Text, TextInput} from 'react-native-paper';
import BarcodeScanner from 'react-native-scan-barcode';
import { connect } from 'react-redux';
import { CAPTURE_BARCODE } from '../redux/constants';

class BarcodeScannerView extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          torchMode: 'off',
          cameraType: 'back',
        };
      }
    
      barcodeReceived=(e)=> {
        console.log('Barcode: ' + e.data);
        console.log('Type: ' + e.type);
        this.props.setBarcode(e.data);
        this.props.navigation.navigate("CreateProduct");
      }
    
      render() {
        return (
          <BarcodeScanner
            onBarCodeRead={this.barcodeReceived}
            style={{ flex: 1 }}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
          />
        );
      }
}
function mapDispatchToProps(dispatch) {
    return {
        
        setBarcode:(value) => dispatch({ type: CAPTURE_BARCODE, value: value })
    }
};

export default connect(null,mapDispatchToProps)(BarcodeScannerView);