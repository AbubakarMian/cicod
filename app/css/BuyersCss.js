import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
    mainView: {
        height: height,
        width: width,
        backgroundColor: '#F0F0F0',
        flex: 1,
        flexDirection: 'column'
    },
    tabView:{
        backgroundColor:'#fff',
        paddingVertical:10,
        width:width-20,
        display:'flex',
        alignSelf:'center',
        paddingHorizontal:10,
        flexDirection:'row'
    },
    contentView:{
        backgroundColor:'#fff',
        marginTop:20,
        paddingVertical:30,
        width:width-20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    searchView:{
        borderWidth:1,
        borderColor:'#D8DCDE',
        width:width-50,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    deatilcontentView:{
        width:width-20,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20
    },
    tabView:{
        backgroundColor:'#fff',
        paddingVertical:10,
        width:width-20,
        display:'flex',
        alignSelf:'center',
        paddingHorizontal:10,
        flexDirection:'row'
    },
    contentView:{
        backgroundColor:'#fff',
        marginTop:20,
        paddingVertical:30,
        width:width-20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    searchView:{
        borderWidth:1,
        borderColor:'#D8DCDE',
        width:width-50,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    deatilcontentView:{
        width:width-20,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20
    },
    contentView:{
        backgroundColor:'#fff',
        marginTop:20,
        paddingVertical:30,
        width:width-20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    searchView:{
        borderWidth:1,
        borderColor:'#D8DCDE',
        width:width-50,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    deatilcontentView:{
        width:width-20,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20
    },
    searchContainer:{
        backgroundColor:'#fff',
        
        paddingVertical:10,
        marginTop:10,
        width:width-20,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center'
    },
    recievedList:{
        
        width:width-20,
        alignSelf:'center',
        paddingHorizontal:5,
        paddingVertical:10
    },
    flatCardView:{
       width:width,
       justifyContent:'center',
       alignItems:'center'
    },
    cardRow:{
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingVertical:10,
        width:width-20,
        alignSelf:'center',
        marginBottom:1,
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:5,
        position:'relative',
    },
    cardContentView:{
        flexDirection:'column',
        paddingLeft:5,
        paddingVertical:10,
    },
    cardContentDarkText:{
       color:'#4E4D4D',
       fontWeight:'bold',
    },
    cardActionView:{
        flexDirection:'column',
        position:'absolute',
        right:5,
        alignItems:'center'
    },
    cardActionTouch:{
     padding:2,
    },
    statusText:{
       color:'#26C281',
       backgroundColor:'#DAF8EC',
       borderRadius:100,
       paddingHorizontal:10,
       
       
    },
    statusPendingText:{
       color:'#DC143C',
       backgroundColor:'#FA8072',
       borderRadius:100,
       paddingHorizontal:10,
       
       
    },
    lightGrayText:{
        color:'#929497',
        fontSize:10,
    }

 
})



