import React from 'react'
import { View, ScrollView, TouchableHighlight, FlatList, Dimensions, Alert, Image, Platform, TouchableOpacity, } from 'react-native'
import { Text, TextInput } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/ProductCategoryCss'
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Constants } from '../views/Constant';
import Header from '../views/Header';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER,PRODUCT_CATEGORY_RELOAD,PRODUCT_CATEGORY_FILTER_RELOAD } from '../redux/constants/index';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class ProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            searchPress: 1,
            updateProductModal: false,
            categoryarr: [],
            spinner: false,
            search_text: '',
            search_filters:[]
        }

    }
    componentDidMount() {
        this.getCategoryList(Constants.productcategorylist);
    }

    async getCategoryList(url) {
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        console.log('url product category',url,'token',this.props.user.access_token)
        await fetch(url, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({ spinner: false });
                console.log('responseJson responseJson category !!!!!!', responseJson);
                if (responseJson.status === 'success') {
 
                    this.setState({
                        categoryarr: responseJson.data,
                    });
                } else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }

            })

    }

    got_new_filters() {
        console.log(this.props.user.access_token)
        console.log('filters',this.props.route.params)
        if(this.props.route.params == undefined || 
                this.props.route.params.filters.length == this.state.search_filters.length ){            
            return false;
        }

        let filters = this.props.route.params.filters;
        this.setState({
            search_filters:this.props.route.params.filters
        })
        let filter = '?';
        for (let i = 0; i < filters.length; i++) {
            filter = filter + filters[i].key + '=' + filters[i].value;
            if (i != filters.length - 1) {
                filter = filter + '&';
            }
        }
        console.log('getCategoryList url @@@@@@@@@@@@!!!!!!!!!!!!', Constants.productcategorylist + filter)
        this.getCategoryList(Constants.productcategorylist + filter);
        return true;
    }

    categoryStatusUpdate(url) {
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
                Alert.alert('Message', responseJson.message)
                // this.setState({ spinner: false });
                console.log('~~~~~~~~~~~~~ responseJson responseJson', responseJson);
                if (responseJson.status === 'success') {                    
                    this.getCategoryList(Constants.productcategorylist);
                    

                } else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }

            })
    }
    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }
    async suspendAction(item) {
        let url = '';
        if (item.is_active) {
            // suspend
            url = Constants.productcategorylist + '/' + item.id + '?action=suspend'
            await this.categoryStatusUpdate(url);
        } else {
            // unsuspend
            url = Constants.productcategorylist + '/' + item.id + '?action=unsuspend'
            await this.categoryStatusUpdate(url);
        }
    }
    search() {
        let search_url = Constants.productcategorylist + '?search=' + this.state.search_text;
        this.getCategoryList(search_url);
    }

    filterCategory(){
        this.setState({
            search_text:'',
            search_filters:[]
        })
        this.props.setScreenFilterReload({
            reload:true
        })
        this.props.navigation.navigate('CategoryFilter', { screen: 'ProductCategory' })
    }

    render() {
        if(this.props.reload.product_category){
            if(!this.got_new_filters()){
                this.getCategoryList(Constants.productcategorylist);
            }
            this.props.setScreenReload({
                reload:false
            })
        }
        // this.got_new_filters();
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>PRODUCT CATEGORY</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CreateProductCategory', { screen: 'create', item:{} })}
                        style={[{}, styles.plusTouch]}
                    >
                        <Image source={require('../images/circlePlus.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row', width: width - 20, alignSelf: 'center', borderRadius: 5, marginTop: 10, alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', height: 50, paddingHorizontal: 10, borderRadius: 5, width: width - 80 }}>
                        <Image
                            style={{ height: 30, width: 30 }}
                            source={require('../images/products/searchicon.png')}
                        />

                        <TextInput
                            label="Search a category"
                            // selectionColor={'#fff'}
                            value={this.state.search_text}
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                            onChangeText={text => this.setState({ search_text: text })}
                            onSubmitEditing={() => this.search()}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ position: 'absolute', right: 0, alignSelf: 'center', }}
                        onPress={() => this.filterCategory()}
                    >
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={require('../images/Order/settingicon.png')}
                        />
                    </TouchableOpacity>

                </View>
                {/* <View style={[{}, styles.searchRow]}>
                    <Image source={require('../images/products/searchicon.png')} />
                    <TextInput
                        label="Search a category"
                        style={{ backgroundColor: 'transparent', }}
                        width={width - 50}
                        alignSelf={'center'}
                        color={'#000'}
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Filter')}

                        style={[{}, styles.settingTouch]}
                    >
                        <Image source={require('../images/Order/settingicon.png')} />
                    </TouchableOpacity>
                </View> */}
                <View style={{ borderBottomWidth: 1, width: width - 20, alignSelf: 'center', borderBottomColor: '#E6E6E6', marginVertical: 10 }}></View>
                {(this.state.categoryarr.length>0)?
                <FlatList
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
                    data={this.state.categoryarr}
                    renderItem={({ item, index, separators }) => (
                        // <TouchableOpacity
                        //     key={item.key}
                        //     // onPress={() => this._onPress(item)}
                        //     onShowUnderlay={separators.highlight}
                        //     onHideUnderlay={separators.unhighlight}>
                        <View style={[{}, styles.listContainer]}>
                            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, styles.listImageView]}>
                                {(item.image==null)?
                                 <Image source={require('../images/product_cat_icon.png')} />
                                :
                                <Image style={{height:30,width:30}} source={{uri:item.image}} />}
                                
                            </View>
                            <View style={[{ flex: 6 }, styles.listDescView]}>
                                <Text style={[{}, styles.listDescBoldText]}>{item.name}</Text>
                                <Text style={[{}, styles.listDescNormalText]}>{item.description}</Text>
                            </View>
                            <View style={[{ flex: 2.5, justifyContent: 'flex-end', alignItems: 'flex-end' }, styles.listActionView]}>
                                <Menu>
                                    {/* <MenuTrigger text='. . .' customStyles={{}} /> */}
                                    <MenuTrigger style={styles.trigger}>
                                        {/* <Text style={styles.triggerText}>Slide-in menu...</Text> */}
                                        <Icon name="ellipsis-h" color={'#929497'} size={20} />
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption
                                            onSelect={() => this.props.navigation.navigate('CreateProductCategory', { screen: 'update',items:item })}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../images/update.png')}
                                                />
                                                <Text style={{ marginLeft: 10 }}>Update</Text>
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => this.suspendAction(item)} >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../images/suspend.png')}
                                                />
                                                {(item.is_active == 1) ?
                                                    <Text style={{ marginLeft: 10 }}>Suspend</Text>
                                                    : <Text style={{ marginLeft: 10 }}>Unsuspend</Text>}
                                            </View>
                                        </MenuOption>

                                    </MenuOptions>
                                </Menu>
                                {(item.is_active == true) ?
                                    <Text style={[{}, styles.actionText]}>ACTIVE</Text> :
                                    <Text style={[{textAlign:'center'}, styles.inactiveActionText]}>SUSPENDED</Text>}
                            </View>
                        </View>
                        // </TouchableOpacity>
                    )}
                />
                :
                <View style={{ height: height / 1.75, position: 'relative', flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0', width: width - 20, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                <Image
                    source={require('../images/Untitled-1.png')}
                />
                <Text style={{ color: '#929497', fontSize: 20, fontWeight: 'bold', fontFamily: 'Open Sans' }}>No Category found</Text>
            </View>
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer,
        reload: state.reloadReducer
    }
};
function mapDispatchToProps(dispatch) {
    return {
        setUser: (value) => dispatch({ type: SET_USER, value: value }),
        logoutUser: () => dispatch({ type: LOGOUT_USER }),
        setScreenReload: (value) => dispatch({ type: PRODUCT_CATEGORY_RELOAD, value: value }),
        setScreenFilterReload: (value) => dispatch({ type: PRODUCT_CATEGORY_FILTER_RELOAD, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory)
