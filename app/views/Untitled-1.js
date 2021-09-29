<View style={{ backgroundColor: 'white',width:width/1.5,padding:10,justifyContent:'center',alignSelf:'center'}}>
                                        {/* <Text>{item.name}</Text> */}
                                        <Text style={{fontSize:15,fontWeight:'bold',marginBottom:15}}>{item.name}</Text>
                                        <View style={{flexDirection:'column',}}>
                                        <CheckBox
                                            style={[{marginLeft:30 }, styles.cheBox]}
                                            onClick={() => {
                                                this.setState({
                                                    add_variation: !this.state.add_variation
                                                })
                                            }}
                                            isChecked={this.state.add_variation}
                                            rightText={item.red}
                                        />
                                        <CheckBox
                                            style={[{ marginLeft:30 }, styles.cheBox]}
                                            onClick={() => {
                                                this.setState({
                                                    add_variation: !this.state.add_variation
                                                })
                                            }}
                                            isChecked={false}
                                            rightText={item.black}
                                        />
                                        <CheckBox
                                            style={[{marginLeft:30 }, styles.cheBox]}
                                            onClick={() => {
                                                this.setState({
                                                    add_variation: !this.state.add_variation
                                                })
                                            }}
                                            isChecked={this.state.add_variation}
                                            rightText={item.green}
                                        />    
                                        </View>
                                    </View>



{"key": "brand", "value": [{"created_by": "DiageoPlc -", "date_created": "2021-07-14 09:30:58", "id": 22, "is_active": true, "name": "brand", "value": "Wide fit"}]}