import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import styles from "../Resource/Styles";

class LoginTypeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }

  render() {
    const width=Dimensions.get('screen').width;
    const height=Dimensions.get('screen').height;
    return (
      <View>
        <ImageBackground style={{width:width,height:height}} source={Icons.ic_login_bg}>
          <View style={styles.mainView}>
            <View style={styles.buttonTopView}>
              <TouchableOpacity onPress={this.doRedirect.bind(this, "Login")}>
                <View style={styles.buttonLogin}>
                  <Text style={[styles.buttonText,{fontFamily:'JosefinSans-Bold'}]}>LOGIN</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.doRedirect.bind(this, "SignUp1")}>
                <View style={styles.buttonSignUp}>
                  <Text style={[styles.buttonText,{fontFamily:'JosefinSans-Bold'}]}>SIGN UP</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default LoginTypeScreen;
