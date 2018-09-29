import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  background: { height: "100%", width: "100%" },
  mainView: {
    position: "absolute",
    backgroundColor: Colors.white,
    width: Dimensions.get("screen").width,
    height: "15%",
    bottom: "5%"
  },
  buttonTopView: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center"
  },
  buttonLogin: {
    marginRight: 5,
    width: Dimensions.get("screen").width / 2,
    height: "80%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.backgroundLogin,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonSignUp: {
    marginLeft: 5,
    width: Dimensions.get("screen").width / 2,
    height: "80%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.red,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignContent: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign:'center',
    fontSize: 18,
    color: Colors.white
  },
  TouchableOpacityView: {
    flex: 1
  }
});

export default styles;
