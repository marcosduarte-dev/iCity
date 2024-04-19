import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Card,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { supabase } from "../supabase";

export const Noticias = ({ navigation }) => {
  const [data, setData] = useState([]);

  const maximoCaracteres = 150;

  const fetchData = async () => {
    let { data: noticias, error } = await supabase.from("noticias").select("*");

    setData(noticias);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateDetails = () => {
    navigation.navigate("ReportarA");
  };

  const cards = data.map((item, index) => {
    const conteudo =
      item.conteudo.length > maximoCaracteres
        ? `${item.conteudo.substring(0, maximoCaracteres)}...`
        : item.conteudo;

    const handleCardPress = (item) => {
      navigation.navigate("ConteudoNoticia", { noticia: item });
    };

    return (
      <Card
        key={index}
        style={styles.card}
        status={item.status}
        onPress={() => handleCardPress(item)}
      >
        <View style={{ padding: 0 }}>
          <Text category="h5">{item.titulo}</Text>
          <Text style={{ width: 350 }} category="s1">
            {conteudo}
          </Text>
        </View>
      </Card>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.viewHeader}>
          <Text style={styles.text} category="h2">
            Estas São as Ultimas Noticias Postadas Pela Prefeitura!
          </Text>
        </View>
        <View>{cards}</View>
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
