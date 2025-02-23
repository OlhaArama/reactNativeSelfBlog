import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Post } from "../components/Post";

export const PostsList = ({ data, onOpen }) => {
  if (!data.length) {
    return (
      <View style={ styles.wrapper }>
        <Text style={ styles.noItems}>
          Постів поки немає
        </Text>
      </View>
    );
  }

  return (
    <View style={ styles.wrapper }>
      <FlatList
        data={ data }
        keyExtractor={ post => post.id?.toString() }
        renderItem={({ item }) => <Post post={ item } onOpen={ onOpen } />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    marginVertical: 10,
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    textAlign: "center",
  },
});
