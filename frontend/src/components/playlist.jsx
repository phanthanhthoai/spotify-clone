import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const PlayList = ({ onClose }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="outline" size="sm" color={"white"} bg="black" _hover={{ bg: "gray.600" }} borderRadius="full">
        + Create
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log("Create Playlist")} bg={"gray.900"} _hover={{ bg: "gray.700" }}>
          PlayList
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PlayList;
