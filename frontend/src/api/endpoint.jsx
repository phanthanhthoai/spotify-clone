import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/'

const LOGIN_URL = `${BASE_URL}auth/login/`
const REGISTER_URL = `${BASE_URL}auth/register/`
const LOGOUT_URL = `${BASE_URL}logout/`
// const NOTES_URL = `${BASE_URL}todos/`
const AUTHENTICATED_URL = `${BASE_URL}auth/login/`

axios.defaults.withCredentials = true;


export const login = async (email, password) => {
    try {
        const response = await axios.post(LOGIN_URL, { email, password });
        
        // Lưu token vào Local Storage
        localStorage.setItem("token", response.data.token);

        return response.data; // Trả về dữ liệu cho frontend xử lý
    } catch (error) {
        console.error("Lỗi đăng nhập:", error.response?.data || error.message);
        throw error;
    }
};


export const logout = async () => {
    const response = await axios.post(LOGOUT_URL, { withCredentials: true });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await axios.post(REGISTER_URL, { username, email, password }, { withCredentials: true });
    return response.data;
};

// export const authenticated_user = async () => {
//     const response = await axios.get(AUTHENTICATED_URL, { withCredentials: true });
//     return response.data
// }
export const authenticated_user = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://127.0.0.1:8000/auth/user/", {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};
export const get_artist = async () => {
    const response = await axios.get(`${BASE_URL}artist/all/`, { withCredentials: true });
    return response.data
}
export const get_songs = async()=>{
    const response = await axios.get(`${BASE_URL}songs/all/`, { withCredentials: true });
    return response.data
}
export const get_song = async(id)=>{
    const response = await axios.get(`${BASE_URL}songs/${id}/`, { withCredentials: true });
    return response.data
}
export const add_playlist = async (name, author, image) => {
    const response = await axios.post(
        `${BASE_URL}playlists/`,
        { name, author, image },
        { withCredentials: true }
    );
    return response.data;
}
export const get_playlists = async () => {
    const response = await axios.get(`${BASE_URL}playlist/`, { withCredentials: true });
    return response.data;
}

export const get_lastlist = async () => {
    const response = await axios.get(`${BASE_URL}playlist/lastlist/`, { withCredentials: true });
    return response.data;
}
export const remove_song_from_playlist = async (playlist_id, song_id) => {
    const response = await axios.post(
        `${BASE_URL}playlists/${playlist_id}/remove_song/`,
        { song_id },
        { withCredentials: true }
    );
    return response.data;
}
export const get_playlist_songs = async (playlist_id) => {
    const response = await axios.get(`${BASE_URL}playlist/${playlist_id}/songs/`, { withCredentials: true });
    return response.data;
}
export const add_song_to_playlist = async (playlist_id, song_id) => {
    const response = await axios.post(
        `${BASE_URL}playlists/${playlist_id}/add_song/`,
        { song_id },
        { withCredentials: true }
    );
    return response.data;
}