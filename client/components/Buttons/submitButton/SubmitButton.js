import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = props => {
  const { buttonName, handleSubmit, loading } = props;
  return (
    <View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : buttonName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#a0c9f5",
    padding: 10,
    borderRadius: 50,
    width: 250,
    alignSelf: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#0080ff",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default SubmitButton;
