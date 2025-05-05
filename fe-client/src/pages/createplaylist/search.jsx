import { useEffect, useState } from "react";
import songService from "../../api/songService";
import { baseApiUrl } from "../../utils/constants";

export default function SearchSongs() {
     const [query, setQuery] = useState("");
     const [results, setResults] = useState([]);
     const [allSongs, setAllSongs] = useState([]);

     // Load toàn bộ danh sách bài hát một lần
     useEffect(() => {
          const fetchAllSongs = async () => {
               try {
                    const response = await songService.getAllSongs();
                    if (response.status === 200 && Array.isArray(response.data.items)) {
                         setAllSongs(response.data.items);
                    }
               } catch (error) {
                    console.error("Failed to fetch songs:", error);
               }
          };

          fetchAllSongs();
     }, []);

     const handleSearch = (e) => {
          const value = e.target.value;
          setQuery(value);

          if (value.trim() === "") {
               setResults([]);
          } else {
               const filtered = allSongs.filter((song) =>
                    song.title.toLowerCase().includes(value.toLowerCase())
               );
               setResults(filtered);
          }
     };

     return (
          <div className="mt-8">
               <h2 className="text-xl font-bold mb-4">Let's find something for your playlist</h2>
               <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search for songs or episodes"
                    className="w-full md:w-1/2 bg-neutral-800 text-white p-3 rounded placeholder-gray-400"
               />

               <div className="mt-6 space-y-4">
                    {results.map((item) => (
                         <div key={item.id} className="flex items-center justify-between hover:bg-neutral-800 p-2 rounded">
                              <div className="flex items-center space-x-4">
                                   <img src={`${baseApiUrl}/${item.image}`} alt="" className="max-w-12 max-h-12 rounded" />
                                   <div>
                                        <p className="font-bold">{item.title}</p>
                                        <p className="text-sm text-gray-400 capitalize">
                                             {item.type === "track" ? item.artist : item.type}
                                        </p>
                                   </div>
                              </div>
                              <button className="bg-white text-black px-4 py-1 rounded-full hover:bg-gray-300 text-sm">
                                   Add
                              </button>
                         </div>
                    ))}
               </div>
          </div>
     );
}
