import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import Colors from "../Resource/Colors";
import Icons from "../Resource/Icons";
import FCM, { NotificationActionType } from "react-native-fcm";

import { registerKilledListener, registerAppListener } from "../Network/Listeners";
import firebaseClient from "../Network/FirebaseClient";
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }
  static navigationOptions = {
    header: null
  };
  async componentDidMount() {
    FCM.createNotificationChannel({
      id: 'default',
      name: 'Default',
      description: 'used for example',
      priority: 'high'
    })
    registerAppListener(this.props.navigation);
    FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      });
      if (notif && notif.targetScreen === "detail") {
        setTimeout(() => {
          this.props.navigation.navigate("Detail");
        }, 500);
      }
    });

    try {
      let result = await FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true
      });
    } catch (e) {
      console.error(e);
    }

    FCM.getFCMToken().then(token => {
     
      console.log("TOKEN (getFCMToken)", token);
      this.setState({ token: token || "" });
    });

    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN (getFCMToken)", token);
      });
    }

    // topic example
    // FCM.subscribeToTopic('sometopic')
    // FCM.unsubscribeFromTopic('sometopic')
  }
  //redirect home page
  doLogin() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }
  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  doBack(){
    this.props.navigation.goBack();
  }

  render() {
    const width=Dimensions.get('screen').width;
    const height=Dimensions.get('screen').height;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={Icons.ic_logo} />
        </View>
        <View style={styles.textField}>
          <View style={{marginBottom:10}}>
            <TextInput
              onChangeText={username => this.setState({ userName: username })}
              style={[
                styles.editText,
                {
                  fontFamily:'OpenSans-Bold',
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              keyboardType="email-address"
              placeholder={"User name"}
              placeholderTextColor={Colors.white}
              selectionColor={Colors.white}
              underlineColorAndroid={Colors.transparent}
            />
            <Text style={[styles.editText, styles.labelName,{fontFamily:'OpenSans-SemiBold',}]}>USERNAME</Text>
          </View>

          <View>
            <TextInput
              onChangeText={password => this.setState({ password: password })}
              style={[
                styles.editText,
                {
                  fontFamily:'OpenSans-Bold',
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                  paddingBottom: 5
                }
              ]}
              keyboardType="ascii-capable"
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={Colors.white}
              selectionColor={Colors.white}
              underlineColorAndroid={Colors.white}
            />
          </View>
          <Text style={[styles.editText, styles.labelName,{fontFamily:'OpenSans-SemiBold'}]}>PASSWORD</Text>
        </View>

         <View style={{ flexDirection: "row", justifyContent: "center",marginBottom:30 }}>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.doBack.bind(this)}>
              <View style={styles.backbutton}>
                <Text style={[styles.buttonText,{fontFamily:'JosefinSans-Bold'}]}>BACK</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.doLogin.bind(this)}>
              <View style={styles.button}>
                <Text style={[styles.buttonText,{fontFamily:'JosefinSans-Bold'}]}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundLogin,
    flex: 1
  },
  logo: {  marginTop:80,justifyContent: "center", alignItems: "center" },
  logoImage: { height: 100, width: 110 },
  textField: {
    flex: 1,
    marginRight: "10%",
    marginLeft: "10%",
    justifyContent: "center"
  },
  labelName: { fontSize: 14, marginTop: 5 },
  buttonView: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    marginBottom: "10%",
    backgroundColor: Colors.white,
    marginLeft:10,
   width:Dimensions.get('screen').width/2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  backbutton: {
    marginBottom: "10%",
    marginRight:10,
    backgroundColor: Colors.white,
    width:Dimensions.get('screen').width/2,

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  buttonText: {
    textAlign:'center',
    fontSize: 18,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: "15%",
    paddingRight: "15%",
    color: Colors.backgroundLogin
  },
  editText: { color: Colors.white, fontSize: 18 }
});
export default LoginScreen;
