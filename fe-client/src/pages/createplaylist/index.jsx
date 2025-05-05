import { Plus, MoreHorizontal, List, Pencil } from "lucide-react";
import SearchSongs from "./search";

export default function CreatePlaylist() {
     return (
          <div className="bg-gradient-to-b from-zinc-900 to-black text-white min-h-screen p-6">
               {/* Header Playlist */}
               <div className="flex items-end space-x-6">
                    {/* Image */}
                    <div className="w-48 h-48 bg-neutral-800 flex items-center justify-center relative group">
                         <Pencil className="w-6 h-6 opacity-80" />
                         <span className="absolute bottom-2 text-sm opacity-70">Choose photo</span>
                    </div>

                    {/* Title & Info */}
                    <div>
                         <p className="uppercase text-sm text-gray-400">Public Playlist</p>
                         <h1 className="text-6xl font-bold mt-1">My Playlist #10</h1>
                         <p className="text-sm mt-2 text-gray-400">phan •</p>
                    </div>
               </div>

               {/* Action bar */}
               <div className="flex items-center mt-8 space-x-4">
                    <button className="text-white hover:text-green-500">
                         <Plus className="w-6 h-6" />
                    </button>
                    <button className="text-white hover:text-gray-300">
                         <MoreHorizontal className="w-6 h-6" />
                    </button>
                    <div className="ml-auto">
                         <List className="w-6 h-6 text-gray-300 hover:text-white" />
                    </div>
               </div>

               <hr className="border-gray-700 my-6" />

               {/* Search */}
               <div>
                    <SearchSongs />
               </div>
          </div>
     );
}


