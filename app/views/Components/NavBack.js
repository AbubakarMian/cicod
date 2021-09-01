import React from "react";
import {  TouchableOpacity,View,Text} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from '../../css/BuyersViewCss';
const NavBack=({title,onClick})=>(
    <TouchableOpacity
                            onPress={() => onClick()}
                        >
                    <View style={[{}, styles.backRowView]}>
                       
                            <Icon name="arrow-left" size={25} color={'#929497'} />
                       
                        <View style={[{}, styles.backRowHeadingView]}>
                            <Text style={[{}, styles.backRowHeadingText]}>{title}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
)

export default NavBack;