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
    heading:{
        color:'#929497',
        fontWeight:'bold',
        marginHorizontal:15
    },
    searchContainer:{
        backgroundColor:'#fff',
        paddingHorizontal:10,
        alignSelf:'center',
        width:width-20,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#e2e2e2',
        borderBottomWidth:1,
        position:'relative',
        width:width-20,
    },
    contentView:{
     justifyContent:'center',
     alignItems:'center',
     width:width-20,
     alignSelf:'center',
     minHeight:height/2
    },
    contentViewHeadingText:{
        fontWeight:'bold',
        color:'#929497',
        marginTop:10
    },
    contentViewDescText:{
        color:'#929497',
        fontSize:12
    },
    searchByCatCOntainer:{
        marginTop:10,
        backgroundColor:'#fff',
        width:width-20,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        position:'relative'
    },
    searchByCatCOntainerIconView:{
        position:'absolute',
        right:10
    },
    OrderDetailContainer:{
        backgroundColor:'#fff',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:30,
        width:width-20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    OrderDetailHeadingRow:{
        position:'absolute',
        top:5,
        width:width,
        left:5,
        flexDirection:'row'
    },
    OrderDetailHeadingRowText:{
        color:'#D8D8D8'
    },
    OrderDetailClearTouc:{
        right:10,
        top:5,
        position:'absolute'
    },
    OrderDetailNotificationText:{
        backgroundColor:'#2F2E7C',
        color:'#fff',
        marginLeft:10,
        paddingHorizontal:15,
        paddingVertical:2, 
        borderRadius:100,
    },
    OrderDetailDataCOntainer:{
        flexDirection:'row',
        marginTop:10
    },
    OrderDetailDataCOntainerRow:{
        flexDirection:'row',
        width:width-30,
        alignSelf:'center',
        paddingHorizontal:5,
        position:'relative',
    },
    OrderDetailDataCOntainerHeadingText:{
        fontWeight:'700',
        color:'#4E4D4D'
    },
    OrderDetailDataCOntainerCounterView:{
        position:'absolute',
        
        borderWidth:0.5,
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center',
        borderColor:'#929497',
        borderRadius:5,
        
        
},
iconView:{
    paddingHorizontal:10,
    alignItems:'center',
    justifyContent:'center',
    borderRightWidth:0.5
},
orderDetailAmmountRow:{
    flexDirection:'row',
    width:width-20,
    alignSelf:'center',
    paddingHorizontal:10,
    marginTop:10
},
orderDetailAmmountColumn:{
    flex:1,
    flexDirection:'row',
    
},
orderDetailAmmountColumnGaryBolText:{
    fontWeight:'bold',
    color:'#4E4D4D'
},
orderDetailAmmountColumnRedText:{
    color:'#B1272C'
},
userDEtailCOntainer:{
    marginTop:20,
    paddingLeft:10
},
userDEtailCOntainerIconView:{
    flexDirection:'row',
    width:width-20,
    marginBottom:10
},
userDEtailCOntainerText:{
marginLeft:10,
color:'#4E4D4D',
fontWeight:'bold'
},
usetDetailInfoText:{
    color:'#929497'
},
usetDetailLableText:{
    color:'#929497',
    fontWeight:'bold'
},
downIconView:{
    alignSelf:'center'
}
    
})



