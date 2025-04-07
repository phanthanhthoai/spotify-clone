// import { Box, Container } from "@chakra-ui/react";
// import Sidebar from "./sidebar";
// import MainContent from "./maincontent";
// import RightContent from "./rightcontent";
// import NowPlaying from "./nowplaying";
// import { useEffect, useState } from "react";
// import { get_artist, get_songs } from "../api/endpoint";
// import Addplaylist from "./addplaylist";

// const Body = () => {
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [artists, setArtists] = useState([]);
//     const [songs, setSongs] = useState([]);
//     const [currentSong, setCurrentSong] = useState(null);
//     const [showAddPlaylist, setShowAddPlaylist] = useState(false)
//     // Lấy danh sách nghệ sĩ và bài hát từ API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const artistData = await get_artist();
//                 setArtists(artistData.data);

//                 const songData = await get_songs();
//                 setSongs(songData);
//             } catch (error) {
//                 console.error("Lỗi khi lấy dữ liệu:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     // Xử lý chọn bài hát hoặc nghệ sĩ
//     const handleSelectItem = (item) => {
//         if (item.audio_url) {
//             setCurrentSong(item); // Cập nhật bài hát đang phát
//         } else {
//             setSelectedItem(item); // Cập nhật nghệ sĩ đang chọn
//         }
//     };

//     return (
//         <Container maxW="full" minH="100vh">
//             <Box display="flex" flexDirection="column" h="100vh" bg="black">
//                 <Box display="flex" flex="1">
//                     {/* Sidebar */}
//                     <Box w="300px" bg="gray.900">
//                         <Sidebar onCreate={() => setShowAddPlaylist(true)} />
//                     </Box>

//                     {/* Nội dung chính */}
//                     <Box flex="1" p={4} overflowY="auto">
//                         {showAddPlaylist ? (
//                             <Addplaylist
//                                 title="My Playlist #6"
//                                 author="Your Name"
//                                 onClose={() => setShowAddPlaylist(false)}
//                             />
//                         ) : (
//                             <MainContent />
//                         )}
//                     </Box>

//                     {/* Hiển thị chi tiết nghệ sĩ nếu có */}
//                     {selectedItem && (
//                         <Box w="400px" bg="gray.800" p={4}>
//                             <RightContent selectedItem={selectedItem} />
//                         </Box>
//                     )}
//                 </Box>

//                 {/* Trình phát nhạc nếu có bài hát */}
//                 {currentSong && <NowPlaying currentSong={currentSong} />}
//             </Box>
//         </Container>
//     );
// };

// export default Body;
import { Box, Container, Spinner } from "@chakra-ui/react";
import Sidebar from "./sidebar";
import MainContent from "./maincontent";
import RightContent from "./rightcontent";
import NowPlaying from "./nowplaying";
import { useEffect, useState } from "react";
import { get_artist, get_songs } from "../api/endpoint";
import Addplaylist from "./addplaylist";

const Body = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [showAddPlaylist, setShowAddPlaylist] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Lấy danh sách nghệ sĩ và bài hát từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [artistData, songData] = await Promise.all([
                    get_artist(),
                    get_songs()
                ]);

                setArtists(artistData.data);
                setSongs(songData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Xử lý chọn bài hát hoặc nghệ sĩ
    const handleSelectItem = (item) => {
        if (item.audio_url) {
            setCurrentSong(item);
        } else {
            setSelectedItem(item);
        }
    };

    return (
        <Container maxW="full" minH="100vh">
            <Box display="flex" flexDirection="column" h="100vh" bg="black">
                {/* Loading state */}
                {isLoading && (
                    <Box position="fixed" w="full" h="full" bg="blackAlpha.800" zIndex="overlay">
                        <Spinner
                            size="xl"
                            color="teal.500"
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                        />
                    </Box>
                )}
                <Container maxW="full" p={0} flex={1}>
                    <Box display="flex" flex="1" position="relative">
                        {/* Sidebar */}
                        <Box
                            w="300px"
                            bg="gray.900"
                            position="fixed"
                            // left={0}
                            // top={0}
                            h="calc(100vh - 80px)"
                            overflowY="auto"
                        >
                            <Sidebar onCreate={() => setShowAddPlaylist(true)} />
                        </Box>

                        {/* Main Content Area */}
                        <Box
                            flex="1"
                            ml="276px"
                            mr={selectedItem ? "350px" : "-39px"}
                            transition="margin 0.2s ease"
                            p={6}
                        >
                            {showAddPlaylist ? (
                                <Addplaylist
                                    title="My Playlist #6"
                                    author="Your Name"
                                    onClose={() => setShowAddPlaylist(false)}
                                />
                            ) : (
                                <MainContent
                                    artists={artists}
                                    songs={songs}
                                    onSelectItem={handleSelectItem}
                                    isLoading={isLoading}
                                />
                            )}
                        </Box>

                        {/* Right Panel */}
                        {selectedItem && (
                            <Box
                                w="400px"
                                bg="gray.800"
                                position="fixed"
                                right="32px"
                                // top={0}
                                h="calc(100vh - 80px)"
                                overflowY="auto"
                                p={6}
                            >
                                <RightContent selectedItem={selectedItem} />
                            </Box>
                        )}
                    </Box>
                </Container>


                {/* Now Playing Bar */}
                {currentSong && (
                    <Box
                        position="fixed"
                        bottom={0}
                        left={0}
                        right={0}
                        h="80px"
                        bg="gray.900"
                        borderTop="1px solid"
                        borderColor="gray.700"
                    >
                        <NowPlaying currentSong={currentSong} />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Body;