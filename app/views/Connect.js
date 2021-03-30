import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../css/ConnectCss';
import { Container,  Left, Body, Right, Button, Title, Segment, Content,  } from 'native-base';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
export default class Connect extends React.Component {
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header />
                <View style={[{}, styles.mainRow]}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }]}>
                        <Icon name="arrow-left" size={25} color="#929497" />
                        <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>CONNECT</Text>
                    </View>
                </View>
                <View style={[{}, styles.tabView]}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                    >
                        <Text style={{ color: '#B1272C', fontWeight: 'bold', textAlign: 'center' }}>Connect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                    >
                        <Text style={{ textAlign: 'center' }}>Recieved</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                    >
                        <Text style={{ textAlign: 'center' }}>Sent</Text>
                    </TouchableOpacity>
                </View>
                  {/* <Segment
                  
                  style={{width:width-20,alignSelf:'center',paddingHorizontal:10,color:'#B1272C'}}
                  selectionColor={'#B1272C'}
                  color="#B1272C"
                  >
                        <Button 
                        
                        first style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text>Puppies</Text>
                        </Button>
                        <Button style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text>Kittens</Text>
                        </Button>
                        <Button last active style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text>Cubs</Text>
                        </Button>
                    </Segment> */}
                <View style={[{}, styles.contentView]}>
                    <Image
                        source={require('../images/home/connect.png')}
                    />
                    <Text style={{ width: width / 2, textAlign: 'center', fontWeight: 'bold', color: '#4E4D4D' }}>Search for Merchant you want to connect with</Text>
                    <View style={[{}, styles.searchView]}>
                        <Image
                            source={require('../images/connect/redsearch.png')}
                        />
                        <TextInput
                            placeholder="Merchant Domain Name"
                        />
                    </View>
                  
                </View>
                <View style={[{},styles.deatilcontentView]}>
                    <Icon 
                    name="briefcase"
                    size={100}
                    color={'#D8D8D8'}
                    />
                    <Text style={{fontWeight:'bold',color:'#929497'}}>No Merchant</Text>
                    <Text style={{color:'#929497',fontSize:12}}>Search for a merchant</Text>
                </View>
            </View>
        )
    }
}
