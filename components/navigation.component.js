import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./home.component";
import { DetailsScreen } from "./details.component";
import { ReportarA } from "./reportarA.component";
import { ReportarB } from "./reportarB.component";
import { Noticias } from "./noticias.component";
import { ConteudoNoticia } from "./ConteudoNoticia.component";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
    <Screen name="ReportarA" component={ReportarA} />
    <Screen name="ReportarB" component={ReportarB} />
    <Screen name="Noticias" component={Noticias} />
    <Screen name="ConteudoNoticia" component={ConteudoNoticia} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
