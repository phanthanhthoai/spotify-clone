import React from "react";

export default function Artist(){
    const artist = {
        name: "Sơn Tùng M-TP",
        listeners: 1738856,
        background: "https://bcp.cdnchinhphu.vn/334894974524682240/2022/4/29/son-tung-mtp-08110778-1651217357607701319631.jpg", // thay ảnh bạn có
        popularSongs: [
            { title: "Đừng Làm Trái Tim Anh Đau", plays: 47180623, duration: "4:39", image: "/song1.jpg" },
            { title: "Âm Thầm Bên Em", plays: 37791284, duration: "4:53", image: "/song2.jpg" },
            { title: "Nơi Này Có Anh", plays: 35946644, duration: "4:20", image: "/song3.jpg" },
        ],
    };

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Background Artist */}
            <div
                className="h-[400px] flex items-end px-8 py-6 bg-cover bg-center"
                style={{ backgroundImage: `url(${artist.background})` }}
            >
                <div>
                    <div className="text-sm text-blue-400 font-semibold">Verified Artist</div>
                    <h1 className="text-6xl font-bold">{artist.name}</h1>
                    <div className="text-gray-300 mt-2">{artist.listeners.toLocaleString()} monthly listeners</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 px-8 mt-4">
                <button className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center hover:scale-105">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z" /></svg>
                </button>
                <button className="border border-gray-500 px-4 py-1 rounded-full hover:bg-gray-700">Following</button>
            </div>

            {/* Popular Songs */}
            <div className="px-8 mt-8">
                <h2 className="text-xl font-semibold mb-4">Popular</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-400 text-sm border-b border-gray-700">
                            <th className="py-2 w-8">#</th>
                            <th className="py-2">Title</th>
                            <th className="py-2 text-right">Plays</th>
                            <th className="py-2 text-right">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artist.popularSongs.map((song, index) => (
                            <tr key={index} className="hover:bg-gray-800 transition-all">
                                <td className="py-3">{index + 1}</td>
                                <td className="flex items-center gap-3 py-3">
                                    <img src={song.image} alt={song.title} className="w-10 h-10 object-cover rounded" />
                                    <span>{song.title}</span>
                                </td>
                                <td className="py-3 text-right">{song.plays.toLocaleString()}</td>
                                <td className="py-3 text-right">{song.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
