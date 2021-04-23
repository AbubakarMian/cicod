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
        
        width:width-10,
        alignSelf:'center',
        paddingHorizontal:5,
        paddingVertical:10
    },
    flatCardView:{
        paddingHorizontal:5,
        paddingVertical:10,
        borderBottomColor:'#e2e2e2',
        marginTop:2,
        borderBottomWidth:1,
        backgroundColor:'#fff',
        borderRadius:5,
        flexDirection:'row',
        paddingHorizontal:10,
    },
    detailContentView:{
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
        marginTop:5,
        paddingVertical:20,
        alignItems:'center',
        flexDirection:'column',
    },
    customerNameText:{
        color:'#4E4D4D',
        fontWeight:'bold',
    },
    marchentRow:{
        flexDirection:'row',
        width:width-20,
        paddingHorizontal:10,
        paddingVertical:5,
    },
    marchentlableView:{
        flex:1
    },
    marchentlableText:{
        color:'#929497',
    },
    marchentInfoView:{
        flex:1,
        alignItems:'flex-end'
    },
    marchentInfoText:{
        color:'#4E4D4D',
        fontWeight:'bold'
    },
    connectBtn:{
        backgroundColor:'#B1272C',
        marginVertical:15,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width:width/1.5,
        paddingVertical:10,
        borderRadius:100
    }

})



