import { Box, Image, Text } from "@chakra-ui/react";

const RightContent = ({ selectedItem }) => {
  if (!selectedItem) {
    return <Box p={4}><Text fontSize="xl">Chưa chọn nội dung</Text></Box>;
  }

  return (
    <Box p={4} border="1px solid gray" borderRadius="md">
      <Image src={selectedItem.image} borderRadius="full" boxSize="150px" />
      <Text fontSize="2xl" color={"white"} fontWeight="bold" mt={2}>{selectedItem.name}</Text>
      <Text mt={2} color={"white"}>{selectedItem.country || "Chưa có thông tin"}</Text>
    </Box>
  );
};

export default RightContent;
