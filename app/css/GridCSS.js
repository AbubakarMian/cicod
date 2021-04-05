import React from "react";

import {View,Text, Dimensions,StyleSheet, ImageBackground} from "react-native";


var {width,height} = Dimensions.get('window');

export default StyleSheet.create({
 
               
    center: {
        flex: 1,
     
        alignItems: "center",
        textAlign: "center",
        backgroundColor:'#fff'
      },
      gridView:{
        width:width,
        height:height,
       
        
      },
      gridRow:{
        width:width,
        height:130,
        flexDirection:'row',
    
       
      },
      gridColumn1:{
       
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        flex:1
      },
      gridColumn2:{
        
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        flex:1
    
      },
      gridColumn3:{
        
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        flex:1
      },
      gridColumnImg:{
        height:60,
        width:60,
        marginLeft:40,
        marginTop:25
      },
      gridColumnRating:{
        color:'#fff',
        fontWeight:'bold',
        textAlign:'right',
        marginRight:15,
        marginTop:5
      }
                                        

      
})


