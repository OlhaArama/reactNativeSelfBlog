import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MenuIcon } from "../components/MenuIcon";

export const AboutScreen = ({}) => {
  const navigation = useNavigation();

  useEffect(() => {
      navigation.setOptions({
        headerTitle: "Про блог",
        headerLeft: () => {
          return (
            <MenuIcon toggleMenu={ navigation.toggleDrawer } />
          )
        },
      });
    }, [navigation]);

  return (
    <View style={ styles.center }>
      <Text style={ styles.text }>Це найкращий додаток для створення власного блогу</Text>
      <Text style={ styles.text }>Версія додатку <Text style={ styles.version}>1.0.0</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans-regular",
  },
  version: {
    fontFamily: "open-sans-bold",
  }
});
