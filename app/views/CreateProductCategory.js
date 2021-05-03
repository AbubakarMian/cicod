import React from 'react'
import { View, ImageBackground,TouchableHighlight, ScrollView,Alert,  Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import {   Text, TextInput} from 'react-native-paper';
import styles from '../css/CreateProductCategoryCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box';
const { width, height } = Dimensions.get('window')

class CreateProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
        }
    }
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
             <View style={[{},styles.backRowView]}>
             <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('Home')}
               onPress={() => this.props.navigation.goBack()}
               >
               <Icon name="arrow-left" size={25} color="#929497" />
             </TouchableOpacity>
             <Text style={[{color:'#2F2E7C',fontWeight:'700',marginLeft:10},fontStyles.normal15]}>CREATE PRODUCT CATEGORY</Text>
             </View>
             <View style={[{},styles.mainContentView]}>
             <DropDownPicker
                 items={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                ]}
                containerStyle={{ height: 60, width: width - 50,}}
                style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 0.5, }}
                itemStyle={{
                            justifyContent: 'flex-start',width:width-50,height:30
                        }}
                        placeholder="Product Category "
                        dropDownStyle={{height:80, backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 10, opacity: 1,  }}
                        labelStyle={{ color: '#A9A9A9' }}
                        // onChangeItem={item =>this.onSelectCountry(item.value)}  //this.onSelectCountry(item.value)}
                        />
                 <View style={[{}, ]}>
                        <TextInput
                            onChangeText={text => this.setState({ username: text })}
                            label="Name*"
                            style={{backgroundColor:'transparent',borderColor:'#CFCFCF'}}
                            width={width-50}
                            alignSelf={'center'}
                            color={'#000'}
                            value={this.state.username}                            
                        />
                        <TextInput
                            onChangeText={text => this.setState({ username: text })}
                            label="Description"
                            style={{backgroundColor:'transparent',borderColor:'#CFCFCF'}}
                            width={width-50}
                            alignSelf={'center'}
                            color={'#000'}
                            value={this.state.username}                            
                        />
                        <CheckBox
                            style={[{ width: width / 2, alignSelf: 'flex-start',marginVertical:10, alignItems: 'center' },]}
                            onClick={() => {
                                this.setState({
                                    rememberIsChecked: !this.state.rememberIsChecked
                                })
                            }}
                            isChecked={this.state.rememberIsChecked}
                            rightText={"Remember details"}
                            rightTextStyle={{color:'#4E4D4D',fontSize:13,fontFamily:'Open Sans'}}
                            checkBoxColor={'#929497'}
                            
                        />
                        <Text style={[{color:'#4E4D4D',marginVertical:10},fontStyles.bold13]}>Image</Text>
                        <View style={[{}, styles.addImageView]}>
                               
                               <TouchableOpacity
                               onPress={()=> this.imageUpload()}
                               >
                                   {(this.state.prod_image != '') ?
                                <Image
                                    source={require('../images/redPlus.png')}
                                />
                            : <Image
                            source={require('../images/redPlus.png')}
                        />
                            }
                                </TouchableOpacity>
                            </View>
                          
                    </View>
                  
             </View>
             <TouchableOpacity
                        
                        style={[{}, styles.redBtn]}
                    >
                        <Text style={{ color: '#fff' }}>Save</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateProductCategory)
