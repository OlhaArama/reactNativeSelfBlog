import React from "react";
import { Platform, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME } from "../theme";

export const MenuIcon = ({ toggleMenu }) => {
  return (
    <Ionicons
        onPress={ toggleMenu }
        style={ styles.iconLeft }
        name="menu"
        size={ 24 }
        color={ Platform.OS === "android"
          ? "#fff"
          : THEME.MAIN_COLOR}
      />
  );
};

const styles = StyleSheet.create({
  iconLeft: {
    marginLeft: 10,
    marginRight: 20,
  }
});
