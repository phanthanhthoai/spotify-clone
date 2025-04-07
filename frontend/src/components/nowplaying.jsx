import {
    Box,
    Flex,
    IconButton,
    Image,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    Tooltip
} from '@chakra-ui/react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { usePlayer } from '../context/currentSong';

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `${minutes}:${remaining.toString().padStart(2, '0')}`;
};

const NowPlaying = () => {
    const {
        currentSong,
        isPlaying,
        progress,
        duration,
        play,
        pause,
        seek,
        handleNext,
        handlePrev,
        currentIndex,
        playlist
    } = usePlayer();

    const handleSeek = (value) => {
        const seekTime = (value / 100) * duration;
        seek(seekTime);
    };

    if (!currentSong) return null;

    return (
        <Box
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            bg="blackAlpha.800"
            backdropFilter="blur(10px)"
            px={4}
            py={3}
            zIndex="sticky"
        >
            <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
                {/* Song Info */}
                <Flex align="center" flex="1" maxW="300px">
                    <Image
                        src={currentSong.image}
                        boxSize="50px"
                        borderRadius="md"
                        mr={4}
                        fallbackSrc="https://via.placeholder.com/50"
                    />
                    <Box>
                        <Text fontSize="md" fontWeight="bold" color="white" noOfLines={1}>
                            {currentSong.title}
                        </Text>
                        <Text fontSize="sm" color="gray.300" noOfLines={1}>
                            {currentSong.artist}
                        </Text>
                    </Box>
                </Flex>

                {/* Player Controls */}
                <Box flex="2" maxW="600px" px={8}>
                    <Flex justify="center" mb={2}>
                        <IconButton
                            icon={<FaStepBackward />}
                            aria-label="Previous"
                            onClick={handlePrev}
                            size="sm"
                            isDisabled={currentIndex <= 0}
                            colorScheme="gray"
                            variant="ghost"
                            mr={4}
                        />
                        
                        <IconButton
                            icon={isPlaying ? <FaPause /> : <FaPlay />}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                            onClick={isPlaying ? pause : play}
                            colorScheme="green"
                            size="lg"
                            borderRadius="full"
                            boxShadow="md"
                            mx={2}
                        />
                        
                        <IconButton
                            icon={<FaStepForward />}
                            aria-label="Next"
                            onClick={handleNext}
                            size="sm"
                            isDisabled={currentIndex >= playlist.length - 1}
                            colorScheme="gray"
                            variant="ghost"
                            ml={4}
                        />
                    </Flex>

                    {/* Progress Bar */}
                    <Flex align="center">
                        <Text fontSize="xs" color="gray.400" mr={2}>
                            {formatTime(progress)}
                        </Text>
                        <Slider
                            value={(progress / duration) * 100 || 0}
                            onChange={handleSeek}
                            flex="1"
                            colorScheme="green"
                        >
                            <SliderTrack bg="gray.600">
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                                label={formatTime(progress)}
                                placement="top"
                                hasArrow
                            >
                                <SliderThumb boxSize={4} />
                            </Tooltip>
                        </Slider>
                        <Text fontSize="xs" color="gray.400" ml={2}>
                            {formatTime(duration)}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default NowPlaying;