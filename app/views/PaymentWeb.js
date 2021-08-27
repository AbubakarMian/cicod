import React from 'react';
import { View, Image, TouchableOpacity, Dimensions, Touchable, ScrollView, } from 'react-native';
import { Text, TextInput, Alert } from 'react-native-paper';
import styles from '../css/MoreCss';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { Constants } from '../views/Constant';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import { event } from 'react-native-reanimated';


var { width, height } = Dimensions.get('window');

class PaymentWeb extends React.Component {
    _isMounted = true;
    constructor(props) {
        super(props);
        this.state = {
            order_id:0,
            timer:3,
            order:null,
            part_payment_status:''
        }  
    }

     async check() {
         while(this._isMounted){
            this.get_order_detail();//return;
            console.log('timer while',this.state.order)
            let a = await this.performTimeConsumingTask(); 
             if(this.state.order != null){ 
                 console.log('payment order if');              
                console.log('this.state.order.payment_status',this.state.order.payment_status);
                
                if(this.state.order.payment_status == 'PAID' || this.state.order.payment_status == this.state.part_payment_status || this.state.order.payment_status == 'cancelled'){
                    // if(this.state.order.payment_status != 'PENDING' || this.state.order.payment_status == 'cancelled'){
                    this._isMounted = false;
                    // this.props.navigation.navigate('Order');
                    // this.props.navigation.navigate('OrderDetail', { id:this.state.order_id })
                    this.props.navigation.navigate('PaymentSuccess', { data:this.state.order})
                    break;
                }
             }
             if(this.timer > 300){
                this._isMounted = false;
            }
            let t = this.state.timer + 3
            this.setState({
                timer:t
            })            
         }       
         return;
      }
      
  performTimeConsumingTask = async () => {
      let time = this.state.timer * 1000;
    return  new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, time),
    );
  };    
    
     async get_order_detail() { 
        //  console.log(' webthis.props.route.params.data web',this.props.route.params)
        //  return
        let order_id = this.props.route.params.data.id;
        if(this.state.order_id != order_id){
            this.setState({
                order_id:order_id
            })
        }
        
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.user.access_token
            },
        };
        
        let url = Constants.orderslist + '/' + order_id
        console.log('---- body params list @@@@@@!!!!!!!!!!!!!!', this.props.route.params);
        console.log('*****************order url detail ', url);
        console.log('order postData ', postData);
        fetch(url, postData)
            .then(response => response.json())
            .then( responseJson => {
                console.log("order response response Json responseJson responseJson!!!!!!!!!!!", responseJson)                
                
                if (responseJson.status.toUpperCase() === "SUCCESS") {
                    let data = responseJson.data;
                    if(this.state.order == null){
                        let check_status = 'PART PAYMENT';
                        if(data.payment_status == 'PART PAYMENT'){
                            check_status = '';
                        } 
                        this.setState({
                            order: data,
                            part_payment_status:check_status
                        })
                    }
                    // return data
                    else if( data.payment_status != this.state.order.payment_status){
                        this.setState({
                            order: data,
                        })
                    }
                    
                } else {
                    // this.setState({ spinner: false })
                    let message = responseJson.message
                    console.log('some error',responseJson)
                }
            }
            )
            .catch((error) => {
                console.log("Api call error", error);
                // Alert.alert(error.message);
            });
    }
    async componentWillUnmount(){
        this._isMounted = false;
        console.log('componentWillUnmount')
    }

    render() {
        console.log('*************',Constants.orderslist + '/' + this.state.order_id)
        this.check();
        console.log('payment web rrrrrrrrrrrrrrrrr',this.props.route.params.payment_link)
        return (
            <WebView 
            source={{ uri: this.props.route.params.payment_link }} />
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
export default connect(mapStateToProps, mapDispatchToProps)(PaymentWeb)
