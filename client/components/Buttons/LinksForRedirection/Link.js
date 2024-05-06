import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const Link = ({ name, link, navigation }) => {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate(link)}>
        <Text style={styles.text}>
          {name}
        </Text>
      </Pressable>
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
  }
});
export default Link;
