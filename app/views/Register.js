import React  from "react";
import { View,Dimensions } from "react-native";
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
var { width, height } = Dimensions.get('window');

export default class Register extends React.Component{
constructor(props){
    super(props)
    this.state={
        spinner:true
    }
}    
    render(){
        return(
            <View
            style={{height:height,width:width}}
            >
              <Spinner
                 visible={this.state.spinner}
                 textContent={'Please Wait...'}
                 textStyle={{ color: '#fff' }}
                 color={'#fff'}
                />  
              <WebView 
                source={{ uri: 'https://www.cicod.com/' }}
                onLoadEnd={()=>this.setState({spinner:false})}
              />
            </View>
        )
    }
}