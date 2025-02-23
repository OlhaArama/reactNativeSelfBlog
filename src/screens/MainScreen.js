import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ActivityIndicator, Platform, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME } from "../theme";
import { loadPosts } from "../store/actions/post";
import { PostsList } from "../components/PostsList";
import { MenuIcon } from "../components/MenuIcon";

export const MainScreen = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.post.allPosts);

  const openPostHandler = (post) => {
    navigation.navigate("Post", { postId: post.id, date: post.date });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ionicons
            onPress={ () => navigation.navigate("Create") }
            style={ styles.iconRight }
            name="camera"
            size={ 24 }
            color={ Platform.OS === "android"
              ? "#fff"
              : THEME.MAIN_COLOR}
          />
        )
      },
      headerLeft: () => {
        return (
          <MenuIcon toggleMenu={ navigation.toggleDrawer } />
        )
      },
    });
  }, [navigation, allPosts]);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  return (
    <PostsList data={ allPosts } onOpen={ openPostHandler } />
  );
};

const styles = StyleSheet.create({
  iconRight: {
    marginRight: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
