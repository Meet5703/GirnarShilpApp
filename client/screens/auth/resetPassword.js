import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/Buttons/submitButton/SubmitButton";
import axios from "axios";
import Link from "../../components/Buttons/LinksForRedirection/Link";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Reset = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      setLoading(false);

      const {
        data
      } = await axios.post(
        "http://172.28.224.1:8080/api/v1/auth/resetpassword",
        {
          password,
          email
        }
      );
      console.log("Reset Initiated", { password });
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getLocalStorage = async () => {
    const data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage Reset==>", data);
  };
  getLocalStorage();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Reset Password</Text>
      <InputField
        name="Password"
        secureTextEntry={true}
        autoComplete="password"
        value={password}
        setValue={setPassword}
      />
      <InputField
        name="Email"
        autoComplete="email"
        value={email}
        setValue={setEmail}
      />
      {/* <Text>
        {JSON.stringify({ name, password, password }, null, 2)}
      </Text> */}
      <SubmitButton
        handleSubmit={handleSubmit}
        buttonName="Reset Password"
        loading={loading}
      />
      <View>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.text}>Account doesn't exist? Register</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#0080ff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E1F1FF"
  },
  pageTitle: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
    textShadowColor: "#a0c9f5",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0080ff"
  }
});

export default Reset;
