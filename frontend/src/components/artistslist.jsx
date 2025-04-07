// import { useEffect, useState, useRef } from "react";
// import { Box, Text, VStack, Image, Spinner, IconButton,Button, Flex } from "@chakra-ui/react";
// import { get_artist, getArtist } from "../api/endpoint";
// import RightContent from "./rightcontent";

// const BASE_URL = "http://127.0.0.1:8000/";


// const ArtistList = ({artist, onSelectItem}) => {
//      const [artists, setArtists] = useState([]);
//      const [loading, setLoading] = useState(true);
//      const [selectedArtist, setSelectedArtist] = useState(null);

//      useEffect(() => {
//           get_artist()
//                .then((data) => {
//                     // setArtists(Array.isArray(data) ? data : []);
//                     setArtists(data.data);
//                     setLoading(false);
//                })
//                .catch((error) => {
//                     console.error("Lỗi khi lấy danh sách nghệ sĩ:", error);
//                     setLoading(false);
//                });
//      }, []);

//      const scrollRef = useRef(null);
//      if (loading) return <Spinner size="xl" />;

//      const rightC = (selectedArtist)=>{

//      }

//      // Hàm cuộn trái
//      const scrollLeft = () => {
//           if (scrollRef.current) {
//                scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
//           }
//      };

//      // Hàm cuộn phải
//      const scrollRight = () => {
//           if (scrollRef.current) {
//                scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
//           }
//      };

//      return (
//           <Box position="relative" width="100%">
//                {/* Nút cuộn trái */}
//                <Button
//                     position="absolute"
//                     left="0"
//                     top="50%"
//                     transform="translateY(-50%)"
//                     onClick={scrollLeft}
//                     zIndex="10"
//                     bg="blackAlpha.700"
//                     color="white"
//                     _hover={{ bg: "blackAlpha.900" }}
//                >
//                     {"<"}
//                </Button>

//                {/* Danh sách nghệ sĩ */}
//                <Flex
//                     ref={scrollRef}
//                     overflowX="auto"
//                     whiteSpace="nowrap"
//                     scrollBehavior="smooth"
//                     gap={4}
//                     p={2}
//                     css={{
//                          "&::-webkit-scrollbar": { display: "none" }, // Ẩn thanh cuộn
//                     }}
//                >
//                     {artists.map((artist) => (
//                          <Box key={artist.id} textAlign="center" flexShrink={0} width="150px">
//                               <Image src={artist.image} borderRadius="full" boxSize="120px" onClick={() => onSelectItem(artist)} />
//                               <Text fontSize="lg" fontWeight="bold" mt={2} onClick={() => onSelectItem(artist)}>
//                                    {artist.name}
//                               </Text>
//                          </Box>
//                     ))}
//                </Flex>

//                {/* Nút cuộn phải */}
//                <Button
//                     position="absolute"
//                     right="0"
//                     top="50%"
//                     transform="translateY(-50%)"
//                     onClick={scrollRight}
//                     zIndex="10"
//                     bg="blackAlpha.700"
//                     color="white"
//                     _hover={{ bg: "blackAlpha.900" }}
//                >
//                     {">"}
//                </Button>
//           </Box>
//      );
// }

// export default ArtistList;
import { useEffect, useState, useRef } from "react";
import { Box, Text, Image, Button, Flex, Spinner } from "@chakra-ui/react";
import { get_artist } from "../api/endpoint";

const ArtistList = ({ onSelectItem }) => {
     const [artists, setArtists] = useState([]);
     const [loading, setLoading] = useState(true);
     const scrollRef = useRef(null);

     useEffect(() => {
          get_artist()
               .then((data) => {
                    setArtists(data?.data || []);
                    setLoading(false);
               })
               .catch((error) => {
                    console.error("Lỗi khi lấy danh sách nghệ sĩ:", error);
                    setLoading(false);
               });
     }, []);

     const scroll = (direction) => {
          if (scrollRef.current) {
               const scrollAmount = direction === 'left' ? -500 : 500;
               scrollRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
               });
          }
     };

     if (loading) return (
          <Flex justify="center" py={8}>
               <Spinner size="xl" color="teal.500" />
          </Flex>
     );

     return (
          <Box position="relative" w="full" maxW="full" mx="auto">
               {/* Nút cuộn trái */}
               <Button
                    position="absolute"
                    left="0"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={() => scroll('left')}
                    zIndex={2}
                    bg="blackAlpha.600"
                    _hover={{ bg: 'blackAlpha.800' }}
                    color="white"
               >
                    ❮
               </Button>

               {/* Danh sách nghệ sĩ */}
               <Flex
                    ref={scrollRef}
                    overflowX="auto"
                    gap={6}
                    px={4}
                    py={2}
                    css={{
                         '&::-webkit-scrollbar': { display: 'none' },
                         '-ms-overflow-style': 'none',
                         'scrollbar-width': 'none'
                    }}
               >
                    {artists.map((artist) => (
                         <Box
                              key={artist.id}
                              flexShrink={0}
                              textAlign="center"
                              cursor="pointer"
                              onClick={() => onSelectItem(artist)}
                         >
                              <Image
                                   src={artist.image}
                                   borderRadius="full"
                                   boxSize={{ base: '80px', md: '120px' }}
                                   objectFit="cover"
                                   alt={artist.name}
                                   fallbackSrc="https://via.placeholder.com/150"
                              />
                              <Text
                                   fontSize={{ base: 'sm', md: 'lg' }}
                                   fontWeight="bold"
                                   mt={2}
                                   noOfLines={1}
                              >
                                   {artist.name}
                              </Text>
                         </Box>
                    ))}
               </Flex>

               {/* Nút cuộn phải */}
               <Button
                    position="absolute"
                    right="0"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={() => scroll('right')}
                    zIndex={2}
                    bg="blackAlpha.600"
                    _hover={{ bg: 'blackAlpha.800' }}
                    color="white"
               >
                    ❯
               </Button>
          </Box>
     );
};

export default ArtistList;