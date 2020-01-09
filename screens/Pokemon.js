import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";
import Constants from "expo-constants";
import { Button } from "react-native-paper";

export default function Pokemon(props) {
  const [state, setState] = useState({
    loading: true,
    error: false,
    pokemonName: null,
    pokemonImage: null,
    pokemonDetails: null,
  });

  const getNavUrl = () => props.navigation.getParam("url");

  const fetchPokemonData = async () => {
    try {
      const url = getNavUrl() || "https://pokeapi.co/api/v2/pokemon/1/";
      const response = await fetch(url);
      const json = await response.json();

      const { name, sprites, types } = json;
      let img;
      if (sprites && sprites.front_default) {
        img = sprites.front_default;
      }
      const details = types.map(t => t.type.name);

      setState(previousState => {
        return {
          ...previousState,
          loading: false,
          pokemonName: name,
          pokemonImage: img,
          pokemonDetails: details,
        };
      });
    } catch (err) {
      setState(previousState => {
        return {
          ...previousState,
          loading: false,
          error: true,
        };
      });
    }
  };

  useEffect(function componentDidMount() {
    fetchPokemonData();
  }, []);

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
    <View style={styles.container}>
      <Text style={styles.text}>{state.pokemonName}</Text>
      <Image source={{ uri: state.pokemonImage }} style={styles.image} />
      <Button
        color="red"
        onPress={() => {
          const route = getNavUrl() ? "PokemonDetails" : "FavPokemonDetails";
          props.navigation.navigate(route, {
            details: state.pokemonDetails,
          });
        }}
      >
        Show details
      </Button>
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
  image: {
    height: 200,
    width: 200,
  },
});
