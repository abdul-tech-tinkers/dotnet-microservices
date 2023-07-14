import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import NavigationScreen from "./NavigationScreen";
import HeaderScreen from "./HeaderScreen";

const HomeScreen = () => {
  return (
    <Grid
      minH="100vh"
      templateAreas={`"nav header"
                      "nav Main"
                      "nav footer"`}
      gap="1"
      templateRows="45px 1fr auto"
      templateColumns="175px 1fr"
    >
      <GridItem area={"header"}>
        <HeaderScreen />
      </GridItem>
      <GridItem area={"nav"}>
        <NavigationScreen />
      </GridItem>
      <GridItem bg="green.300" area={"Main"}>
        Main
      </GridItem>
      <GridItem bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default HomeScreen;
