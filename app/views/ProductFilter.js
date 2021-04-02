import React from 'react'
import { View, ImageBackground, Text, Dimensions, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/Filter.Css'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import SearchBar from 'react-native-search-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'

class ProductFilter extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
        data:[],
    };
}
  componentDidMount(){
    // this.setState({ Spinner: true })
    let postData = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.props.user.access_token,
        },
       
    };//Constants.Products
     fetch('https://com.cicodsaasstaging.com/com/api/orders', postData)
        .then(response => response.json())
        .then(async responseJson => {
            console.log('response !!!!!!!!',responseJson)
            this.setState({ Spinner: false });
            this.setState({
                list:responseJson,
                data:responseJson.data
            });
            if (responseJson.status === true) {
                console.log("dataset",data)
                // this.props.navigation.navigate('DrawerNavigation')
            } else {
                let message = JSON.stringify(responseJson.error.message)
                Alert.alert('Error', message)
            }

        })
       
}
  render() {
    return (
      <View style={[{}, styles.mainView]}>
        <Header />
        <View style={[{}, styles.mainRow]}>
          {/* <Image
          source={require('../images')}
          /> */}
          <View style={[{ flexDirection: 'row', alignItems: 'center',marginVertical:10 }]}>
            <Icon name="arrow-left" size={25} color="#929497" />
            <Text style={[{ color: '#2F2E7C', fontWeight: 'bold', marginHorizontal: 10 }]}>FILTER</Text>

          </View>
          <Text style={[{ color: '#929497', fontWeight: 'bold', position: 'absolute', right: 20,top:20 }]}>Clear Filter</Text>
        </View>
        <View style={{width:width-20,backgroundColor:'#fff',paddingVertical:10,marginTop:20}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6',marginHorizontal:5,flexDirection:'row',position:'relative'}}>
             <TextInput 
             placeholder="Quantity"
             />
             <View style={{position:'absolute',right:10,bottom:10}}>
            
             </View>  
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6',marginHorizontal:5,flexDirection:'row',position:'relative'}}>
             <TextInput 
             placeholder="Category"
             />
             <View style={{position:'absolute',right:10,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View>  
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:'#E6E6E6',marginHorizontal:5,flexDirection:'row',position:'relative'}}>
             <TextInput 
             placeholder="Created By"
             />
             <View style={{position:'absolute',right:10,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View>  
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[{ flex: 1,paddingVertical:10 }]}>
              <Text style={{color:'#929497',fontWeight:'bold'}}>Created Date</Text>
            <TouchableOpacity>
             <View style={{backgroundColor:'#fff',flexDirection:'row',marginRight:10,padding:10,marginVertical:10}}>
              <Image 
              source={require('../images/calenderIcon.png')}
              />
               <Text style={{marginLeft:10,color:'#aaa'}}>DD-MM-YY</Text>
             </View>
             <View style={{position:'absolute',right:20,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View> 
            </TouchableOpacity>
          </View>
          <View style={[{ flex: 1,paddingVertical:10 }]}>
          <Text style={{color:'#929497',fontWeight:'bold',marginLeft:10}}>Updated Date</Text>
            <TouchableOpacity>
            
             <View style={{backgroundColor:'#fff',flexDirection:'row',marginLeft:10,padding:10,marginVertical:10}}>
             <Image 
              source={require('../images/calenderIcon.png')}
              />
              <Text style={{marginLeft:10,color:'#aaa'}}>DD-MM-YY</Text>
             </View>
             <View style={{position:'absolute',right:20,bottom:10}}>
             <Icon
             size={30}
           
             name="caret-down"
             color={'#707070'}
             />
             </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[{ color: '#929497', fontWeight: 'bold', fontSize: 20,marginVertical:10 }]}>Status</Text>
        <View>
          <ScrollView
          horizontal={true}
          >
          <View style={[{ paddingRight: 20 }, styles.mainRow]}>
            <View style={[{ marginRight:10 }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>ACTIVE</Text>
              </TouchableOpacity>
            </View>
            <View style={[{  }]}>
              <TouchableOpacity>
                <Text style={[{ color: '#929497',borderRadius:50,backgroundColor:'#E6E6E6',paddingHorizontal:5 }]}>INACTIVE</Text>
              </TouchableOpacity>
            </View>
           
            
           
            
           </View>
          </ScrollView>
        </View>
      
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('Products')}
        style={{width:width/1.5,marginTop:20, alignSelf:'center',backgroundColor:'#B1272C',justifyContent:'center',alignItems:'center',paddingVertical:15,borderRadius:50}}
        >
          <Text style={{color:'#fff',fontWeight:'bold'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
      user: state.userReducer
  }
};
function mapDispatchToProps(dispatch) {
  return {
      setUser: (value) => dispatch({ type: SET_USER, value: value }),
      logoutUser: () => dispatch({ type: LOGOUT_USER })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter)