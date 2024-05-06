import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const InputField = props => {
  const {
    name,
    keyboardType,
    autoComplete,
    secureTextEntry,
    value,
    setValue
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.input}>
      <Text style={styles.inputText}>
        {name}
      </Text>
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.inputField, isFocused ? styles.inputFocus : null]}
        value={value}
        onChangeText={text => setValue(text)}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
    display: "flex",
    justifyContent: "center",
    marginLeft: 30,
    gap: 10
  },
  inputField: {
    shadowColor: "#a0c9f5",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: "#9acdff",
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    width: 350,
    height: 50,
    borderRadius: 5,
    fontSize: 18,
    paddingHorizontal: 10
  },
  inputFocus: {
    borderColor: "#0080ff"
  },
  inputText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0080ff"
  }
});

export default InputField;
