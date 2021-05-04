import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     width:width,
     backgroundColor:'#FFF',
     alignItems:'center',
     flex:1,
     flexDirection:'column'
 },
tabRoW:{ 
    flexDirection:'row', 
    width: width, 
    alignSelf:'baseline', 
    paddingVertical: 2,
    paddingHorizontal:10,
    borderTopWidth:0.75,
    paddingVertical:10,
    borderTopColor:'#e2e2e2',
    backgroundColor:'#FFF' 
},
 tabCoulumn:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}

})



