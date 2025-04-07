import {
  Box,
  Button,
  Flex,
  IconButton,
  Image, 
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { authenticated_user } from "../api/endpoint";
import { add_playlist, get_lastlist } from "../api/endpoint";

const Addplaylist = ({ title: initialTitle, author: initialAuthor, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(initialAuthor || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleCreatePlaylist = async() =>{
    try{
      lastId = await get_lastlist();
      title = "My Playlist"+lastId;
      userId = await authenticated_user();
      const response = await add_playlist(title, author, selectedImage);
      if (response) {
        toast({
          title: "Playlist created",
          description: "Your playlist has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    }catch(error){
      toast({
        title: "Error creating playlist",
        description: "An error occurred while creating the playlist.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  useEffect(() => {
    authenticated_user().then((data) => {
      setAuthor(data.username);
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  const handleCreate = () => {
    const playlistData = {
      title,
      author,
      createdAt: new Date(),
      image: selectedImage,
    };
    console.log("Playlist Created:", playlistData);
    // TODO: Add API call to save playlist
  };

  return (
    <Box bg="black" color="white" minH="100vh" p={6} position="relative" mt={"-24px"}>
      <IconButton
        icon={<FiX />}
        aria-label="Close"
        onClick={onClose}
        position="absolute"
        top="4"
        right="4"
        bg="gray.700"
        _hover={{ bg: "gray.600" }}
      />

      <Flex direction="column" mb={8}>
        <Flex align="center" mb={6}>
          <Image
            src={selectedImage || "https://via.placeholder.com/150"}
            alt="Playlist Cover"
            boxSize="150px"
            borderRadius="md"
            bg="gray.700"
          />
          <Box ml={5}>
            <Text fontSize="sm" color="gray.400">Playlist</Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter playlist title"
              fontSize="3xl"
              fontWeight="bold"
              bg="gray.800"
              border="none"
              _focus={{ boxShadow: "none" }}
              color="white"
              mb={2}
            />
            <Input
              value={author}
              isDisabled
              _focus={{ boxShadow: "none" }}
              color="gray.300"
            />
          </Box>
        </Flex>

        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          display="none"
        />
        <Button
          onClick={() => fileInputRef.current.click()}
          variant="filled"
          size="md"
          width="150px"
        >
          Choose Image
        </Button>

        <Flex mt={8} justify="flex-end">
          <Button
            colorScheme="green"
            px={8}
            _focus={{ boxShadow: "none" }}
            onClick={handleCreate}
          >
            Save
          </Button>
        </Flex>
      </Flex>

      <Box mt={8} p={4} bg="gray.900" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Let's find something for your playlist
        </Text>
        <Flex align="center">
          <Input
            placeholder="Search for songs or episodes"
            bg="gray.800"
            border="none"
            _focus={{ boxShadow: "none" }}
          />
          <IconButton
            icon={<FiSearch />}
            aria-label="Search"
            bg="gray.700"
            ml={2}
            _hover={{ bg: "gray.600" }}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default Addplaylist;