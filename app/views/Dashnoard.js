import React from 'react'
import { View, ImageBackground, Text, Modal, TouchableHighlight, Dimensions, Image, Platform, TouchableOpacity, ScrollView, TouchableNativeFeedback } from 'react-native'
import splashImg from '../images/splash.jpg'
import styles from '../css/DashboardCss';
import Header from '../views/Header';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
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
export default class Dashnoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            calenderModal: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }
    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{ height: height, width: width, alignItems: 'center', position: 'relative', backgroundColor: '#F0F0F0', }}>
                <Header />
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
                        <View style={[{},styles.cardContainer]}>
                            <View style={[{},styles.cardView]}>
                               <View style={[{},styles.card]}>
                                 <Image 
                                 source={require('../images/dashboard/redbage.png')}
                                 />
                                 <Text style={{color:'#B1272C',fontSize:10}}>Total Orders</Text>
                                 <Text style={{fontWeight:'bold',color:'#4E4D4D'}}>₦14,500,000</Text>
                                 <Text style={[{},styles.recardtext]}>34</Text>
                               </View>
                            </View>
                            <View style={[{},styles.cardView]}>
                            <View style={[{},styles.card]}>
                            <Image 
                                 source={require('../images/dashboard/greenbage.png')}
                                 />
                                 <Text style={{color:'#18A757',fontSize:10}}>Paid Orders</Text>
                                 <Text style={{fontWeight:'bold',color:'#4E4D4D'}}>₦7,000,000</Text>
                                 <Text style={[{},styles.greencardtext]}>15</Text>
                                 </View>
                            </View>
                        </View>
                        <View style={[{},styles.cardContainer]}>
                            <View style={[{},styles.cardView]}>
                               <View style={[{},styles.card]}>
                                 <Image 
                                 source={require('../images/dashboard/bluebage.png')}
                                 />
                                 <Text style={{color:'#2F2E7C',fontSize:10}}>Total Orders</Text>
                                 <Text style={{fontWeight:'bold',color:'#4E4D4D'}}>₦14,500,000</Text>
                                 <Text style={[{},styles.bluecardtext]}>34</Text>
                               </View>
                            </View>
                            <View style={[{},styles.cardView]}>
                            <View style={[{},styles.card]}>
                            <Image 
                                 source={require('../images/dashboard/yellowbage.png')}
                                 />
                                 <Text style={{color:'#FDB72B',fontSize:10}}>Paid Orders</Text>
                                 <Text style={{fontWeight:'bold',color:'#4E4D4D'}}>₦7,000,000</Text>
                                 <Text style={[{},styles.yellowcardtext]}>15</Text>
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
                            <LineChart
                                data={{
                                    labels: ["8th", "9th", "11th", "12th", "13th", "14th"],
                                    datasets: [
                                        {
                                            data: [
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100,
                                                Math.random() * 100
                                            ]
                                        }
                                    ]
                                }}
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
                        </View>
                        <View style={[{}, styles.bannerView]}>
                            <View style={[{},styles.bannerContentView]}>
                              <Text style={[{},styles.bannerText]}>Monthly Sales</Text>
                              <Text style={[{},styles.bannerboldText]}>₦55,500,000</Text>
                              <Text style={[{},styles.bannerboldText]}>Target: ₦2,067,026</Text>
                              <Text style={[{},styles.bannerpercentText]}>
                                  75%
                              </Text>
                              <Progress.Bar color="#B1272C" backgroundColor="#fff"  progress={0.75} width={200} />
                            </View>
                            <View style={[{},styles.bannerImagetView]}>
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
