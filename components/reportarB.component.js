import React, { useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { supabase } from "../supabase";

const filter = (item, query) =>
  item.logradouro.toLowerCase().includes(query.toLowerCase());

export const ReportarB = ({ navigation }) => {
  const [logradouro, setLogradouro] = React.useState(null);
  const [data, setData] = React.useState([]);

  const [complemento, setComplemento] = React.useState("");
  const [detalhes, setDetalhes] = React.useState("");

  const [idProblema, setIdProblema] = React.useState();

  const [logradouroVisible, setLogradouroVisible] = React.useState(false);

  const finalizarReport = async () => {
    const foundObject = data.find((obj) => obj.logradouro === logradouro);

    if (foundObject) {
      const { data, error } = await supabase
        .from("reports")
        .insert([
          {
            problema: idProblema,
            logradouro: logradouro,
            complemento: complemento,
            detalhes: detalhes,
          },
        ])
        .select();

      if (data) {
        alert("Seu problema foi reportado com sucesso!");
        navigation.navigate("Home");
      }
    } else {
      setLogradouroVisible(true);
    }
  };

  const onSelect = useCallback(
    (index) => {
      setLogradouro(data[index].logradouro);
    },
    [data]
  );

  const onChangeText = useCallback((query) => {
    setLogradouro(query);
    if (query.length > 3) {
      fetchAddressData(query);
    }
    setData(data.filter((item) => filter(item, query)));
  }, []);

  function fetchAddressData(parametro) {
    const url = `https://viacep.com.br/ws/SP/Sorocaba/${parametro}/json/`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de endereço:", error);
      });
  }

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.logradouro} />
  );

  const setarProblema = async () => {
    let a = await SecureStore.getItemAsync("id_problema");
    setIdProblema(Number(a));
  };

  useEffect(() => {
    fetchAddressData("rua");
    setarProblema();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.viewHeader}>
          <Text style={styles.text} category="h2">
            Qual é o endereço que se encontra o problema encontrado?
          </Text>
        </View>
        <View View style={{ width: "100%", padding: 15 }}>
          <Modal
            visible={logradouroVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setLogradouroVisible(false)}
          >
            <Card disabled={true}>
              <Text style={{ padding: 15, marginBottom: 10 }} category="h6">
                É obrigatório colocar o logradouro!
              </Text>
              <Button
                status="danger"
                onPress={() => setLogradouroVisible(false)}
              >
                FECHAR
              </Button>
            </Card>
          </Modal>

          <Text category="h6">Selecione o Logradouro</Text>
          <Autocomplete
            style={styles.autocomplete}
            value={logradouro}
            placement="inner top"
            onSelect={onSelect}
            onChangeText={onChangeText}
            onEndEditing={() => fetchAddressData("rua")}
            size="large"
          >
            {data.map(renderOption)}
          </Autocomplete>
          <Text style={{ marginTop: 15 }} category="h6">
            Adicione um complemento
          </Text>
          <Input
            style={{ marginTop: 15 }}
            value={complemento}
            onChangeText={(nextValue) => setComplemento(nextValue)}
            size="large"
          />
          <Text style={{ marginTop: 15 }} category="h6">
            Adicione os detalhes do problema
          </Text>
          <Input
            style={{ marginTop: 15 }}
            value={detalhes}
            onChangeText={(nextValue) => setDetalhes(nextValue)}
            multiline={true}
            textStyle={styles.inputTextStyle}
          />
          <Button
            onPress={() => finalizarReport()}
            style={styles.button}
            status="success"
          >
            FINALIZAR REPORT
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: "rgba(0, 149, 255, 0.48)",
    alignItems: "center",
    padding: 12,
    paddingBottom: 30,
    paddingTop: 80,
    width: "100%",
  },
  autocomplete: {
    width: 365,
    marginTop: 15,
  },
  inputTextStyle: {
    minHeight: 64,
  },
  button: {
    marginTop: 15,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
