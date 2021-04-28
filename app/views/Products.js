import React from 'react'
import { View, TouchableHighlight, FlatList, Dimensions, Alert,Image, Platform, TouchableOpacity, ScrollView, } from 'react-native'
import { Text, TextInput, Searchbar } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss'
import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../views/Header';
import { connect } from 'react-redux';;
import { SET_USER, LOGOUT_USER,UpdateTabbar } from '../redux/constants/index';
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
            data: [],
            categoryarr: [],
            search_product: '',
            spinner: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    async componentDidMount() {
        
        await this.getCategoryList() 

        console.log('this.props.route',this.props.route);
        if(this.props.route==undefined || this.props.route.params==undefined || this.props.route.params.seller_id==undefined
            || this.props.route.params.seller_id == 0){
           await this.getData(Constants.productslist);
        }
        else {// (this.props.route.params.seller_id != 0)
            let url = Constants.sellerProductList + '?id=' + this.props.route.params.seller_id + '&sort=-id';
            console.log('URL @@@@@@@@@@@@@@@@@@@', url)
            await this.getData(url);
        } 
        // else {
        //     console.log('URL  els e @@@@@@@@@@@@@@@@@@@', Constants.productslist)
        //     this.getData(Constants.productslist);
        // }
        
        return;
        console.log('this.props.params', this.props.route);
        if (this.props.params != undefined) {
            let filters = this.props.route.params.filters;
            let filter = '?';
            for (let i = 0; i < filters.length; i++) {
                filter = filter + filters[i].key + '=' + filters[i].value;
                if (i != filters.length - 1) {
                    filter = filter + '&';
                }
            }
            this.getData(Constants.productslist + filter);
        }

    }
   async componentWillReceiveProps() {

        if( this.props.route == null ||  this.props.route.params == null ||  this.props.route.params.filters == null){
            return;
        }
        
       
        console.log('this.props.route', this.props.route.params.filters);
        // console.log('this.props.route',this.props.route.params);
        // this.getData(Constants.productslist);
        let filters = this.props.route.params.filters;
        let filter = '?';
        for (let i = 0; i < filters.length; i++) {
            filter = filter + filters[i].key + '=' + filters[i].value;
            if (i != filters.length - 1) {
                filter = filter + '&';
            }
        }

       await this.getData(Constants.productslist + filter);
    }

   async getData(url) {
    console.log()
        let token = this.props.user.access_token;
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };
        fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                console.log('responseJson.message', responseJson);
                console.log('responseJson.postData', postData);
                this.setState({
                    spinner: false,

                });
                if (responseJson.status === "success" || responseJson.success === true) {
                  await  this.setState({
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

    onCategoryText(text){

        this.setState({
            search_product:text
        })
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }

    render() {
        console.log('categoryarr categoryarr categoryarr', this.state.categoryarr);
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        
        return (
            <View style={{ height: height, width: width, position: 'relative', backgroundColor: '#F0F0F0' }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <Header navigation={this.props.navigation} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', color: '#2F2E7C' }}>Products</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ProductCategory')}
                        >
                            <Text style={{ fontSize: 12, color: '#B1272C', marginRight: 10 }}>View Product Category</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('CreateProduct')}
                        >
                            <Image
                                source={require('../images/products/circlePlus.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={{flexDirection:'row',marginTop:10, alignItems:'center',width:width-20,alignSelf:'center'}}>
             
                <Searchbar
                         placeholder="Search product, Price and code"
                         texts
                         style={{width:width-80,alignSelf:'center'}}
                         
                />
                <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() => this.props.navigation.navigate('ProductFilter')}
                    >
                        <Image
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>
                </View> */}
               
                {/* */}<View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', height: 50, paddingHorizontal: 10, borderRadius: 5, width: width - 80 }}>
                        <Image
                            source={require('../images/products/searchicon.png')}
                        />
                        
                        <TextInput
                            label="Search product, Price and code"
                            // selectionColor={'#fff'}

                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            onChangeText={text => this.setState({ search_product: text })}
                            onSubmitEditing={() => this.search()}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() => this.props.navigation.navigate('ProductFilter')}
                    >
                        <Image
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View> 
                <View style={[{}, styles.formRowView]}>
                    <View style={[{ position: 'relative' }, styles.formColumn]}>

                        <DropDownPicker
                            items={this.state.categoryarr}
                            containerStyle={{ height: 50, width: width - 20, marginTop: 15, alignSelf: 'center', borderBottomWidth: 0.5 }}
                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                            itemStyle={{
                                justifyContent: 'flex-start', zIndex: 999
                            }}
                            placeholder="Product Category"
                            dropDownStyle={{ backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, opacity: 1 }}
                            labelStyle={{ color: '#A9A9A9' }}
                            onChangeItem={item => this.onCategoryText(item.value)}
                        />
                        
                                            containerStyle={{ height: 50, width: width / 2 - 10,}}
                                            style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                                            itemStyle={{
                                                 justifyContent: 'flex-start',
                                            }}
                                            placeholder="Country *"
                                            dropDownStyle={{height:80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1,  }}
                                            labelStyle={{ color: '#A9A9A9' }}
                                       
                
                    </View>
                </View>

                <ScrollView
                zIndex={-0.999}
                >
                    <FlatList
                        style={{  }}
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
                                onPress={() => this.props.navigation.navigate('ProductView', { prod_id: item.id })}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}>
                                <View style={{ zIndex: -0.999, position: 'relative', alignSelf: 'center', flexDirection: 'row', backgroundColor: 'white', width: width - 20, padding: 10, borderRadius: 10, marginTop: 5 }}>
                                    <View style={[{ zIndex: -0.999,flexDirection: 'row' }]}>
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
                                        <Text style={[{color:'#4E4D4D'},fontStyles.bold15]}>{item.name}</Text>
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
                </ScrollView>

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
