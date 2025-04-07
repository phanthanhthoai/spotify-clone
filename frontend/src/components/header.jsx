import { Container, Box, HStack, IconButton, Input, Button, Avatar, Spacer } from "@chakra-ui/react";
import { FaSpotify, FaHome, FaSearch, FaBell, FaDownload } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import UserMenu from "./usermenu";

const Header = () => {
     return (
          <Container maxW={"full"}>
               <Box bg="black" color="white" p={3} display="flex" alignItems="center">
                    {/* Logo & Home Button */}
                    <HStack spacing={3}>
                         <IconButton icon={<FaSpotify />} aria-label="Spotify" fontSize="2xl" bg="transparent" _hover={{ bg: "gray.700" }} />
                         <IconButton icon={<FaHome />} aria-label="Home" fontSize="xl" bg="transparent" _hover={{ bg: "gray.700" }} />
                    </HStack>

                    {/* Search Bar */}
                    <HStack flex={1} mx={5} bg="gray.900" p={2} borderRadius="full">
                         <FaSearch color="gray.400"/>
                         <Input placeholder="What do you want to play?" border="none" bg="transparent" color="white" _focus={{ outline: "none" }} />
                         <IoMdArchive color="gray.400" />
                    </HStack>

                    {/* Action Buttons */}
                    <HStack spacing={3}>
                         <Button bg="white" color="black" borderRadius="full" _hover={{ bg: "gray.300" }}>Explore Premium</Button>
                         <IconButton icon={<FaDownload />} aria-label="Install App" bg="transparent" _hover={{ bg: "gray.700" }} />
                         <IconButton icon={<FaBell />} aria-label="Notifications" bg="transparent" _hover={{ bg: "gray.700" }} />
                         <UserMenu />
                    </HStack>
               </Box>
          </Container>

     );
};

export default Header;
