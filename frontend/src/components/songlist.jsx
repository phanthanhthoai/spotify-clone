import { VStack, HStack, Image, Text } from "@chakra-ui/react";
import { usePlayer } from "../context/currentSong"; // Sửa import

const SongList = ({ songs }) => {
    const { addToPlaylist, setCurrentSong } = usePlayer(); // Sử dụng hook

    const handleSongSelect = (song) => {
        // Thêm toàn bộ danh sách vào playlist và chọn bài hát được click
        addToPlaylist(songs);
        setCurrentSong(song);
    };

    return (
        <VStack align="stretch" spacing={2} p={4}>
            {songs.map((song) => (
                <HStack 
                    key={song.id} 
                    spacing={3} 
                    p={3} 
                    bg="gray.800" 
                    borderRadius="md" 
                    cursor="pointer"
                    _hover={{ 
                        bg: "gray.700",
                        transform: "translateX(5px)",
                        transition: "all 0.2s ease"
                    }}
                    onClick={() => handleSongSelect(song)}
                >
                    <Image 
                        src={song.image} 
                        boxSize="60px" 
                        borderRadius="md"
                        fallbackSrc="https://via.placeholder.com/60"
                    />
                    <VStack align="start" spacing={1} flex={1}>
                        <Text 
                            fontSize="md" 
                            fontWeight="semibold" 
                            color="white"
                            noOfLines={1}
                        >
                            {song.title}
                        </Text>
                        <Text 
                            fontSize="sm" 
                            color="teal.300"
                            noOfLines={1}
                        >
                            {song.artist}
                        </Text>
                        <Text 
                            fontSize="xs" 
                            color="gray.400"
                        >
                            {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
                        </Text>
                    </VStack>
                </HStack>
            ))}
        </VStack>
    );
};

export default SongList;
