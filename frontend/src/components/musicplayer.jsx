import { Box, Flex } from "@chakra-ui/react";
import Body from "./body";
import NowPlaying from "./nowplaying";
import Header from "./header";
import { PlayerProvider } from "../context/currentSong";

const MusicPlayer = () => {
  return (
    <PlayerProvider>
      <Flex direction="column" h="auto">
        <Header /> {/* Header ở trên cùng */}
        <Box flex="1" overflowY="auto"> {/* Nội dung chính, có thể cuộn */}
          <Body />
        </Box>
        <NowPlaying /> {/* Thanh phát nhạc ở dưới cùng */}
      </Flex>
    </PlayerProvider>
  );
};

export default MusicPlayer;