import React, { useState } from "react";
import authService from "../../api/authService";

export default function UserMenu() {
     const [isOpen, setIsOpen] = useState(false);

     // Hàm để toggle menu
     const toggleMenu = () => setIsOpen(!isOpen);
     const handleLogout = async () => {
          try {
               await authService.logout();
               localStorage.removeItem("token");
               window.location.href = "/auth";
          } catch (error) {
               console.error("Lỗi khi đăng xuất:", error);
          }
     };

     return (
          <div className="relative inline-block text-left">

               <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
               >
                    <img
                         src="https://bit.ly/sage-adebayo"
                         alt="User Avatar"
                         className="w-8 h-8 rounded-full"
                    />
               </button>
               {isOpen && (
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                         <div className="py-1">
                              <a
                                   href="#"
                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                   Thông tin cá nhân
                              </a>
                              <button
                                   onClick={handleLogout}
                                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                   Đăng xuất
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
}
