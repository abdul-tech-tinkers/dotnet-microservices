import {
  Box,
  Center,
  SimpleGrid,
  Spinner,
  VStack,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import AppText from "../components/AppText";

const Dashboard = () => {
  const isloading = false;
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "gray.900" : "gray.50";
  if (isloading) {
    return (
      <Center ml={5} mt={5} justifyContent="start" alignContent="flex-start">
        <Spinner />
      </Center>
    );
  }
  return (
    <SimpleGrid columns={2} spacingX="40px" spacingY="20px" mt={25}>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="150px">250</AppText>
          <AppText fontSize="50px">Inventories</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="150px">125</AppText>
          <AppText fontSize="50px">Daily Inventory Status</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="150px">250</AppText>
          <AppText fontSize="50px">Expiring Tomorrow</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="150px">250</AppText>
          <AppText fontSize="50px">Expiring In a week</AppText>
        </VStack>
      </Box>
    </SimpleGrid>
  );
};

export default Dashboard;
Dashboard;
