/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ImageBackground,
  DatePickerAndroidDateSetAction,
  TouchableHighlight,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Text, TextInput, Modal} from 'react-native-paper';
import splashImg from '../images/splash.jpg';
import styles from '../css/DashboardCss';
import fontStyles from '../css/FontCss';
import Header from './Header';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from './Constant';
import {connect} from 'react-redux';
import {SET_USER, LOGOUT_USER, UpdateTabbar} from '../redux/constants/index';
import TabNav from './TabsNav';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Console} from 'node:console';
import Scaffold from './Components/Scaffold';
const {width, height} = Dimensions.get('window');
const isAndroid = Platform.OS == 'android';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      data: [],
      target: {},
      totalOrder: null,
      paidOrder: null,
      pendingOrder: null,
      canclledOrder: null,
      graph_total_orders: [],
      total_orders_pending_data: [],
      graph_data: [],
      showtotal_orders: true,
      selected_graph: 'all_orders',
      calenderModal: false,
      total_order_background: '#FFE5E5',
      date: '',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
    };
  }
  componentDidMount() {
    console.log('this.props.user.access_token', this.props.user.access_token);
    this.getDashboardData(Constants.dashboard);
  }
  toCommas(value) {
    console.log('my val', value);
    return '111,222,333';
    
  }
  getDashboardData(url) {
    this.props.setTabBar({tab_name: 'dashboard'});
    this.setState({spinner: true});
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
        this.setState({
          spinner: false,
        });
        console.log(
          'postData postDatapostData !!!!!!!!!!!!!@@@@@@@@@@@@@@',
          postData,
        );
        console.log('response !!!!!!!!!!!!!@@@@@@@@@@@@@@', responseJson.data);
        console.log('url url url !!!!!!!!!!!!!@@@@@@@@@@@@@@', url);
        if (responseJson.status === 'success') {
          console.log(
            'response pending_orders 66666666666666666666666',
            responseJson.data.graph.pending_orders,
          );
          console.log(
            'response total_orders  66666666666666666666666',
            responseJson.data.graph.total_orders,
          );
          if (responseJson.data.length < 1) {
            Alert.alert('Message', responseJson.message);
          }
          var total_orders = responseJson.data.graph.total_orders ?? [];
          var graph_total_orders_data = [];
          var graph_lable = [];
          for (var i = 0; i < total_orders.length; i++) {
            console.log('MMMMMMMMMMMMMMMMMMM', total_orders[i].amount);
            let amount = parseInt(total_orders[i].amount);
            // let amount = parseInt(123456789);

            // graph_total_orders_data.push(amount/1000);
            graph_total_orders_data.push(amount);
            graph_lable.push(total_orders[i].year);
          }

          var total_pending_orders = responseJson.data.graph.pending_orders;
          var graph_total_pending_orders_data = [];
          var graph_total_pending_orders_label = [];
          for (var i = 0; i < total_pending_orders.length; i++) {
            let amount = parseInt(total_pending_orders[i].amount);

            // graph_total_pending_orders_data.push((amount / 1000));
            graph_total_pending_orders_data.push(amount);
            // graph_total_pending_orders_data.push(135.123);
            graph_total_pending_orders_label.push(total_pending_orders[i].year);
          }
          // console.log('graph_total_pending_orders_data',graph_total_pending_orders_data);
          console.log(
            'graph_total_orders_datagraph_total_orders_datagraph_total_orders_data',
            graph_total_orders_data,
          );
          let total_orders_data = this.getGraphData(
            graph_lable,
            graph_total_orders_data,
          );

          let total_orders_pending_data = this.getGraphData(
            graph_total_pending_orders_label,
            graph_total_pending_orders_data,
          );
          let target = responseJson.data.target;
          let sales_target_amount = parseInt(
            target.sales_target_amount.replace(',', ''),
          );
          let sales_made_amount = parseInt(
            target.sales_made_amount.replace(',', ''),
          );
          let percentage = 0;
          if (sales_target_amount != 0) {
            percentage = (sales_made_amount / sales_target_amount) * 100;
          }
          target.percentage = percentage;
          this.setState({
            target: target,
            graph: responseJson.data.graph,
            totalOrder: responseJson.data.total,
            paidOrder: responseJson.data.paid,
            pendingOrder: responseJson.data.pending,
            canclledOrder: responseJson.data.cancelled,
            graph_total_orders: total_orders_data,
            graph_data: total_orders_data,
            total_orders_pending_data: total_orders_pending_data,
          });
        } else if (responseJson.status == 401) {
          this.unauthorizedLogout();
        } else {
          console.log("eruuu$",responseJson)
          let message = responseJson.message;
          Alert.alert('Error', message);
        }
      });
  }
  unauthorizedLogout() {
    Alert.alert('Error', Constants.UnauthorizedErrorMsg);
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
  }

  ShowAllOrders() {
    let allorders = this.state.graph_total_orders;
    this.setState({
      selected_graph: 'all_orders',
      graph_data: allorders,
    });
    console.log('all orders sel ', this.state.selected_graph);
  }

  ShowPendingOrders() {
    let total_orders_pending_data = this.state.total_orders_pending_data;
    this.setState({
      selected_graph: 'pending_orders',
      graph_data: total_orders_pending_data,
    });
    console.log('pending_orders orders serl', this.state.selected_graph);
  }

  getGraphData(graph_lable, orders_data) {
    let graphdata = [];
    if (orders_data.length == 0) {
      return [];
    }
    graphdata.push({
      data: orders_data,
      // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    });
    let data = {
      labels: graph_lable,
      datasets: graphdata,
    };

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
    () =>
      this.setState({
        selectedStartDate: date,
      });
  }

  datePickerFun = () => {
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
    });
  };

  setDate = date => {
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    var timestamp = date.getTime();

    // let newdate = day + "/" + month + "/" + year;

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    let newdate = year + '-' + month + '-' + day;

    // filters.push({ key: 'create_time', value: date });
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
      date: newdate,
    });

    let sendDate = year + '/' + month + '/' + day;
    // var timestamp = Date.parse(new Date(sendDate));
    // console.log(sendDate + " is: " + timestamp);
    let url = Constants.dashboard + '?start_date=' + sendDate;
    console.log('url !!!!!!!!!!!!!!!!!!!!!!!!!!!!', url);
    this.getDashboardData(url);
  };
  hideDatePicker = () => {
    this.setState({
      // setDatePickerVisibility: !this.state.setDatePickerVisibility,
      isDatePickerVisible: !this.state.isDatePickerVisible,
    });
  };
  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    if (!this.state.totalOrder) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#2f2c7d" />
          <Text>Please wait...</Text>
        </View>
      );
    }
    return (
      <Scaffold>
        <View
          style={{
            width: width,
            backgroundColor: '#F0F0F0',
            alignItems: 'center',
            flex: 1,
            borderRadius: 10,
            flexDirection: 'column',
          }}>
          <Header navigation={this.props.navigation} />
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={{color: '#fff'}}
            color={'#fff'}
          />
          <DateTimePickerModal
            style={{backgroundColor: '#2f2c7d'}}
            themeVariant={'light'}
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            date={new Date()}
            maximumDate={new Date()}
            onConfirm={this.setDate}
            onCancel={this.hideDatePicker}
          />
          <ScrollView>
            <View style={{backgroundColor: '#F0F0F0'}}>
              <View style={[{}, styles.headerRowView]}>
                <View style={{flex: 1}}>
                  <Text
                    onPress={() => this.props.navigation.goBack()}
                    style={[{}, styles.headingText]}>
                    DASHBOARD
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'center'}}
                    onPress={() => this.datePickerFun()}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                      }}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../images/dashboard/calenderIcon.png')}
                      />
                      <Text
                        style={[{marginHorizontal: 50}, styles.calenderText]}>
                        {this.state.date == '' ? 'Today' : this.state.date}
                      </Text>
                      <Icon name="caret-down" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[{}, styles.cardContainer]}>
                <View style={[{}, styles.cardView]}>
                  <View style={[{backgroundColor: '#FFE5E5'}, styles.card]}>
                    <Image
                      style={{height: 40, width: 40}}
                      source={require('../images/dashboard/redbage.png')}
                    />
                    <Text
                      style={{
                        color: '#B1272C',
                        fontSize: 10,
                        fontFamily: 'Open Sans',
                      }}>
                      Total Order
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Open Sans',
                        fontWeight: 'bold',
                        color: '#4E4D4D',
                      }}>
                      {this.props.currency.currency}
                      {this.state.totalOrder.amount ?? '0.00'}
                    </Text>
                    <Text style={[{}, styles.recardtext]}>
                      {this.state.totalOrder.count ?? '0.00'}
                    </Text>
                  </View>
                </View>
                <View style={[{}, styles.cardView]}>
                  <View style={[{}, styles.card]}>
                    <Image
                      style={{height: 40, width: 40}}
                      source={require('../images/dashboard/greenbage.png')}
                    />
                    <Text
                      style={{
                        color: '#18A757',
                        fontSize: 10,
                        fontFamily: 'Open Sans',
                      }}>
                      Paid Orders
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Open Sans',
                        fontWeight: 'bold',
                        color: '#4E4D4D',
                      }}>
                      {this.props.currency.currency}
                      {this.state.paidOrder.amount ?? '0.00'}
                    </Text>
                    <Text style={[{}, styles.greencardtext]}>
                      {this.state.paidOrder.count ?? '0.00'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[{}, styles.cardContainer]}>
                <View style={[{}, styles.cardView]}>
                  <View style={[{backgroundColor: '#FFE5E5'}, styles.card]}>
                    <Image
                      style={{height: 40, width: 40}}
                      source={require('../images/dashboard/bluebage.png')}
                    />
                    <Text
                      style={{
                        color: '#2F2E7C',
                        fontSize: 10,
                        fontFamily: 'Open Sans',
                      }}>
                      Pending Orders
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Open Sans',
                        fontWeight: 'bold',
                        color: '#4E4D4D',
                      }}>
                      {this.props.currency.currency}
                      {this.state.pendingOrder.amount ?? '0.00'}
                    </Text>
                    <Text style={[{}, styles.bluecardtext]}>
                      {this.state.pendingOrder.count ?? '0.00'}
                    </Text>
                  </View>
                </View>
                <View style={[{}, styles.cardView]}>
                  <View style={[{}, styles.card]}>
                    <Image
                      style={{height: 40, width: 40}}
                      source={require('../images/dashboard/yellowbage.png')}
                    />
                    <Text
                      style={{
                        color: '#FDB72B',
                        fontSize: 10,
                        fontFamily: 'Open Sans',
                      }}>
                      Cancelled Orders
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Open Sans',
                        fontWeight: 'bold',
                        color: '#4E4D4D',
                      }}>
                      {this.props.currency.currency}
                      {this.state.canclledOrder.amount ?? '0.00'}
                    </Text>

                    <Text style={[{}, styles.yellowcardtext]}>
                      {this.state.canclledOrder.count ?? '0.00'}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingVertical: 20,
                  marginBottom: 10,
                  width: width - 30,
                  alignSelf: 'center',
                  borderRadius: 5,
                  paddingLeft: 10,
                }}>
                {/* <View style={[{}, styles.calenderbtn]}>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        this.state.selected_graph === 'all_orders'
                          ? '#FFE5E5'
                          : '#fff',
                      paddingHorizontal: 5,
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                      paddingVertical: 5,
                    }}
                    onPress={() => this.ShowAllOrders()}>
                    <Text
                      style={{
                        color:
                          this.state.selected_graph === 'all_orders'
                            ? '#B1272C'
                            : '#707070',
                        fontWeight: 'bold',
                      }}>
                      Total Orders{' '}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        this.state.selected_graph === 'pending_orders'
                          ? '#FFE5E5'
                          : '#fff',
                      paddingHorizontal: 5,
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                      paddingVertical: 5,
                    }}
                    onPress={() => this.ShowPendingOrders()}>
                    <Text
                      style={{
                        color:
                          this.state.selected_graph === 'pending_orders'
                            ? '#B1272C'
                            : '#707070',
                        fontWeight: 'bold',
                      }}>
                      Paid Orders{' '}
                    </Text>
                  </TouchableOpacity>
                </View> */}

                {/* {this.state.graph_data.length == 0 ? null : (
                  <ScrollView horizontal={true}>
                    <LineChart
                      data={this.state.graph_data}
                      width={Dimensions.get('window').width + 50} // from react-native
                      height={height / 3}
                      // paddingLeft={10}//////////////
                      style={{paddingHorizontal: -20, borderColor: '#fff'}}
                      alignSelf={'center'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      // yAxisLabel="N25M"
                      // yAxisSuffix=""
                      getDotColor={true}
                      withInnerLines={false}
                      formatYLabel={value =>
                        value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                      // formatYLabel={(value)=>{ this.toCommas('1233545')}}
                      // yAxisLabel={'$'}  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      // yAxisSuffix={' k'}
                      yAxisInterval={0} // optional, defaults to 1
                      chartConfig={{
                        backgroundColor: '#000',
                        marginLeft: -20,
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(177, 39, 44, ${opacity})`,
                        // color: (opacity = 1) => `rgba(225, 225, 225, 1)`,
                        // labelColor: (opacity = 1) => `rgba(177, 39, 44, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(78, 77, 77, 1)`,

                        style: {
                          borderRadius: 16,
                        },
                        propsForDots: {
                          r: '3',
                          strokeWidth: '1',
                          stroke: '#000',
                          // fill:'red',//transparent
                          // fillOpacity:0.7
                        },
                      }}
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                      }}
                    />
                  </ScrollView>
                )} */}
              </View>
              {/* <View style={[{}, styles.bannerView]}> */}
              {/* <View style={[{}, styles.bannerContentView]}>
                  <Text style={[{}, styles.bannerText]}>Monthly Sales</Text>
                  <Text style={[{}, styles.bannerboldText]}>
                    {this.props.currency.currency}
                    {this.state.target.sales_made_amount}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 3,
                      marginTop: 10,
                      width: width / 1.5,
                      position: 'relative',
                    }}>
                    <Text style={[{color: '#707070'}]}>
                      Target: {this.props.currency.currency}{' '}
                      {this.state.target.sales_target_amount}
                    </Text>
                    {this.state.target.percentage < 1 ||
                    isNaN(this.state.target.percentage) ? (
                      <Text
                        style={[
                          {position: 'absolute', right: 0, textAlign: 'center'},
                          styles.bannerpercentText,
                        ]}>
                        0%
                      </Text>
                    ) : (
                      <Text
                        style={[
                          {position: 'absolute', right: 0, textAlign: 'center'},
                          styles.bannerpercentText,
                        ]}>
                        {parseFloat(this.state.target.percentage + '').toFixed(
                          2,
                        )}
                        %
                      </Text>
                    )}
                  </View>
                </View> */}
              {/* <View style={[{}, styles.bannerImagetView]}>
                  <Image
                    style={{height: 60, width: 60}}
                    source={require('../images/dashboard/graph.png')}
                  />
                </View> */}
              {/* </View> */}
            </View>
          </ScrollView>

          <Modal visible={this.state.calenderModal} transparent={true}>
            <TouchableOpacity
              onPress={() => this.setState({calenderModal: false})}>
              <View
                style={{
                  height: height,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: width,
                    height: height / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transparent: false,
                    backgroundColor: '#fff',
                  }}>
                  <CalendarPicker
                    headerWrapperStyle={{backgroundColor: '#2f2c7d'}}
                    onDateChange={this.setDate}
                    selectedDayColor={'#000'}
                    selectedDayTextColor={'#2f2c7d'}
                    startDate={''}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <TabNav
            style={{position: 'absolute', bottom: 0}}
            screen={'dashboard'}
            props={this.props}
          />
        </View>
      </Scaffold>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    tabBar: state.tabBarReducer,
    currency: state.currencyReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: value => dispatch({type: SET_USER, value: value}),
    logoutUser: () => dispatch({type: LOGOUT_USER}),
    setTabBar: value => dispatch({type: UpdateTabbar, value: value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
