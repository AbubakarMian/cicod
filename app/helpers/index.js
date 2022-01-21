/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getAsyncData=async()=>{
    let user = await AsyncStorage.getItem('User');
    console.log("asyncRE#",user)
    let me = JSON.parse(user);
    return me;
}