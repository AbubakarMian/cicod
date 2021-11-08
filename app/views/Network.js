import React from 'react'
import { View,Share, TouchableHighlight, FlatList, Dimensions, Alert, Image, Platform, TouchableOpacity, ScrollView, } from 'react-native';
import Modal from 'react-native-modal';
import { Text, TextInput, Searchbar } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss'
import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { SET_USER, LOGOUT_USER, UpdateTabbar, PRODUCT_RELOAD } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import { Constants } from '../views/Constant';
import TabNav from '../views/TabsNav';
import {Picker} from '@react-native-picker/picker';
// import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import NavBack from './Components/NavBack';
import AwesomeAlert from 'react-native-awesome-alerts';
class Network extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectors:[],
            selected_sector:"",
            selectedStartDate: null,
            calenderModal: false,
            data: [],
            statistics:null,
            categoryarr: [],
            search_merchant: '',
            spinner: false,
            prod_image: '',
            reload: true,
            filters:[],
            get_merchant_url:'',
            isFetching: false,
            isMessage:false,
            message_text:""
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onRefresh(){
        console.log('222222222222',this.state.isFetching)
        this.setState({isFetching: true})
        // if(this.state.isFetching==true){
           
            // let search_url = Constants.productslist + '?search=' + this.state.search_merchant;
        this.getData(this.state.get_merchant_url);
           return;
        // }
        console.log('333333333333',this.state.isFetching)
        // _that.setState({
        //     url_orders: url,
        // })
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    async componentDidMount() {
        console.log("~~~~~~~~~~~~~~~~~~~~*************",this.props.user.access_token)
        const that = this;
        const url = Constants.getMerchants;
        this.getData(url);
        this.getSectors();
        
    }
  

    async getSectors() {
        let _that=this;
        if(_that.state.isFetching==true){
            _that.setState({isFetching:false})
        }
        
      
        this.setState({ spinner: true })
          
           console.log('token ',this.props.user.access_token)
        
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
               // Authorization: this.props.user.access_token,
            },
        };
        console.log("dsdwe$##",postData,Constants.getSectors)
        fetch(Constants.getSectors, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('~~~~~~~~~~~~~~~~~~dddon @@@@@@@', responseJson);
                // console.log('responseJson.postData', postData);
                this.setState({
                    spinner: false,

                });
                if (responseJson.status === "SUCCESS" || responseJson.success === true) {
                    await this.setState({
                        sectors: responseJson.list,
                      
                    })
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
    }

    async getData(url) {
        let _that=this;
        if(_that.state.isFetching==true){
            _that.setState({isFetching:false})
        }
        
      
        this.setState({ spinner: true })
           console.log('search url ',url)
           console.log('token ',this.props.user.access_token)
        
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        console.log("fou$##",postData)
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('~~~~~~~~~~~~~~~~~~responseJson.responseJson responseJson responseJson @@@@@@@', responseJson);
                // console.log('responseJson.postData', postData);
                this.setState({
                    spinner: false,

                });
                if (responseJson.status === "SUCCESS" || responseJson.success === true) {
                    await this.setState({
                        data: responseJson.merchants,
                        statistics:responseJson.statistics
                    })
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    console.log("eororo",responseJson)
this.setState({
    isMessage:true,
    message_text:"No Metchant Found"
})
                   
                }
            })
    }

    search() {
        let search_url = `${Constants.getMerchants}?searchType=merchant&searchKeyword=${this.state.search_merchant}` ;
        this.getData(search_url);

    }

   
   

    onSelectSector(sector,indext) {
        this.setState({selected_sector:sector})
        //console.log(' category ID search !!!!!!!!!!!!!!!@@@@@@@@@@@@@@', category_id)
        let search_url = `${Constants.getMerchants}?searchType=sector&searchKeyword=${sector}` ;
        
        this.getData(search_url);
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }

    async shareNetwork(){
        try {
            let message=`I found this commerce app that enables us collaborate in trade. \n`;
            message+=`CTA- Download CICOD Merchant and connect with me on my CICOD handle “${this.props.user.tenantId}”.`
          const result=await Share.share({
            message

           
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log("hrer#")
            } else {
              // shared
              console.log("shared#")
            }
              } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log("dismissed#")
          }
        } catch (error) {
            
          alert(error.message);
        }
      }
     

    render() {
        //console.log('categoryarr categoryarr categoryarr', this.props);
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
console.log("user$##",this.props.user)
        return (
            <View style={{width:width,
                backgroundColor:'#F0F0F0',
                alignItems:'center',
                flex:1,
                // padding:10,

                borderRadius:10,
                flexDirection:'column'}}>
                    <AwesomeAlert
          show={this.state.isMessage}
          showProgress={false}
          title="Info"
          message={this.state.message_text}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={false}
          cancelText="Close"
          
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.setState({isMessage:false})
          }}
          
        />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <Header navigation={this.props.navigation} />
                <NavBack title="MERCHANTS DIRECTORY" onClick={()=>this.props.navigation.goBack()} />
                <View style={{padding:10,width:"100%"}}>
                <TouchableOpacity onPress={()=>this.shareNetwork()} style={{backgroundColor:"#D5D5E4",height:50,justifyContent:"center",alignItems:"center",borderRadius:30,flexDirection:"row"}}>
                    <Icon name="user-plus" color="#2F2E7C" size={20} />
                    <Text style={{color:"#2F2E7C",fontSize:15,marginLeft:5}}>Invite</Text>
                </TouchableOpacity>
                </View>
                <View style={{borderColor:"#DDE2E5",borderWidth:1,width:"100%",marginTop:10}} />
                <View style={{width:"100%", borderBottomColor:"#E6E6E6",borderBottomWidth:1}}>
                <Picker
                                        
                onValueChange={(itemValue,itemLabel, itemIndex) => this.onSelectSector(itemValue,itemIndex)
                    }
                selectedValue={this.state.selected_sector} >
                    <Picker.Item style={{fontSize:15}} color="#929497" label="Select Sector" value="" />
                    {this.state.sectors.map(elem=>{
                        
                        return  <Picker.Item style={{fontSize:13}} color="#929497" label={elem.name} value={elem.token} />
                    })}
                </Picker>
                </View>
                
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Searchbar
                        placeholder="Search merchant"
                        style={[{ color: '#D8D8D8' }, fontStyles.normal14]}
                        iconColor="#929497"
                        style={{ width: width / 1.06, alignSelf: 'center', marginTop: 5, marginBottom: 5, elevation: 0, borderColor: '#D8DCDE' }}
                        onChangeText={text => this.setState({ search_merchant: text })}
                        onSubmitEditing={() => this.search()}
                    //update
                    ></Searchbar>
                    <View style={[{ borderBottomColor: '#E6E6E6', borderBottomWidth: 0.5, width: width - 20, alignSelf: 'center', marginTop: 10, marginBottom: 10 }]}></View>

                    {/* <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() =>  {this.setState({
                            reload: true,
                            search_merchant:''
                        });
                        this.props.navigation.navigate('ProductFilter')}}
                    >
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity> */}

                </View>
                <View style={{flexDirection:"row",alignSelf:"flex-start",justifyContent:"center",marginBottom:10,marginTop:10}}>
                        <Text style={{color:"#d2d2d2"}}>{new Date().getDate()}-{new Date().getMonth() + 1}-{new Date().getFullYear()}</Text>
                        <View style={{backgroundColor:"#DAF8EC",padding:5,marginLeft:10,marginTop:-5}}><Text>{this.state.statistics?this.state.statistics.countToday:0}  Merchants Joined</Text></View>
                </View>
                {/* <ScrollView></ScrollView> */}
                <ScrollView
                    zIndex={-0.999}
                    
                >
                   <View>
                
                 {this.state.data.length < 1?(
                     
                        <View style={{ height: height / 1.75, position: 'relative', flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0', width: width - 20, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                            <Image
                                source={require('../images/Untitled-1.png')}
                            />
                            <Text style={{ color: '#929497', fontSize: 20, fontWeight: 'bold', fontFamily: 'Open Sans' }}>No Merchant found</Text>
                        </View>
                    
                 ):(

                   <FlatList
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                            style={{}}
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
                                <TouchableOpacity
                                    key={item.key}
                                    onPress={() => this.props.navigation.navigate('Connect', { tenantId: item.tenantId,header:"Network" })}
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}>
                                    <View style={{ zIndex: -0.999, position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                        <View style={[{ zIndex: -0.999, flexDirection: 'row' }]}>
                                            {(item.image == null) ?
                                                <Image
                                                    style={[{ height: 40, width: 40, marginRight: 5 }]}
                                                    source={require('../images/bage.png')}
                                                />
                                                :
                                                <Image
                                                    style={[{ height: 50, width: 50 }]}
                                                    source={{ uri: item.image }}
                                                />}
                                        </View>
                                        <View style={{ position: 'relative', flex: 3, marginLeft: 10 }}>
                                           <View style={{flexDirection:"row",alignItems:"center"}}>
                                               <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>{item.companyName}</Text>
                                                {item.isKycApproved &&(
                                                     <Image
                                                     style={[{ height: 17, width: 17, marginLeft: 3 }]}
                                                     source={require('../images/greenTick.png')}
                                                 />
                                                )}
                                               </View> 
                                            <View style={{ flexDirection: 'row',marginBottom: 5,alignItems:"center"}}>
                                            {item.state &&  <><View style={{backgroundColor:"#EDE2E2",width:10,height:10,borderRadius:50}}/>
                                                <Text style={[{ color: '#929497',marginLeft:3,marginRight:5 }, fontStyles.normal12]}>{item.state??'--'}</Text>
                                            </>}
                                               
                                            {item.businesstype && <>
                                              <View style={{backgroundColor:"#EDE2E2",width:10,height:10,borderRadius:50}}/>
                                                <Text style={[{ color: '#929497' ,marginLeft:3,marginRight:5 }, fontStyles.normal12]}>{item.businesstype??'--'}</Text>
                                            </>
                                            }
                                               {item.sector && <>
                                                <View style={{backgroundColor:"#EDE2E2",width:10,height:10,borderRadius:50}}/>
                                                <Text style={[{ color: '#929497' ,marginLeft:3,marginRight:5 }, fontStyles.normal12]}>{item.sector}</Text>
                                                    </>
                                                }
                                                                                       
                                                   
                                            </View>
                                            <View style={{ flexDirection: 'row', }}>
                                                
                                                <Text style={[{ color: '#929497' }, fontStyles.normal12]}>{item.aboutUs??''}</Text>
                                                
                                            </View>
                                        </View>
                                        
                                    </View>
                                    
                                </TouchableOpacity>
                            )}
                        />
                        )}
                        </View>                   
               </ScrollView>
                {/* <Modal
                 animationType="fade"
                 visible={true}//this.state.regionModal
                 transparent={true}
                 hasBackdrop={true}
                 deviceHeight={height}
                 deviceWidth={width}
                 ba
                 justifyContent={'flex-end'}
                 alignItems={'flex-end'}
                 backgroundColor={'#000'}
                 opacity={0.8}
                > */}
                
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userReducer,
        tabBar: state.tabBarReducer,        
        reload: state.reloadReducer,
        currency: state.currencyReducer,
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        setTabBar: (value) => dispatch({ type: UpdateTabbar, value: value }),
        setScreenReload: (value) => dispatch({ type: PRODUCT_RELOAD, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Network)
