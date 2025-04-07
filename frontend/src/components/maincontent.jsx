// import { Box, Heading, HStack, VStack, Image, Text, Button } from "@chakra-ui/react";
// import ArtistList from "./artistslist";
// import SongList from "./songlist";
// import Addplaylist from "./addplaylist";

// const MainContent = ({ artists, songs, onSelectItem, showPlaylist, onClose }) => {
//   return (

//     <Box color="white">
//       <div style={{ flex: 1, padding: "20px" }}>
//         {showPlaylist ? (
//           <Addplaylist onClose={onClose} />
//         ) : (
//           <h2>Welcome to Music App</h2>
//         )}
//       </div>
//       {/* Bộ lọc */}
//       <HStack spacing={3} mb={4}>
//         <Button bg="gray.700" _hover={{ bg: "gray.600" }} borderRadius="full">All</Button>
//         <Button bg="gray.700" _hover={{ bg: "gray.600" }} borderRadius="full">Music</Button>
//         <Button bg="gray.700" _hover={{ bg: "gray.600" }} borderRadius="full">Podcasts</Button>
//       </HStack>

//       {/* Danh sách Mix */}
//       <Heading size="md" mb={2}>Your top mixes</Heading>
//       <HStack spacing={4} overflowX="auto" pb={2}>
//         <VStack>
//           <Image src="/path-to-image1.jpg" boxSize="120px" borderRadius="md" />
//           <Text fontSize="sm">KayC Mix</Text>
//         </VStack>
//         <VStack>
//           <Image src="/path-to-image2.jpg" boxSize="120px" borderRadius="md" />
//           <Text fontSize="sm">Hip Hop Mix</Text>
//         </VStack>
//       </HStack>

//       {/* Danh sách Nghệ sĩ */}
//       <Heading size="md" mb={2}>Nghệ sĩ</Heading>
//       <HStack spacing={4} overflowX="auto" pb={2}>
//         <ArtistList artists={artists} onSelectItem={onSelectItem} />
//       </HStack>

//       {/* Danh sách Bài hát */}
//       <Heading size="md" mb={2}>Bài hát</Heading>
//       <HStack spacing={4} overflowX="auto" pb={2}>
//         <SongList songs={songs} onSelectSong={onSelectItem} />
//       </HStack>
//     </Box>
//   );
// };

// export default MainContent;
import { Box, Heading, HStack, VStack, Image, Text, Button, Flex, Spinner } from "@chakra-ui/react";
import ArtistList from "./artistslist";
import SongList from "./songlist";
import Addplaylist from "./addplaylist";

const MainContent = ({
  artists = [],
  songs = [],
  onSelectItem,
  showPlaylist,
  onClose,
  isLoading = false
}) => {
  const filters = ['All', 'Music', 'Podcasts'];
  const mixes = [
    { id: 1, title: 'KayC Mix', image: '/path-to-image1.jpg' },
    { id: 2, title: 'Hip Hop Mix', image: '/path-to-image2.jpg' }
  ];

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  return (
    <Box color="white" p={6} flex={1} overflowY="auto" bg={"black"} maxW={"full"} mt={"-24px"}>
      {showPlaylist ? (
        <Addplaylist onClose={onClose} />
      ) : (
        <>
          {/* Welcome Section */}
          <Box mb={8}>
            <Heading size="xl" mb={4} >Welcome to Music App</Heading>

            {/* Bộ lọc */}
            <HStack spacing={3} mb={6}>
              {filters.map(filter => (
                <Button
                  key={filter}
                  bg="gray.700"
                  _hover={{ bg: "gray.600" }}
                  borderRadius="full"
                  textTransform="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </HStack>

            {/* Danh sách Mix */}
            <Heading size="md" mb={4}>Your top mixes</Heading>
            <Flex overflowX="auto" pb={4} gap={4}>
              {mixes.map(mix => (
                <VStack
                  key={mix.id}
                  minW="150px"
                  align="start"
                  spacing={2}
                >
                  <Image
                    src={mix.image}
                    boxSize="150px"
                    borderRadius="md"
                    fallbackSrc="https://via.placeholder.com/150"
                    alt={mix.title}
                  />
                  <Text fontSize="sm" fontWeight="medium">{mix.title}</Text>
                </VStack>
              ))}
            </Flex>
          </Box>

          {/* Danh sách Nghệ sĩ */}
          <Box mb={8}>
            <Heading size="md" mb={4}>Nghệ sĩ</Heading>
            <ArtistList
              artists={artists}
              onSelectItem={onSelectItem}
            />
          </Box>

          {/* Danh sách Bài hát */}
          <Box mb={8}>
            <Heading size="md" mb={4}>Bài hát</Heading>
            <SongList
              songs={songs}
              onSelectSong={onSelectItem}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MainContent;