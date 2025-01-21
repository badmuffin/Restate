import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  const handleLogin = () => {};

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Image
          style={styles.onBoardImage}
          source={images.onboarding}
          resizeMode="contain"
        />
        <View style={styles.introView}>
          <Text style={styles.introText}>Welcome To Restate</Text>
          <Text style={styles.primaryHeading}>
            Let's Get You Closer to {"\n"}
            <Text style={styles.mainTitle}>Your Ideal Home</Text>
          </Text>

          {/* Login text */}
          <Text style={styles.loginText}>Login to ReState with Google</Text>

          <TouchableOpacity style={styles.btnStyle} onPress={handleLogin}>
            <View style={styles.googleImgView}>
              <Image
                style={styles.googleImg}
                source={icons.google}
                resizeMode={"contain"}
              />
              <Text>Continue With Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: "white",
    height: "100%",
  },
  contentContainerStyle: {
    height: "100%",
  },
  onBoardImage: {
    width: "100%",
    height: "66%",
  },
  introView: {
    paddingHorizontal: 40,
  },
  introText: {
    fontSize: 12,
    lineHeight: 24,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Rubik-Regular",
    color: "#666876",
  },
  primaryHeading: {
    color: "#191D31",
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    textAlign: "center",
    marginTop: 2,
  },
  mainTitle: {
    color: "#0061FF",
  },
  loginText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
    color: "#666876",
    marginTop: 40,
  },
  btnStyle: {
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
    paddingVertical: 16,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 24
  },
  googleImgView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  googleImg: {
    height: 20,
    width: 20,
  },
});

export default SignIn;
