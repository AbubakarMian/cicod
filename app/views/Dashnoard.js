import React from 'react'
import { View, ImageBackground, TouchableHighlight, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback, Alert } from 'react-native'
import { Text, TextInput, Modal } from 'react-native-paper';
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss'
import Header from '../views/Header';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import { Constants } from '../views/Constant';
import { connect } from 'react-redux';
import { SET_USER, LOGOUT_USER, UpdateTabbar } from '../redux/constants/index';
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
            graph_total_orders: [],
            total_orders_pending_data: [],
            graph_data: [],
            showtotal_orders: true,
            selected_graph: 'all_orders',
            calenderModal: false,
            total_order_background: '#FFE5E5'
        };

    }
    componentDidMount() {
        console.log('fsd fsdf sdf sfdsdf sfdfds');
        this.props.setTabBar({ tab_name: 'dashboard' })
        this.setState({ spinner: true })
        let postData = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.user.access_token,
            },
        };
        fetch(Constants.dashboard, postData)
            .then(response => response.json())
            .then(async responseJson => {
                this.setState({
                    spinner: false,

                });
                console.log('response !!!!!!!!!!!!!@@@@@@@@@@@@@@', responseJson);
                if (responseJson.status === 'success') {
                    // console.log('**************', this.state.data)
                    var total_orders = responseJson.data.graph.total_orders;
                    var graph_total_orders_data = [];
                    var graph_lable = [];
                    console.log('total_orders 66666666666666666666666', total_orders);
                    for (var i = 0; i < total_orders.length; i++) {
                        console.log('total_orders[i].amount', total_orders[i].amount);
                        console.log('total_orders[i].year', total_orders[i].year);
                        let amount = parseInt(total_orders[i].amount);
                        graph_total_orders_data.push(amount);
                        graph_lable.push(total_orders[i].year);
                    }
                    var total_pending_orders = responseJson.data.graph.pending_orders;
                    var graph_total_pending_orders_data = [];
                    var graph_total_pending_orders_label = [];

                    for (var i = 0; i < total_pending_orders.length; i++) {
                        console.log('total_orders[i].amount', total_pending_orders[i].amount);
                        console.log('total_orders[i].year', total_pending_orders[i].year);
                        let amount = parseInt(total_pending_orders[i].amount);
                        graph_total_pending_orders_data.push(amount);
                        graph_total_pending_orders_label.push(total_pending_orders[i].year);
                    }
                    let total_orders_data = this.getGraphData(graph_lable, graph_total_orders_data);

                    let total_orders_pending_data = this.getGraphData(graph_total_pending_orders_label, graph_total_pending_orders_data);
                    console.log(' total total graph ', total_orders_pending_data);
                    this.setState({
                        target: responseJson.data.target,
                        graph: responseJson.data.graph,
                        totalOrder: responseJson.data.total,
                        paidOrder: responseJson.data.paid,
                        pendingOrder: responseJson.data.pending,
                        canclledOrder: responseJson.data.cancelled,
                        graph_total_orders: total_orders_data,
                        graph_data: total_orders_data,
                        total_orders_pending_data: total_orders_pending_data,

                    })
                    console.log("%%%%%%%%%%%%%%%%", graph_lable)
                    // this.props.navigation.navigate('DrawerNavigation')
                }
                else if (responseJson.status == 401) {
                    this.unauthorizedLogout();
                }
                else {
                    let message = responseJson.message
                    Alert.alert('Error', message)
                }
                console.log("this.state.item.item_name this.state.item.item_name this.state.item.item_name", this.state.item.item_name)
            })
    }

    unauthorizedLogout() {
        Alert.alert('Error', Constants.UnauthorizedErrorMsg)
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
    }

    ShowAllOrders() {
        let allorders = this.state.graph_total_orders;
        this.setState({
            selected_graph: 'all_orders',
            graph_data: allorders
        })
        console.log('all orders sel ', this.state.selected_graph);
    }

    ShowPendingOrders() {
        let total_orders_pending_data = this.state.total_orders_pending_data;
        this.setState({
            selected_graph: 'pending_orders',
            graph_data: total_orders_pending_data
        })
        console.log('pending_orders orders serl', this.state.selected_graph);

    }

    getGraphData(graph_lable, orders_data) {
        let graphdata = [];
        graphdata.push({
            data: orders_data,
            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        })
        let data = {
            labels: graph_lable,
            datasets: graphdata,
            // legend: ["Rainy Days"]
        };
        console.log('getGraphData', data);
        // data = {
        //     labels: ["January", "February", "March", "April", "May", "June"],
        //     datasets: [
        //       {
        //         data: [20, 45, 28, 80, 99, 43],
        //         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        //         strokeWidth: 2 // optional
        //       }
        //     ],
        //     legend: ["Rainy Days"] // optional
        //   }
        return data;
    }

    onDateChange(date) {
        () => this.setState({
            selectedStartDate: date,
        });
    }
    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ paddingBottom: 50, width: width, alignItems: 'center', position: 'relative', backgroundColor: '#F0F0F0', }}>
                <Header navigation={this.props.navigation} />
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
                                    <View style={{ backgroundColor: '#fff', flexDirection: 'row',justifyContent:'center',alignItems:'center',alignSelf:'flex-end', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                        <Image
                                            source={require('../images/dashboard/calenderIcon.png')}
                                        />
                                        <Text style={[{marginHorizontal:50}, styles.calenderText]}>Today</Text>
                                        <Icon 
                                        name="caret-down"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{}, styles.cardContainer]}>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{ backgroundColor: '#FFE5E5' }, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/redbage.png')}
                                    />
                                    <Text style={{ color: '#B1272C', fontSize: 10, fontFamily: 'Open Sans' }}>Total Orders</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'Open Sans', fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.totalOrder.amount}</Text>
                                    <Text style={[{}, styles.recardtext]}>{this.state.totalOrder.count}</Text>
                                </View>
                            </View>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{}, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/greenbage.png')}
                                    />
                                    <Text style={{ color: '#B1272C', fontSize: 10, fontFamily: 'Open Sans' }}>Paid Orders</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'Open Sans', fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.paidOrder.amount}</Text>
                                    <Text style={[{}, styles.greencardtext]}>{this.state.paidOrder.count}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[{}, styles.cardContainer]}>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{ backgroundColor: '#FFE5E5' }, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/bluebage.png')}
                                    />
                                    <Text style={{ color: '#2F2E7C', fontSize: 10, fontFamily: 'Open Sans' }}>Pending Orders</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'Open Sans', fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.pendingOrder.amount}</Text>
                                    <Text style={[{}, styles.bluecardtext]}>{this.state.pendingOrder.count}</Text>
                                </View>
                            </View>
                            <View style={[{}, styles.cardView]}>
                                <View style={[{}, styles.card]}>
                                    <Image
                                        source={require('../images/dashboard/yellowbage.png')}
                                    />
                                    <Text style={{ color: '#FDB72B', fontSize: 10, fontFamily: 'Open Sans' }}>Cancelled Orders</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'Open Sans', fontWeight: 'bold', color: '#4E4D4D' }}>₦ {this.state.canclledOrder.amount}</Text>
                                    <Text style={[{}, styles.yellowcardtext]}>{this.state.canclledOrder.count}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', paddingVertical: 20,marginBottom:10, width: width - 30, alignSelf: 'center', borderRadius: 5,paddingHorizontal:10 }}>
                            <View style={[{}, styles.calenderbtn]}>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#FFE5E5', paddingHorizontal: 5, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, paddingVertical: 5 }}
                                    onPress={() => this.ShowAllOrders()}>
                                    <Text style={{ color: this.state.selected_graph === 'all_orders' ? '#B1272C' : '#707070', fontWeight: 'bold' }}>Total Orders  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#FFE5E5', paddingHorizontal: 5, borderTopRightRadius: 50, borderBottomRightRadius: 50, paddingVertical: 5 }}
                                    onPress={() => this.ShowPendingOrders()}>
                                    <Text style={{ color: this.state.selected_graph === 'pending_orders' ? '#B1272C' : '#707070', fontWeight: 'bold' }}>Paid Orders  </Text>
                                </TouchableOpacity>
                            </View>
                            
                            {this.state.graph_data.length == 0 ? null :
                                <LineChart
                                    data={this.state.graph_data}
                                    width={Dimensions.get("window").width-40} // from react-native
                                    height={height / 3}
                                    paddingLeft={10}
                                    style={{ paddingHorizontal: 20, alignSelf: 'center',justifyContent:'center',borderWidth:20,borderColor:'#fff' }}
                                    alignSelf={'center'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    yAxisLabel="N25M"
                                    yAxisSuffix=""
                                    getDotColor={true}
                                    withInnerLines={false}
                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundColor: "#fff",
                                        marginLeft: 10,

                                        backgroundGradientFrom: "#fff",
                                        backgroundGradientTo: "#fff",
                                        decimalPlaces: 2, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(177, 39, 44, ${opacity})`,
                                        // color: (opacity = 1) => `rgba(225, 225, 225, 1)`,
                                        // labelColor: (opacity = 1) => `rgba(177, 39, 44, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(78, 77, 77, 1)`,
                                        
                                        style: {
                                            borderRadius: 16,
                                        
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#000",
                                            // fill:'red',//transparent
                                            // fillOpacity:0.7
                                        }
                                    }}
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
                                <Text style={[{}, styles.bannerboldText]}>₦{this.state.target.sales_made_amount}</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 3, marginTop: 10, width: width / 1.5, position: 'relative' }}>
                                    <Text style={[{ color: '#707070' }]}>Target: ₦ {this.state.target.sales_target_amount}</Text>
                                    <Text style={[{ position: 'absolute', right: 0 }, styles.bannerpercentText]}>
                                        75%
                              </Text>
                                </View>
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
                    visible={this.state.calenderModal}
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ calenderModal: false })}
                    >
                        <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: width, height: height / 2, justifyContent: 'center', alignItems: 'center', transparent: false, backgroundColor: '#fff' }}>
                                <CalendarPicker
                                    onDateChange={this.onDateChange}
                                    startDate={''}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashnoard)
