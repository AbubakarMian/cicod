import React from 'react'
import { View, ImageBackground, ScrollView, TouchableHighlight, FlatList, Dimensions, Image, Platform, TouchableOpacity, Touchable } from 'react-native'
import splashImg from '../images/splash.jpg'
import { Text, TextInput, Alert } from 'react-native-paper';
import styles from '../css/AddNoteCss';
import fontStyles from '../css/FontCss'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../views/Header';
import CheckBox from 'react-native-check-box';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchBar from 'react-native-search-bar';
import { SET_NOTES } from '../redux/constants';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChecked: false,
            notestext: '',
        }
    }
    setNotes() {
        console.log('notes props !!!!!!!!', this.state.notestext);
        this.props.setNotes({
            notes: this.state.notes
        })
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={[{}, styles.mainView]}>
                <Header navigation={this.props.navigation} />
                <View style={[{}, styles.backHeaderRowView]}>
                    <TouchableOpacity
                        // onPress={() => this.props.navigation.navigate('CreateOrder')}
                        onPress={() => this.props.navigation.goBack()}

                    >
                        <Icon name="arrow-left" size={25} color="#929497" />
                    </TouchableOpacity>
                    <View style={[{}, styles.backHeadingView]}>
                        <Text style={[{}, styles.backHeadingText]}>ADD NOTE</Text>
                    </View>
                </View>

                <View style={[{}, styles.mainContentView]}>

                    <View>

                        <TextInput
                            onChangeText={text => this.setState({ notestext: text })} //this.setState({ notestext: text })
                            label="Add note to this order"
                            style={{ backgroundColor: 'transparent', }}
                            width={width - 50}
                            alignSelf={'center'}
                            color={'#000'}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.setNotes()}
                    style={[{}, styles.btnView]}
                >
                    <Text style={{ color: '#fff' }}>Done</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        notes: state.orderNotesReducer,

    }
};
function mapDispatchToProps(dispatch) {
    return {
        setNotes: (value) => dispatch({ type: SET_NOTES, value: value }),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNote)
