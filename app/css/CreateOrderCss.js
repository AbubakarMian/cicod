import React from "react";

import { View, Text, Dimensions, StyleSheet, ImageBackground } from "react-native";


var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        height: height,
        width: width,
        backgroundColor: '#F0F0F0',
        flex: 1,
        flexDirection: 'column'
    },
    backHeaderRowView:{
        flexDirection:'row',
        width:width-20,
        marginHorizontal:10,
        paddingVertical:5,
        alignItems:'center',
        position:'relative'
    },
    backHeadingView:{
        marginHorizontal:10
    },
    backHeadingText:{
        color:'#2F2E7C',
        fontWeight:'bold'
    },

    backHeadingCloseView:{
        position:'absolute',
        right:10,
        flexDirection:'row'
    },
    backHeadingCloseText:{
        color:'#707070',
        marginLeft:5
    },
    customerContainerView:{
        backgroundColor:'#fff',
        paddingVertical:20,
        width:width-20,
        alignSelf:'center',
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        
    },
    customerContainerheading:{
        color:'#D8D8D8',
        fontWeight:'bold'
    },
    customerContainerhead:{
        position:'absolute',
        top:10,
        left:5,
        color:'#D8D8D8'
    },
    customerContaineraddBtnView:{
       backgroundColor:'#B1272C',
       paddingHorizontal:5,
       paddingVertical:5,
       flexDirection:'row',
       borderRadius:50,
       justifyContent:'center',
       alignItems:'center',
       position:'absolute',
       right:10,
       top:10
    },
    customerContaineraddBtnText:{
        color:'#fff',
        marginHorizontal:5

    },
    customerContainerText:{
        color:'#aaa',
    },

    customerContaineraddProductView:{
        width:width/1.5,
        borderLeftWidth:1,
        borderLeftColor:'#929497',
        paddingVertical:10,
        alignSelf:'flex-end',
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    customerContaineraddProductText:{
        marginHorizontal:10,
        color:'#4E4D4D',
        fontWeight:'bold'
    },
    OrderDetailContainer:{
        backgroundColor:'#fff',
        paddingVertical:30,
        width:width-20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    OrderDetailContainerHeadingText:{
     color:'#D8D8D8',
     fontWeight:'bold'
    },
    OrderDetailContainerText:{
        color:'#D8D8D8',
        fontSize:10
    },

    diliveryTypeContainerView:{
        backgroundColor:'#fff',
        paddingVertical:30,
        width:width-20,
        marginTop:10,
        alignSelf:'center',
    },
    radioFormView:{
        paddingVertical:10,
        // borderTopWidth:1,
        // borderTopColor:'#D8D8D8',
        // borderBottomWidth:1,
        // borderBottomColor:'#D8D8D8',
        marginTop:10,
        marginHorizontal:10
    },
  
    smailGrayText:{
        color:'#D8D8D8',
        marginLeft:20
    },
    paymentContainerView:{
      backgroundColor:'#fff',
      paddingVertical:10,
      marginTop:10,
      width:width-20,
      alignSelf:'center',
      paddingHorizontal:10
    },
    paymentHeadingText:{
        color:'#D8D8D8',

    },
    subtotleContainer:{
        width:width-20,
        alignSelf:'center',
        marginTop:10,
        paddingHorizontal:10,
        backgroundColor:'#fff',
    },
    subtotleContainerHeading:{
        color:'#929497',
        fontWeight:'bold'
    },
    subTotleRowView:{
        flexDirection:'row',
        width:width-20,
        alignSelf:'center',
        marginTop:10,
        backgroundColor:'#fff',
        paddingVertical:10,
        paddingHorizontal:10
    },
    subTotleColumn1View:{
        flex:1,

    },
    subTotleColumn1Text:{
        color:'#929497',
        fontWeight:'bold'  
    },
    subTotleColumn2Text:{
        color:'#929497',  
    },
    subTotleColumn2View:{
        flex:1,
        alignItems:'flex-end'
        
    },
    btnContinuueView:{
        backgroundColor:'#B1272C',
        borderRadius:50,
        width:width-50,
        paddingVertical:15,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        alignSelf:'center'
    }
    


   
})



