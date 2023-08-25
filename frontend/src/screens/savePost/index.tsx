import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";
import { AppDispatch } from "../../redux/store";

interface SavePostScreenProps {
  route: RouteProp<RootStackParamList, "savePost">;
  navigation: NativeStackNavigationProp<RootStackParamList, "savePost">;
}

export default function SavePostScreen({ route }: SavePostScreenProps) {
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();

  const dispatch: AppDispatch = useDispatch();
  const handleSavePost = () => {
    setRequestRunning(true);
    dispatch(
      createPost({
        description,
        video: route.params.source,
        thumbnail: route.params.sourceThumb,
      })
    )
      .then(() => navigation.dispatch(StackActions.popToTop()))
      .catch(() => setRequestRunning(false));
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={150}
          multiline
          onChangeText={(text) => setDescription(text)}
          placeholder="Describe your video"
        />
        <Image
          style={styles.mediaPreview}
          source={{ uri: route.params.source }}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSavePost()}
          style={styles.postButton}
        >
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
