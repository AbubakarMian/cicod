import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 mainView:{
     height:height,
     width:width,
     backgroundColor:'#F0F0F0',
     flex:1,
     alignItems:'center',
     flexDirection:'column'
 },
 headerRow:{
     flexDirection:'row',
     width:width-20,
     position:'relative',
     paddingVertical:10,
     alignItems:'center'
 },
 headerRowBackiconView:{
     marginRight:30
 },
 headerRowText:{
     color:'#2F2E7C',
     fontWeight:'bold',
     fontSize:20,
     marginLeft:10
 },
 headerRowPlusiconView:{
     position:'absolute',
     right:5
 },
 searchBoxView:{
     width:width-20,
     justifyContent:'flex-start',
     backgroundColor:'#fff',
     paddingHorizontal:10,
     paddingVertical:10,
     flexDirection:'row',
     alignItems:'center'
 },
 searchBoxDividerView:{
     borderBottomColor:'#E6E6E6',
    
     marginVertical:10,
 },
 mainContentView:{
     backgroundColor:'#fff',
     width:width-20,
     marginTop:10,
     padding:30
 },
 mainContentUserImageView:{
     alignSelf:'center'
 },
 mainContentUserInfoView:{
     flexDirection:'row'
 },
 mainContentUserInfoHeading:{
     fontWeight:'bold',
     color:'#929497',
 },
 mainContentUserInfo:{
     fontSize:10,
     color:'#929497',
 },
 balanceView:{
     borderTopColor:'#E6E6E6',
     borderTopWidth:2,
     width:width-20
 },
 balanceRowView:{
     flexDirection:'row',
     backgroundColor:'#fff',
     paddingTop:10,
     paddingHorizontal:10
 },
 balanceColumn1Text:{
     color:'#929497'

 },
 balanceColumn2Text:{
    fontWeight:'bold'

},
 balanceColumn1View:{
    flex:1,

},

 
 balanceColumn2View:{
    flex:1,
    alignItems:'flex-end'

}

})



