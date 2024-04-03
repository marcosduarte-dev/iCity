import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import NavBar from "./NavBar";

const Carrinho = ({ route, navigation }) => {
  const carrinhoItens = route.params.carrinhoItens;

  const budgetCalculator = () => {
    let total = 0;
    carrinhoItens.forEach((item) => {
      total += Number(item.preco);
      total = Math.round(total * 100) / 100;
    });
    return total;
  };

  const finalizarPedido = () => {
    console.log("Pedido Finalizado!")
    alert('Pedido Enviado aos Garçons! Em breve seu pedido será entregue.')
  };

  return (
    <ScrollView style={styles.bg_black}>
      <NavBar navigation={navigation} nome="Carrinho" />
      {carrinhoItens && carrinhoItens.length > 0 ? (
        <View style={{ padding: 15}}>
          {carrinhoItens.map((item) => (
            <View key={item.id} style={styles.view}>
              <Text style={styles.text}>{item.quantidade}x</Text>
              <Text style={styles.text} >{item.nome}</Text>
              <Text style={styles.text}>Preço: R$ {item.preco}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={[styles.text, { padding: 15 }]}>
          Nenhum item no carrinho
        </Text>
      )}
      <View style={styles.viewPagamento}>
        <Text style={styles.text}>Total: R$ {budgetCalculator()}</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable
          style={[styles.button, { backgroundColor: "blue" }]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.btn_text_imagem}>Escolher Mais</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            finalizarPedido();
          }}
        >
          <Text style={styles.btn_text_imagem}>Pedir</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 15,
    padding: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    display: "flex",
    flexWrap: 'wrap',
    justifyContent: "space-between",
    backgroundColor: "#091014",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bg_black: {
   backgroundColor: "#091014",
    minHeight: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    flexWrap: 'wrap',
  },
  titulo: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    marginTop: 20,
  },
  viewPagamento: {
    marginBottom: 15,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#091014",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#006b3b",
    marginTop: 15,
  },
  container: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 10,
    fontSize: 16,
    width: "100%",
    backgroundColor: "grey",
  },
  inputMenor: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 8,
    fontSize: 16,
    width: "45.5%",
    backgroundColor: "grey",
  },
  btn_text_imagem: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    minWidth: "100%",
    marginBottom: 50,
  },
});

export default Carrinho;
