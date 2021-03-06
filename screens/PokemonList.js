import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import Constants from "expo-constants";
import { Button } from "react-native-paper";

class ListButton extends React.PureComponent {
  onPress = () => {
    this.props.navigation.navigate('Pokemon', {
      url: this.props.url,
    });
  };

  render() {
    return (
      <Button color="red" onPress={this.onPress}>
        {this.props.text}
      </Button>
    );
  }
}

export default class PokemonList extends React.Component {
  state = {
    loading: true,
    error: false,
    pokemons: []
  };

  fetchPokemons = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20"
      ); // 20 makes most sense, but try out more results to see RN performance!
      const json = await response.json();
      const { results } = json;
      this.setState({
        loading: false,
        pokemons: results
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  componentDidMount() {
    this.fetchPokemons();
  }

  renderPokemon = ({ item }) => {
    // we have to manually pass navigation
    return (
      <ListButton text={item.name} url={item.url} navigation={this.props.navigation} />
    );
  };

  keyExtractor = (item, index) => index;

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="red" />
        </View>
      );
    }

    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Error</Text>
        </View>
      );
    }
    return (
      <FlatList
        style={styles.listContainer}
        keyExtractor={this.keyExtractor}
        data={this.state.pokemons}
        renderItem={this.renderPokemon}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 5
  },
  listContainer: {
    backgroundColor: "white"
  }
});