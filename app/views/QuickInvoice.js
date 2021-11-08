import React from 'react'
import { View, TouchableHighlight, FlatList, Dimensions, Alert, Image, Platform, TouchableOpacity, ScrollView, } from 'react-native';
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
// import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
import NavBack from './Components/NavBack';
class QuickInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false,
            data: [],
            categoryarr: [],
            search_product: '',
            spinner: false,
            prod_image: '',
            reload: true,
            filters:[],
            quick_invoice:'',
            isFetching: false,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onRefresh(){
        console.log('222222222222',this.state.isFetching)
        this.setState({isFetching: true})
        // if(this.state.isFetching==true){
           
            // let search_url = Constants.productslist + '?search=' + this.state.search_product;
        this.getData(this.state.quick_invoice);
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
                if (responseJson.status === "success" || responseJson.success === true) {
                    await this.setState({
                        data: responseJson.data
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

    search() {
        let search_url = Constants.productslist + '?search=' + this.state.search_product;
        this.getData(search_url);

    }

    imageUpload() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            size: 1000000
        }).then(image => {
            console.log('IMAGE @@@@@@@@@@@@@@@@@@@@@@', image);
            this.setState({
                prod_image: image.path
            })
        });
    }

    getCategoryList() {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };

        fetch(Constants.productcategorylist, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ spinner: false });
                console.log(' category body ', postData);
                console.log('URLLLLLLLLLLLLLLLLLLLLLLL', Constants.productcategorylist);
                console.log('responseJson responseJson', responseJson);
                
                if (responseJson.status === 'success') {

                    let res = responseJson.data;
                    let categoryarr = res.map((x, key) => {
                        return { label: x.name, value: x.id }
                    });
                    this.setState({
                        categoryarr: categoryarr,
                    });
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
            })
    }

    onCategoryText(category_id) {
        console.log(' category ID search !!!!!!!!!!!!!!!@@@@@@@@@@@@@@', category_id)
        let url = Constants.productslist + '?category_id=' + category_id;
        this.getData(url);
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
     

     listProducts(props){
        let _that = props._that;
        let url = Constants.quickInvoice;
        if (_that.props.route == null || _that.props.route.params == null || _that.props.route.params.filters == null) {
            url = Constants.quickInvoice;
        }
        else{
            let filters = _that.props.route.params.filters;
            let filter = '?';
            for (let i = 0; i < filters.length; i++) {
                filter = filter + filters[i].key + '=' + filters[i].value;
                if (i != filters.length - 1) {
                    filter = filter + '&';
                }
            }
            url = (Constants.quickInvoice + filter);
        }
        console.log('reloaded 1',_that.props.reload.product)
        if(url != _that.state.quick_invoice || _that.props.reload.product){
            console.log('reloaded',_that.props.reload.product)
            _that.props.setScreenReload({
                reload:false
            })
             _that.getData(url);
            _that.setState({
                quick_invoice:url
            })
        }
        console.log('quick_invoice ',url);
        // return null;
        if (_that.state.data.length < 1) {
            return (
                <View style={{ height: height / 1.75, position: 'relative', flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0', width: width - 20, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                    <Image
                        source={require('../images/Untitled-1.png')}
                    />
                    <Text style={{ color: '#929497', fontSize: 20, fontWeight: 'bold', fontFamily: 'Open Sans' }}>No Invoice found</Text>
                </View>
            )
        }
        else{
        return (
            <View>
                
            <FlatList
            onRefresh={() => _that.onRefresh()}
            refreshing={_that.state.isFetching}
                        style={{}}
                        data={_that.state.data}
                        
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
                                // onPress={() => _that.props.navigation.navigate('ProductView', { prod_id: item.id })}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ zIndex: -0.999, position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={[{ zIndex: -0.999, flexDirection: 'row' }]}>
                                        {(item.image == null) ?
                                            <Image
                                                style={[{ height: 40, width: 40, marginRight: 5 }]}
                                                source={require('../images/inv_view.png')}
                                            />
                                            :
                                            <Image
                                                style={[{ height: 50, width: 50 }]}
                                                source={{ uri: item.image }}
                                            />}
                                    </View>
                                    <View style={{ position: 'relative', flex: 3, marginLeft: 10 }}>
                                        <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>{item.customer}</Text>
                                        <View style={{ flexDirection: 'row',marginBottom: 5}}>
                                            <Text style={[{ color: '#929497' }, fontStyles.normal12]}>{item.status=="DRAFT"?"DRAFT":item.invoice_no}</Text>
                                                                                   
                                                <View style={[{ position: 'absolute', right: 0,  marginLeft: 10, paddingHorizontal: 10, }]}>
                                                   <Text>{_that.props.currency.currency}{item.amount}</Text>
                                                </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft:-3}}>
                                            
                                            <Text style={[{ color: '#929497',fontWeight:"bold" }, fontStyles.normal12]}>  {item.status=="DRAFT"?'Date Saved: ':'Due Date: '}</Text>
                                            <Text style={[{ color: '#929497' }, fontStyles.normal12]}>{item.status=="DRAFT"?item.date_created:item.due_date}</Text>
                                            {(item.status == "PENDING") &&
                                                <View style={[{ position: 'absolute', right: 0, backgroundColor: '#FFF3DB', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                    <Text style={[{ color: '#FDB72B' }]}>PENDING</Text>
                                                </View> }
                                                {(item.status == "PAID") &&
                                                <View style={[{ position: 'absolute', right: 0, backgroundColor: '#DAF8EC', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                    <Text style={[{ color: '#26C281' }]}>ACTIVE</Text>
                                                </View>}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    </View>
        );
        }
    }

    render() {
        //console.log('categoryarr categoryarr categoryarr', this.props);
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        return (
            <View style={{width:width,
                backgroundColor:'#F0F0F0',
                alignItems:'center',
                flex:1,
                borderRadius:10,
                flexDirection:'column'}}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <Header navigation={this.props.navigation} />
                <View style={{ flexDirection: 'row',paddding:20, marginTop:10, alignItems: 'center', justifyContent: 'space-around' }}>
                   
                        <NavBack title="QUICK INVOICE" onClick={()=>this.props.navigation.goBack()} />
                    
                    <View style={{  flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',marginRight:20 }}>
                        {/* <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ProductCategory')}
                        >
                            <Text style={{ fontSize: 12, color: '#B1272C', marginRight: 10 }}>View Product Category</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CreateQuickInvoice', { action: 'create', prodDetail: null })}
                        >
                            <Image
                                style={{ height: 30, width: 30 }}
                                source={require('../images/products/circlePlus.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
                    <Searchbar
                        placeholder="Search Invoice No."
                        style={[{ color: '#D8D8D8' }, fontStyles.normal14]}
                        iconColor="#929497"
                        style={{ width: width / 1.3, alignSelf: 'center', marginTop: 5, marginBottom: 5, elevation: 0, borderColor: '#D8DCDE' }}
                        onChangeText={text => this.setState({ search_product: text })}
                        // onSubmitEditing={() => this.search()}
                    //update
                    ></Searchbar>
                    <View style={[{ borderBottomColor: '#E6E6E6', borderBottomWidth: 0.5, width: width - 20, alignSelf: 'center', marginTop: 10, marginBottom: 10 }]}></View>

                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        
                    >
                        <Image
                            style={{ height: 49, width: 49 }}
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View>
                
                {/* <ScrollView></ScrollView> */}
                <ScrollView
                    zIndex={-0.999}
                    
                >
                    <this.listProducts _that={this}/>                    
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
export default connect(mapStateToProps, mapDispatchToProps)(QuickInvoice)
