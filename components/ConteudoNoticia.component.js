import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

export const ConteudoNoticia = ({ navigation, route }) => {
  const { noticia } = route.params;
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.viewHeader}>
          <Text style={styles.text} category="h2">
            {noticia.titulo}
          </Text>
        </View>
        <ScrollView style={{ paddingBottom: 230 }}>
          <Image
            style={{ width: width, aspectRatio: 16 / 9, marginBottom: 10 }}
            source={{ uri: noticia.imagem }}
          />
          <Text
            style={{
              paddingHorizontal: 10,
              marginBottom: 10,
              textAlign: "justify",
            }}
          >
            {noticia.conteudo}
          </Text>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    margin: 2,
  },
  image: {
    width: 120,
    height: 100,
    resizeMode: "cover",
    backgroundColor: "blue",
  },
  viewHeader: {
    backgroundColor: "rgba(0, 149, 255, 0.48)",
    alignItems: "center",
    padding: 12,
    paddingBottom: 30,
    paddingTop: 80,
    width: "100%",
  },
  card: {
    width: 400,
    height: 150,
    marginTop: 10,
  },
});
