import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    // Khởi tạo audio element
    useEffect(() => {
        audioRef.current = new Audio();
        return () => {
            audioRef.current.pause();
            audioRef.current = null;
        };
    }, []);

    // Xử lý thay đổi bài hát
    useEffect(() => {
        if (!currentSong?.file) return;

        const audio = audioRef.current;
        audio.pause();
        audio.src = currentSong.file;
        audio.load();

        const handleCanPlay = () => {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(error => console.error("Play error:", error));
            setDuration(audio.duration);
        };

        audio.addEventListener('canplaythrough', handleCanPlay);
        return () => {
            audio.removeEventListener('canplaythrough', handleCanPlay);
            audio.pause();
        };
    }, [currentSong]);

    // Cập nhật tiến trình
    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => setProgress(audio.currentTime);
        
        audio.addEventListener('timeupdate', updateProgress);
        return () => audio.removeEventListener('timeupdate', updateProgress);
    }, []);

    // Hàm chuyển bài
    const handleNext = useCallback(() => {
        if (currentIndex < playlist.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setCurrentSong(playlist[newIndex]);
        }
    }, [currentIndex, playlist]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setCurrentSong(playlist[newIndex]);
        }
    }, [currentIndex, playlist]);

    // Tự động chuyển bài khi hết
    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('ended', handleNext);
        return () => audio.removeEventListener('ended', handleNext);
    }, [handleNext]);

    // Các hàm điều khiển
    // const play = () => audioRef.current?.play();
    // const pause = () => audioRef.current?.pause();
    const play = async () => {
        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch (error) {
            console.error("Lỗi phát nhạc:", error);
            setIsPlaying(false);
        }
    };

    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };
    
    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setProgress(time);
        }
    };

    const addToPlaylist = (songs) => {
        setPlaylist(songs);
        setCurrentIndex(0);
        setCurrentSong(songs[0]);
    };

    return (
        <PlayerContext.Provider
            value={{
                playlist,
                currentSong,
                currentIndex,
                isPlaying,
                progress,
                duration,
                play,
                pause,
                seek,
                handleNext,
                handlePrev,
                addToPlaylist,
                setCurrentSong
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};