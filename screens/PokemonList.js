import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { Button } from "react-native-paper";

function ListButton(props) {
  const onPress = () => {
    props.navigation.navigate("Pokemon", {
      url: props.url,
    });
  };

  return (
    <Button color="red" onPress={onPress}>
      {props.text}
    </Button>
  );
}

export default function PokemonList(props) {
  const [state, setState] = useState({
    loading: true,
    error: false,
    pokemons: [],
  });

  useEffect(function componentDidMount() {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      ); // 20 makes most sense, but try out more results to see RN performance!
      const json = await response.json();
      const { results } = json;
      setState(previousState => {
        return { ...previousState, loading: false, pokemons: results };
      });
    } catch (err) {
      setState(previousState => {
        return { ...previousState, loading: false, error: true };
      });
    }
  };

  const keyExtractor = (_item, index) => `${index}`;

  const renderPokemon = ({ item }) => {
    // we have to manually pass navigation
    return (
      <ListButton
        text={item.name}
        url={item.url}
        navigation={props.navigation}
      />
    );
  };

  if (state.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="red" />
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.listContainer}
      keyExtractor={keyExtractor}
      data={state.pokemons}
      renderItem={renderPokemon}
    />
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
    margin: 5,
  },
  listContainer: {
    backgroundColor: "white",
  },
});
