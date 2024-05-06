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
import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/Buttons/submitButton/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const {
        data
      } = await axios.post("http://172.28.224.1:8080/api/v1/auth/login", {
        email,
        password
      });
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      console.log("registered", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  //temp function for testing local storage
  const getLocalStorage = async () => {
    const data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage==>", data);
  };
  getLocalStorage();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <InputField
        name="Email"
        keyboardType="email-address"
        autoComplete="email"
        value={email}
        setValue={setEmail}
      />
      <InputField
        name="Password"
        secureTextEntry={true}
        autoComplete="password"
        value={password}
        setValue={setPassword}
      />
      {/* <Text>
        {JSON.stringify({ name, email, password }, null, 2)}
      </Text> */}
      <SubmitButton
        handleSubmit={handleSubmit}
        buttonName="Login"
        loading={loading}
      />
      <View>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.text}>Account doesn't exist? Register</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate("Forgot")}>
          <Text style={styles.text}>Forgot Password?</Text>
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

export default Login;
