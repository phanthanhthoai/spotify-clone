import { Box, Text, Button, HStack } from "@chakra-ui/react";
import AddplayList from "./addplaylist";
import {  Menu, Portal } from "@chakra-ui/react";
const Sidebar = ({ onCreate }) => {
  return (
    <Box p={4} color="white">
      <HStack spacing={2} mb={4} alignItems="center">
        <Text fontSize="xl" fontWeight="bold">Your Library</Text>
        {/* <Button bg="gray.700" _hover={{ bg: "gray.600" }} borderRadius="full">+Create</Button> */}
        {/* <PlayList /> */}
        <Button colorScheme="blue" onClick={onCreate}>
          Create Playlist
        </Button>
      </HStack>

      {/* Nội dung Sidebar */}
    </Box>
  );
};

export default Sidebar;