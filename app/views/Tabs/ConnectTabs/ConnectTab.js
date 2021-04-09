import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';

import ConnectTab from "../ConnectTabs/ConnectTab";





 
// const SecondRoute = () => (
//   <GridTab/>
// );
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function TabViewExample (props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '#' ,  navigation:props.navigation  },
  
  ]);

  const renderScene = SceneMap({
    first: ConnectTab,
  
    
  });
  const navigation=props.navigation
    const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'purple' }} 
      activeColor={'purple'}
      inactiveColor={'darkblue'}
      style={{ backgroundColor: '#fff',}}
      labelStyle={{
        
        fontSize:8,
        fontWeight:'bold',
      
      }}/>
      );
  return(
    <TabView
      // navigation={props.navigation} 
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});