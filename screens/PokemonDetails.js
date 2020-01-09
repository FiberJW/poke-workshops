import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import "regenerator-runtime";

export default function PokemonDetails(props) {
  // we have to get details from navigation params, not props
  // under the hood it is this.props.navigation.state.params
  const details = props.navigation.getParam("details");
  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {details.map((detail, index) => (
        <Text style={styles.text} key={index}>
          {detail}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
