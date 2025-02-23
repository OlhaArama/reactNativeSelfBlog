import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View, Text, Image, Button, Alert, Platform, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME } from "../theme";
import { deletePost, toggleBooked } from "../store/actions/post";

export const PostScreen = ({ route: { params }}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const allPosts = useSelector(state => state.post.allPosts);
  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === params.postId));
  const post = allPosts.find(item => item.id === params.postId);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Пост від " + new Date(params.date).toLocaleDateString(),
      headerRight: () => {
        return (
          <Ionicons
            onPress={ toggleBookedHandler }
            style={ styles.iconRight }
            name={ booked ? "star" : "star-outline" }
            size={ 24 }
            color={ Platform.OS === "android"
              ? "#fff"
              : THEME.MAIN_COLOR}
          />
        )
      },
    });
  }, [navigation, booked]);

  const toggleBookedHandler = () => {
    dispatch(toggleBooked(post))
  };

  const removeHandler = () => {
    Alert.alert(
      "Видалення поста",
      "Ви точно хочете видалити пост?",
      [
        {
          text: "Відмінити",
          style: "cancel",
        },
        {
          text: "Видалити",
          style: "destructive",
          onPress: () => {
            dispatch(deletePost(params.postId));

            navigation.goBack();
          },
        }
      ],
      { cancelable: false },
    );
  };

  if(!post) {
    return null;
  } 

  return (
    <ScrollView>
      <Image 
        source={ {uri: post.img} }
        style={ styles.image }
      />

      <View style={ styles.textWrap }>
        <Text style={ styles.title }>
          { post.text }
        </Text>
      </View>

      <Button
        title="Видалити"
        color={ THEME.DANGER_COLOR }
        onPress={ removeHandler }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-regular",
  },
  iconRight: {
    marginRight: 10,
  },
});
