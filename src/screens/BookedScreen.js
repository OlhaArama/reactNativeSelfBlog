import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { PostsList } from "../components/PostsList";
import { MenuIcon } from "../components/MenuIcon";

export const BookedScreen = ({}) => {
  const navigation = useNavigation();

  const openPostHandler = (post) => {
    navigation.navigate("Post", { postId: post.id, date: post.date });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Вибране",
      headerLeft: () => {
        return (
          <MenuIcon toggleMenu={ navigation.toggleDrawer } />
        )
      },
    });
  }, [navigation]);

    const bookedPosts = useSelector(state => state.post.bookedPosts);

  return (
    <PostsList
      data={ bookedPosts }
      onOpen={ openPostHandler }
    />
  );
};
