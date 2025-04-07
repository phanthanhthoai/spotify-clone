import { useEffect, useState } from "react";
import { get_notes } from "../api/endpoint";
import MusicPlayer from "../components/musicplayer";
import { useAuth } from "../context/useAuth";

const Menu = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
      <MusicPlayer />
  );
};

export default Menu;
