import { Menu, MenuButton, MenuList, MenuItem, IconButton, Avatar } from "@chakra-ui/react";
// import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaBell } from "react-icons/fa";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
const UserMenu = () => {
     const { user, logoutUser } = useAuth();
     const nav = useNavigate();
     const handleLogout = () => {
          // Xóa token khỏi localStorage
          localStorage.removeItem("token");
      
          // Xóa token khỏi sessionStorage (nếu dùng sessionStorage)
          sessionStorage.removeItem("token");
      
          // Điều hướng về trang đăng nhập
          nav("/login");
      
          alert("Bạn đã đăng xuất thành công!");
      };
     return (
          <Menu>
               {/* Nút Avatar */}
               <MenuButton as={IconButton} borderRadius="full" bg="gray.800">
                    <Avatar name="User" size="sm" bg="purple.500" />
               </MenuButton>

               {/* Danh sách menu */}
               <MenuList bg="gray.900" color="white">
                    <MenuItem bg="gray.900" _hover={{ bg: "gray.700" }}>Account</MenuItem>
                    <MenuItem bg="gray.900" _hover={{ bg: "gray.700" }}>Profile</MenuItem>
                    <MenuItem bg="gray.900" _hover={{ bg: "gray.700" }} >
                         Upgrade to Premium
                    </MenuItem>
                    <MenuItem bg="gray.900" _hover={{ bg: "gray.700" }}>
                         Support
                    </MenuItem>
                    <MenuItem bg="gray.900" _hover={{ bg: "gray.700" }}>
                         Download
                    </MenuItem>
                    <MenuItem bg="gray.900" _hover={{ bg: "gray.700" }}>Settings</MenuItem>
                    <MenuItem bg="gray.900" _hover={{ bg: "red.600" }} onClick={handleLogout}>Log out</MenuItem>
               </MenuList>
          </Menu>
     );
};

export default UserMenu;
