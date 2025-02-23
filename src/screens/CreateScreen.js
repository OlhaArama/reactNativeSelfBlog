import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard,
  StyleSheet 
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MenuIcon } from "../components/MenuIcon";
import { THEME } from "../theme";
import { addPost } from "../store/actions/post";
import { PhotoPicker } from "../components/PhotoPicker";

export const CreateScreen = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [imgUri, setImgUri] = useState("");

  const photoPickHandler = (uri) => {
    setImgUri(uri);
  };

  const saveHandler = () => {
    const newPost = {
      date: new Date().toJSON(),
      text,
      img: imgUri,
      booked: false,
    };

    dispatch(addPost(newPost));
    setText("");
    
    navigation.navigate("Main");
  };
  
  useEffect(() => {
      navigation.setOptions({
        headerTitle: "Створити пост",
        headerLeft: () => {
          return (
            <MenuIcon toggleMenu={ navigation.toggleDrawer } />
          )
        },
      });
    }, [navigation]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={ styles.wrapper }>
          <Text style={ styles.title }>
            Створи новий пост
          </Text>

          <TextInput
            style={ styles.textarea }
            placeholder="Введіть текст поста"
            multiline
            value={ text }
            onChangeText={ setText }
          />

          <PhotoPicker onPick={ photoPickHandler } />

          <Button
            title="Створити пост"
            color={ THEME.MAIN_COLOR }
            disabled={ !text || !imgUri }
            onPress={ saveHandler }
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    marginVertical: 10,
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  }
});
