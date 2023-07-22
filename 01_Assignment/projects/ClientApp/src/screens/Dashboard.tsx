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
import useGetDailyInventories from "../hooks/useGetDailyInventories";
import useGetInventories from "../hooks/useGetInventories";
import useGetInventoryExpiringInDays from "../hooks/useGetInventoryExpiringInDays";
import useGetExpiredInventory from "../hooks/useGetExpiredInventory";
import useGetProducts from "../hooks/useGetProducts";

const Dashboard = () => {
  const isloading = false;
  const { colorMode } = useColorMode();
  const { data: dailyInventories, isLoading: isDailyInventoryLoading } =
    useGetDailyInventories();
  const { data: inventories, isLoading: isInventoryLoading } =
    useGetInventories();
  const { data: expiringInaWeek, isLoading: isInvenotryExpiryLoading } =
    useGetInventoryExpiringInDays(8);
  const { data: expiredInventory, isLoading: isGetExpiredInventoryLoading } =
    useGetExpiredInventory();

  const { data: products } = useGetProducts();
  const bgColor = colorMode === "dark" ? "gray.900" : "gray.200";
  if (
    isDailyInventoryLoading ||
    isInventoryLoading ||
    isInvenotryExpiryLoading ||
    isGetExpiredInventoryLoading
  ) {
    return (
      <Center ml={5} mt={5} justifyContent="start" alignContent="flex-start">
        <Spinner />
      </Center>
    );
  }
  return (
    <SimpleGrid columns={3} spacingX="40px" spacingY="20px" mt={25}>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="125px">
            {products?.filter((p) => p.isActive).length}
          </AppText>
          <AppText fontSize="50px">Active Products</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="125px">
            {products?.filter((p) => p.isActive === false).length}
          </AppText>
          <AppText fontSize="50px">In Active Products</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="125px">{inventories?.length}</AppText>
          <AppText fontSize="50px">Total Inventories</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="125px">{dailyInventories?.length}</AppText>
          <AppText fontSize="50px">Daily Inventory Status</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="125px">{expiringInaWeek?.length}</AppText>
          <AppText fontSize="50px">Expiring in a week</AppText>
        </VStack>
      </Box>
      <Box bg={bgColor} height="350px">
        <VStack>
          <AppText fontSize="125px">{expiredInventory?.length}</AppText>
          <AppText fontSize="50px">Expired</AppText>
        </VStack>
      </Box>
    </SimpleGrid>
  );
};

export default Dashboard;
Dashboard;
