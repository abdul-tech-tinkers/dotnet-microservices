import { Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import NavigationScreen from "./NavigationScreen";
import HeaderScreen from "./HeaderScreen";
import ProductListScreen from "./Products/ProductListScreen";
import ProductTabScreen from "./Products/ProductTabScreen";

const HomeScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  return (
    <Grid
      minH="100vh"
      templateAreas={`"nav header"
                      "nav Main"
                      "nav Main"`}
      gap="1"
      templateRows="45px 1fr auto"
      templateColumns="175px 1fr"
    >
      <GridItem area={"header"}>
        <HeaderScreen />
      </GridItem>
      <GridItem area={"nav"}>
        <NavigationScreen onSelected={(item) => setSelectedMenu(item)} />
      </GridItem>
      <GridItem area={"Main"}>
        <ProductTabScreen />
      </GridItem>
    </Grid>
  );
};

export default HomeScreen;
