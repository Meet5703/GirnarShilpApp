import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/Buttons/submitButton/SubmitButton";
import axios from "axios";
import Link from "../../components/Buttons/LinksForRedirection/Link";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const {
        data
      } = await axios.post("http://172.28.224.1:8080/api/v1/auth/register", {
        name,
        email,
        password
      });
      alert(data && data.message);
      console.log("registered", { name, email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "#E1F1FF" }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Register</Text>
        <InputField
          name="Name"
          keyboardType="default"
          autoComplete="name"
          value={name}
          setValue={setName}
        />
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
          buttonName="Register"
          loading={loading}
        />
        <View>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text}>Account already exist? Login</Text>
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate("Forgot")}>
            <Text style={styles.text}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#0080ff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    alignItems: "center",
    marginTop: 120,
    marginLeft: 0,
    marginRight: 20,
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

export default Register;
