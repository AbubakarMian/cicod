import React from 'react'
import { View, ImageBackground, Modal, Alert, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, } from 'react-native'
import { Text, TextInput, Searchbar } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
// import styles from '../css/DashboardCss';
import styles from '../css/OrderCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { SET_USER,SET_CUSTOMER, LOGOUT_USER,CLEAR_ORDER } from '../redux/constants/index';
import { Constants } from '../views/Constant';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TabNav from '../views/TabsNav';
// import DropDownPicker from 'react-native-dropdown-picker';
import FontCss from '../css/FontCss';

class Order extends React.Component {
    reload = true;
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false,
            data: [],
            is_active_list: '',
            payment_statu:'',
            spinner: false,
            date: '',
            search_order: '',
            isDatePickerVisible: false,
            setDatePickerVisibility: false,
            date_range:null,
            url_orders:'',
            date_created_timestamp:'YY-MM-DD',
            apply_filter:false,
            search_order_text:'',
            
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    customeList(listType) {
        this.setState({
            is_active_list:listType
        })
        return;
    }
    orderList(url) {   
        console.log('access token',this.props.user.access_token)
        this.setState({ spinner: true }) //,apply_filter:false
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
                console.log("**********************###############", responseJson)
                if (responseJson.status === 'success') {
                    this.setState({ spinner: false });
                    this.setState({
                        data: responseJson.data
                    });
                    // this.props.navigation.navigate('DrawerNavigation')
                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }

            })
    }
    async componentWillUnmount(){
        this.reload = true;
        console.log('reload un mount ',this.reload)
        console.log('componentWillUnmount')
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    itemDetail(item,type) {
        console.log("~~~~~~~~~~~~~~~~~",type)
        this.reload = true;
        const id = item.id
        console.log('TTTTTTTTTTTT',id)
        if(type=='PENDING'){
           
            this.props.navigation.navigate('OrderDetail_pending', { id })
        }
        else{
            this.props.navigation.navigate('OrderDetail', { id })
        }
    }

    datePickerFun = () => {
        this.setState({
            apply_filter:false,
            isDatePickerVisible: !this.state.isDatePickerVisible
        })
    }

    setDate = (date) => {
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();       
        if(month < 10){
            month = "0"+month;
        }   
        if(day < 10){
            day = "0"+day;
        }  
        let newdate = year + "-" + month + "-" + day;
        // // let sendDate = year + "/" + month + "/" + day;
        // var timestamp = Date.parse(new Date(sendDate));

        // let order_url = Constants.orderslist + '?date_created=' + timestamp;

        console.log('timestamptimestamptimestamptimestamp',newdate);

        this.setState({
            isDatePickerVisible: false,
            date:newdate,
            date_created_timestamp:newdate
        })

    }
    hideDatePicker = () => {
        this.setState({
            // setDatePickerVisibility: !this.state.setDatePickerVisibility,
            isDatePickerVisible: false
        })
    }
     search(text) {
         this.setState({
            search_order: text.nativeEvent.text,
            apply_filter:false
        })
    }

    timeConvertion(date) { //return 'some time';
        var datetime = date.split(" ");
        var date = datetime[0];
        var time = datetime[1];
        var time_arr = time.split(":");
        var hr = parseInt(time_arr[0]);
        var am_pm = 'AM';
        if (hr > 12) {
            am_pm = 'PM';
            hr = hr - 12;
        }
        if (hr == 12) {
            am_pm = 'PM';
        }
        if(hr == 0){
            am_pm = 'AM';
        }

        var timestr = hr + ":" + time_arr[1] + ":" + time_arr[1];
        var date_time = date + " " + timestr + " " + am_pm;
        // console.log('date_time converted ', date_time);
        return date_time;
    }
    apply_filters(){
        this.setState({ 
            apply_filter:true,
            date_created_timestamp:'YY-MM-DD',
            search_order:'',
            search_order_text:''
        });
        this.props.navigation.navigate('OrderFilter');
    }
    gotAddCustomer(){
        this.props.setCustomer({
            customer_name: '',
            customer_email: '',
            customer_phone: '',
        })
        this.props.emptyOrder({
           cart:[]
        })
        this.props.navigation.navigate('CreateOrder', { heading: 'order',customer_name:'' })
    }

    get_searach_by_status(url,filter_concat,active_list){
        let filter = '';
        if(active_list != ''){
            
            if(active_list == 'PART PAYMENT'){
                filter = filter + filter_concat+'payment_status=' + active_list
                
             }else if(active_list == 'ACCOUNT') {
                filter = filter + filter_concat+'payment_mode=' + active_list
             }
             else  {
                filter = filter + filter_concat+'order_status=' + active_list
             }
        }
        return filter
    }
    getOrderList(props){
        console.log('props ---- ',props);
        // return null;
        let _that = props._that;
        let url = Constants.orderslist;
        let filters = [];
        let filter_concat = '?';

        if (_that.props.route == null || _that.props.route.params == null || _that.props.route.params.filters == null) {
            url = Constants.orderslist;
        }
        else if(_that.state.apply_filter){           
            filters = _that.props.route.params.filters;
            let filter = filter_concat;
            for (let i = 0; i < filters.length; i++) {
                // filter = filter +'filter'+ '['+filters[i].key +']' + '=' + filters[i].value;
                if(filters[i].key == 'order_status'){
                    filter = _that.get_searach_by_status(url,filter_concat,filters[i].value);
                    
                    // _that.customeList(filters[i].value)
                }
                else{
                    filter = filter_concat +filters[i].key  + '=' + filters[i].value;                   
                }
                // if (i != filters.length - 1) {
                //     filter = filter + '&';
                // }
                filter_concat = '&';
                
            }
            url = (url + filter);            
        }
        
        if(filters.length != 0){
            filter_concat = '&';
        }
        if(_that.state.search_order != ''){
            url = url+filter_concat+'order_id=' + _that.state.search_order
            filter_concat = '&';
        }
        
        if(_that.state.date_created_timestamp != 'YY-MM-DD'){            
            url = url+filter_concat+'date_created=' + _that.state.date_created_timestamp
        }
        let filter = _that.get_searach_by_status(url,filter_concat,_that.state.is_active_list);
        url = (url + filter);
              
        console.log('reload hata ',_that.reload)
        if (url != _that.state.url_orders || _that.reload) {
            _that.reload = false;
            console.log('urllllll',url)
            _that.orderList(url);
            console.log('url ',url);
            _that.setState({
                url_orders: url,
            })
        }
        console.log('url hit', url);
        console.log(' will data !!!!!!!!!!!!!', _that.state.data.length);

        if(_that.state.data.length < 1){
            return(
            <View style={{ height:height/1.75, position: 'relative',flexDirection:'column', alignSelf: 'center',alignItems:'center',justifyContent:'center',  backgroundColor: '#F0F0F0', width: width - 20, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                <Image
                    source={require('../images/Untitled-1.png')}
                />
                <Text style={{color:'#929497',fontSize:20,fontWeight:'bold',fontFamily:'Open Sans'}}>No order found</Text>
            </View>
            )
        }
        else{
            return(                 
                <FlatList
            
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
                                onPress={() => _that.itemDetail(item,item.order_status)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    style={{ height: 30, width: 30, marginRight: 5 }}
                                                    source={require('../images/Order/bage.png')}
                                                />
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>{item.cicod_order_id}</Text>
                                                    <Text style={[{ color: '#929497' }, fontStyles.normal12]}>{item.customer.name}</Text>
                                                </View>
                                            </View>
                                            {
    
                                            }
                                            <Text style={[{ color: '#929497', marginTop: 5 }, fontStyles.normal12]}>  {_that.timeConvertion(item.order_date)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'column' }}>
                                        <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>N{item.amount}</Text>
    
                                        {(item.order_status == 'PENDING') ?
                                            <Text style={[{ borderRadius: 50, paddingHorizontal: 5, textAlign: 'center', backgroundColor: '#FFF3DB', color: '#FDB72B', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                                {item.order_status}
                                            </Text>
                                            : (item.order_status == 'PAID') ?
                                                <Text style={[{ borderRadius: 50, paddingHorizontal: 5, textAlign: 'center', backgroundColor: '#DAF8EC', color: '#26C281', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                                    {item.order_status}
                                                </Text>
                                                : (item.order_status == 'PART PAYMENT') ?
                                                    <Text style={[{ borderRadius: 50, paddingHorizontal: 5, textAlign: 'center', backgroundColor: '#E6E6E6', color: '#929497', width: width / 5, alignSelf: 'flex-end' }, styles.detailColumn2text]}>
                                                        {item.order_status}
                                                    </Text>
                                                    : null}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
            )
        }            
        }
        
   
    render() {
        return (
            <View style={{ width: width,height:height, position: 'relative', backgroundColor: '##F0F0F0', flex: 1 }}>
                <View style={{height:height/3.1}}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    date={new Date()}
                    onConfirm={this.setDate}
                    onCancel={this.hideDatePicker}
                />

                <View style={{  flexDirection: 'row', alignContent: 'center', alignItems: 'center', width: width - 20, alignSelf: 'center' }}>
                    <View>
                        <Text style={[{ color: '#2F2E7C', fontWeight: '700' }, fontStyles.normal15]}>ORDER</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={[{ flexDirection: 'row', maxWidth: width / 2, height: 40, borderRadius: 5, marginTop: 5, marginLeft: 10, backgroundColor: '#fff', alignItems: 'center' }]}
                            onPress={() => this.datePickerFun()}
                        >
                            <View style={{ backgroundColor: '#fff', flexDirection: 'row', marginLeft: 10, }}>
                                <Image
                                    style={{ height: 20, width: 20 }}
                                    source={require('../images/calenderIcon.png')}
                                />
                                <Text style={[{ color: '#909090', marginLeft: 5 }, fontStyles.normal12]}>{this.state.date_created_timestamp}</Text>
                            </View>
                            <View style={{ position: 'absolute', right: 20, bottom: 15 }}>
                                <Icon
                                    size={20}
                                    name="caret-down"
                                    color={'#707070'}
                                    style={{ alignSelf: 'center' }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', right: 0 }}>
                        <TouchableOpacity
                            onPress={() =>  this.gotAddCustomer()}
                        >
                            <Image
                                style={{ height: 30, width: 30 }}
                                source={require('../images/products/circlePlus.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingHorizontal: 10, borderRadius: 5, width: width - 80 }}>
                        <Searchbar
                            placeholder="Search order ID, customer, amount, etc"
                            style={[{ color: '#D8D8D8' }, fontStyles.normal14]}
                            iconColor="#929497"
                            style={{ width: width / 1.3, alignSelf: 'center', position: 'absolute', left: 0, marginTop: 10, marginBottom: 5, elevation: 0, borderColor: '#D8DCDE' }}
                            onChangeText={text => this.setState({search_order_text:text})}
                            value={this.state.search_order_text}
                            onSubmitEditing={(text) => this.search(text)}
                        //update
                        ></Searchbar>

                    </View>

                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() => this.apply_filters()}
                    >
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View>
                <View
                style={{width:width-20,alignSelf:'center',height:40}}
                >
                    
                <ScrollView
                   
                   horizontal={true}
                   paddingHorizontal={10}
                   // marginBottom={10}
                   // height={5}
                   marginTop={5}
                   marginBottom={5}
                   scrollEnabled={true}
               >
                 <TouchableOpacity
                       onPress={() => this.customeList("")}
                   >
                       <Text style={{
                           color: this.state.is_active_list === '' ? '#000' : '#e2e2e2',
                           fontWeight: 'bold', backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                       }}>ALL</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                       onPress={() => this.customeList("pending")}
                   >
                       <Text style={{
                           color: this.state.is_active_list === 'pending' ? '#000' : '#e2e2e2',
                           backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                       }}>PENDING</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                       onPress={() => this.customeList("paid")}
                   >
                       <Text style={{
                           color: this.state.is_active_list === 'paid' ? '#000' : '#e2e2e2',
                           backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                       }}>PAID</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                       onPress={() => this.customeList("PART PAYMENT")}
                   >
                       <Text style={{
                           color: this.state.is_active_list === 'partPayment' ? '#000' : '#e2e2e2',
                           backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                       }}>PART PAYMENT</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                       onPress={() => this.customeList("ACCOUNT")}
                   >
                       <Text style={{
                           color: this.state.is_active_list === 'payment_mod' ? '#000' : '#e2e2e2',
                           backgroundColor: '#E6E6E6', marginRight: 5, paddingHorizontal: 10, borderRadius: 50, backgroundColor: '#fff', fontSize: 15
                       }}>PAID FROM CREDIT</Text>
                   </TouchableOpacity> 

               </ScrollView>
                    </View> 
                    </View>
                {/* <ScrollView  style={{ marginBottom: 200 }}> */}
                <this.getOrderList _that={this}/>
                <TabNav style={{ position: 'absolute', bottom: 0 }} screen={'order'} props={this.props} />

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
        setCustomer: (value) => dispatch({ type: SET_CUSTOMER, value: value }),
        emptyOrder: () => dispatch({ type: CLEAR_ORDER }),
        
        logoutUser: () => dispatch({ type: LOGOUT_USER })
    }
}; 
export default connect(mapStateToProps, mapDispatchToProps)(Order)