import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss'
import CalendarPicker from 'react-native-calendar-picker';
import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import { Constants } from '../views/Constant';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false, 
            data:[],
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    componentDidMount(){
        this.getData(Constants.productslist);
        return;
        console.log('this.props.params',this.props.route);
        if(this.props.params != undefined){
    let filters = this.props.route.params.filters;
        let filter = '?';
        for(let i=0;i<filters.length;i++){
            filter = filter+filters[i].key+'='+filters[i].value;
            if(i != filters.length-1){
                filter = filter+'&';
            }
        }
        this.getData(Constants.productslist+filter);
        }
       
    }
    componentWillReceiveProps(){
        console.log('this.props.route',this.props.route);
        // return;
        // let filters = this.props.route.params.filters;
        // let filter = '?';
        // for(let i=0;i<filters.length;i++){
        //     filter = filter+filters[i].key+'='+filters[i].value;
        //     if(i != filters.length-1){
        //         filter = filter+'&';
        //     }
        // }
        this.getData(Constants.productslist);
        // this.getData(Constants.productslist+filter);
    }

    getData(url){

        console.log('products');
        this.setState({ Spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            }, 
        };
         fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    Spinner: false,
                    data:responseJson.data
                });
                if (responseJson.status === true) {
                    this.props.navigation.navigate('DrawerNavigation')
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }
            })
    }

    render() {

        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '#F0F0F0' }}>
                <Spinner
                        visible={this.state.Spinner}
                        textContent={'Please Wait...'}
                        textStyle={{ color: '#fff' }}
                        color={'#fff'}
                    />
                <Header />
               <View style={{flexDirection:'row',paddingHorizontal:10,alignItems:'center',justifyContent:'center'}}>
                <View style={{flex:1}}>
                  <Text style={{fontWeight:'bold',color:'#2F2E7C'}}>Products</Text>
                </View>
                <View style={{flex:2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                  <Text style={{fontSize:12,color:'#B1272C',marginRight:10}}>View Product Category</Text>
                  <Image 
                  source={require('../images/products/circlePlus.png')}
                  />
                </View>
               </View>
                


                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Image
                        source={require('../images/products/searchicon.png')}
                    />
                    <View>
                        <TextInput
                            placeholder="Search order ID, customer, amount, tic"
                        />
                    </View>
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', }}>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('ProductFilter')}
                        >
                            <Image
                                source={require('../images/Order/settingicon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>


                <ScrollView>
                    <FlatList
                        data={this.state.data}
                        ItemSeparatorComponent={
                            Platform.OS !== 'android' &&
                            (({ highlighted }) => (
                                <View
                                    style={[
                                        style.separator,
                                        highlighted && { marginLeft: 0 }
                                    ]}
                                />
                            ))
                        }

                        renderItem={({ item, index, separators }) => (
                            <TouchableHighlight
                                key={item.key}
                                onPress={() => this._onPress(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={[{ flexDirection: 'row' }]}>
                                        <Image
                                            style={[{ height: 50, width: 50 }]}
                                            source={{uri:item.image}}
                                        />

                                    </View>
                                    <View style={{ position: 'relative', flex: 3 }}>
                                        <Text>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text>QTY:  {item.quantity}</Text>
                                            <View style={[{ position: 'absolute', right: 0, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                            </View>
                                        </View>
                                    </View>



                                </View>
                            </TouchableHighlight>
                        )}
                    />
                </ScrollView>

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
  export default connect(mapStateToProps, mapDispatchToProps)(Products)
