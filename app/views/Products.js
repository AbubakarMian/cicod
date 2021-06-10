import React from 'react'
import { View, TouchableHighlight, FlatList, Dimensions, Alert, Image, Platform, TouchableOpacity, ScrollView, } from 'react-native'
import { Text, TextInput, Searchbar } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss'
import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { SET_USER, LOGOUT_USER, UpdateTabbar } from '../redux/constants/index';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
import DropDownPicker from 'react-native-dropdown-picker';
import { Constants } from '../views/Constant';
import TabNav from '../views/TabsNav';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';
class Products extends React.Component {
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
            url_products:''
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    async componentDidMount() {
        const that = this;
        setTimeout(function () {
            that.getCategoryList()
        }, 700);
    }
  

    async getData(url) {
        this.setState({ spinner: true })
           
        
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
                console.log('responseJson.responseJson responseJson responseJson @@@@@@@', responseJson);
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
        let url = '';
        if (_that.props.route == null || _that.props.route.params == null || _that.props.route.params.filters == null) {
            url = Constants.productslist;
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
            url = (Constants.productslist + filter);
        }
        if(url != _that.state.url_products){
             _that.getData(url);
            _that.setState({
                url_products:url
            })
        }
        // console.log('all data ',_that.state.data);
        // return null;
        
        return (
            <View>
            <FlatList
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
                                onPress={() => _that.props.navigation.navigate('ProductView', { prod_id: item.id })}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ zIndex: -0.999, position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={[{ zIndex: -0.999, flexDirection: 'row' }]}>
                                        {(item.image == null) ?
                                            <Image
                                                style={[{ height: 40, width: 40, marginRight: 5 }]}
                                                source={require('../images/ticket.png')}
                                            />
                                            :
                                            <Image
                                                style={[{ height: 50, width: 50 }]}
                                                source={{ uri: item.image_url }}
                                            />}
                                    </View>
                                    <View style={{ position: 'relative', flex: 3, marginLeft: 10 }}>
                                        <Text style={[{ color: '#4E4D4D' }, fontStyles.bold15]}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={[{ color: '#929497' }, fontStyles.normal12]}>QTY:  {item.quantity}</Text>
                                            <Text style={[{ color: '#929497' }, fontStyles.normal12]}>.  {item.slug}</Text>
                                            {(item.is_active == false) ?
                                                <View style={[{ position: 'absolute', right: 0, backgroundColor: '#e3b8be', marginLeft: 10, paddingHorizontal: 10, borderRadius: 50 }]}>
                                                    <Text style={[{ color: '#ba071f' }]}>IN ACTIVE</Text>
                                                </View> :
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

    render() {
        console.log('categoryarr categoryarr categoryarr', this.props);
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
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[{ color: '#2F2E7C', fontWeight: '700' }, fontStyles.normal15]}>Products</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ProductCategory')}
                        >
                            <Text style={{ fontSize: 12, color: '#B1272C', marginRight: 10 }}>View Product Category</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CreateProduct', { action: 'create', prodDetail: null })}
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
                        placeholder="Search product, Price and code"
                        style={[{ color: '#D8D8D8' }, fontStyles.normal14]}
                        iconColor="#929497"
                        style={{ width: width / 1.3, alignSelf: 'center', marginTop: 5, marginBottom: 5, elevation: 0, borderColor: '#D8DCDE' }}
                        onChangeText={text => this.setState({ search_product: text })}
                        onSubmitEditing={() => this.search()}
                    //update
                    ></Searchbar>
                    <View style={[{ borderBottomColor: '#E6E6E6', borderBottomWidth: 0.5, width: width - 20, alignSelf: 'center', marginTop: 10, marginBottom: 10 }]}></View>

                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() =>  {this.setState({
                            reload: true
                        });
                        this.props.navigation.navigate('ProductFilter')}}
                    >
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View>
                <View style={[{}, styles.formRowView]}>
                    <View style={[{ position: 'relative', }, styles.formColumn]}>
                        <DropDownPicker
                            items={this.state.categoryarr}
                            placeholder="Product Category"
                            containerStyle={{ height: 50, marginTop: 5, width: width - 20, alignSelf: 'center' }}
                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                            dropDownStyle={{ height: 80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1, }}
                            labelStyle={{ color: '#A9A9A9' }}
                            onChangeItem={item => this.onCategoryText(item.value)}
                        />
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#E6E6E6', width: width - 20, alignSelf: 'center', marginVertical: 10 }}></View>
                </View>
                {/* <ScrollView></ScrollView> */}
                <ScrollView
                    zIndex={-0.999}
                    
                >
                    <this.listProducts _that={this}/>                    
               </ScrollView>
                <TabNav style={{ position: 'absolute', bottom: 0 }} screen={'product'} props={this.props} />
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.userReducer,
        tabBar: state.tabBarReducer
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        setTabBar: (value) => dispatch({ type: UpdateTabbar, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Products)
