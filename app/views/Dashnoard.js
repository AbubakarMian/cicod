import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss';
import Header from '../views/Header';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER } from '../redux/constants/index';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class Dashnoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            data: [],
            target: [],
            totalOrder: [],
            paidOrder: [],
            pendingOrder: [],
            canclledOrder: [],
            graph_total_orders:[],
        };

    }
    componentDidMount() {
        console.log('fsd fsdf sdf sfdsdf sfdfds');
        this.setState({ spinner: true })    
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch('https://com.cicodsaasstaging.com/com/api/dashboard', postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false,
                });
                // console.log('response !!!!!!!!!!!!!@@@@@@@@@@@@@@',responseJson);
                if (responseJson.status === 'success') {
                    // console.log('**************', this.state.data)
                    var total_orders = responseJson.data.graph.total_orders;
                    var graph_total_orders_data=[];
                    var graph_lable=[];
                    console.log('total_orders 66666666666666666666666',total_orders);
                    for(var i=0;i<total_orders.length;i++){
                        console.log('total_orders[i].amount',total_orders[i].amount);
                        console.log('total_orders[i].year',total_orders[i].year);
                        graph_total_orders_data.push(total_orders[i].amount);
                        graph_lable.push(total_orders[i].year);
                    }
                    var graph_total_orders = {
                        labels:graph_lable,
                        data:graph_total_orders_data,
                    };
                    console.log(' total total graph ',graph_total_orders);
                    this.setState({
                        target: responseJson.data.target,
                        totalOrder: responseJson.data.total,
                        paidOrder: responseJson.data.paid,
                        pendingOrder: responseJson.data.pending,
                        canclledOrder: responseJson.data.cancelled,
                        // graph_total_orders: graph_total_orders,

                    })
                    console.log("%%%%%%%%%%%%%%%%", graph_lable)
                    // this.props.navigation.navigate('DrawerNavigation')
                } else {
                    let message = JSON.stringify(responseJson.error.message)
                    Alert.alert('Error', message)
                }
                console.log("this.state.item.item_name this.state.item.item_name this.state.item.item_name", this.state.item.item_name)
            })
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    render() {
        console.log('graph !!!!!!!!!!!!!!!!!!!!!',this.state.graph)
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ height: height, width: width, alignItems: 'center', position: 'relative', backgroundColor: '#F0F0F0', }}>
                <Header />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Please Wait...'}
                    textStyle={{ color: '#fff' }}
                    color={'#fff'}
                />
                <ScrollView>
                    <View style={{ marginBottom: 10 }}>
                        <View style={[{}, styles.headerRowView]}>
                            <View style={{ flex: 1 }}>
                                <Text style={[{}, styles.headingText]}>DASHBOARD</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                                    onPress={() => this.setState({ calenderModal: true })}
                                >
                                    <Image
                                        source={require('../images/dashboard/calenderIcon.png')}
                                    />
                                    <Text style={[{}, styles.calenderText]}>Today</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{}, styles.cardContainer]}>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{}, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/redbage.png')}
                                    />
                                    <Text style={{ color: '#B1272C', fontSize: 10 }}>Total Orders</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.totalOrder.amount}</Text>
                                    <Text style={[{}, styles.recardtext]}>{this.state.totalOrder.count}</Text>
                                </View>
                            </View>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{}, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/greenbage.png')}
                                    />
                                    <Text style={{ color: '#18A757', fontSize: 10 }}>Paid Orders</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.paidOrder.amount}</Text>
                                    <Text style={[{}, styles.greencardtext]}>{this.state.paidOrder.count}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[{}, styles.cardContainer]}>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{}, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/bluebage.png')}
                                    />
                                    <Text style={{ color: '#2F2E7C', fontSize: 10 }}>Pending Orders</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.pendingOrder.amount}</Text>
                                    <Text style={[{}, styles.bluecardtext]}>{this.state.pendingOrder.count}</Text>
                                </View>
                            </View>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{}, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/yellowbage.png')}
                                    />
                                    <Text style={{ color: '#FDB72B', fontSize: 10 }}>Cancelled Orders</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.canclledOrder.amount}</Text>
                                    <Text style={[{}, styles.yellowcardtext]}>{this.state.canclledOrder.count}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={[{}, styles.calenderbtn]}>
                                <TouchableOpacity>
                                    <Text style={{ color: '#B1272C', fontWeight: 'bold' }}>Total Orders  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>Paid Orders  </Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.graph_total_orders.length==0 ?null:
                            <LineChart
                                data={this.state.graph_total_orders}
                                width={Dimensions.get("window").width - 20} // from react-native
                                height={height / 3}
                                yAxisLabel="N25M"
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        }
                        </View>
                        <View style={[{}, styles.bannerView]}>
                            <View style={[{}, styles.bannerContentView]}>
                                <Text style={[{}, styles.bannerText]}>Monthly Sales</Text>
                                <Text style={[{}, styles.bannerboldText]}>₦ {this.state.target.sales_made_amount}</Text>
                                <Text style={[{}, styles.bannerboldText]}>Target: {this.state.target.sales_target_amount}</Text>
                                <Text style={[{}, styles.bannerpercentText]}>
                                    75%
                              </Text>
                                <Progress.Bar color="#B1272C" backgroundColor="#fff" progress={0.75} width={200} />
                            </View>
                            <View style={[{}, styles.bannerImagetView]}>
                                <Image
                                    source={require('../images/dashboard/graph.png')}
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <Modal
                    visible={false}//this.state.calenderModal
                    transparent={true}
                >
                    <TouchableHighlight
                        onPress={() => this.setState({ calenderModal: false })}
                    >
                        <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: width, height: height / 2, justifyContent: 'center', alignItems: 'center', transparent: false, backgroundColor: '#fff' }}>
                                <CalendarPicker
                                    onDateChange={this.onDateChange}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashnoard)
