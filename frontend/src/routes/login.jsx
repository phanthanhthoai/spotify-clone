import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/endpoint";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useAuth();
  const nav = useNavigate();

  // const handleLogin = async () => {
  //   await loginUser(email, password);
  // };

  const handleLogin = async () => {
    try {
      setError(""); // Xóa lỗi cũ
      const response = await login(email, password);

      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);

      // alert("Đăng nhập thành công!");
      nav("/");  // Điều hướng về trang chính
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu!");
      console.error("Lỗi đăng nhập:", err);
    }
  };
  const handleNavigate = () => {
    nav("/register");
  };

  return (
    <VStack>
      <Box
        w={["90%", "70%", "400px"]}
        minH="500px"
        p="6"
        boxShadow="md"
        borderRadius="md"
        bg="white"
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <Heading mb="5" color="gray.700" fontSize="4xl">
          Login
        </Heading>

        {/* Input Username */}
        <FormControl w="full" mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="email"
            placeholder="Your username here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        {/* Input Password */}
        <FormControl w="full" mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {/* Nút Login */}
        <Button colorScheme="green" w="full" mt="4" onClick={handleLogin}>
          Login
        </Button>

        {/* Chuyển sang trang Register */}
        <Text
          color="gray.600"
          fontSize="sm"
          mt="2"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          onClick={handleNavigate}
        >
          Don't have an account? Sign up
        </Text>
      </Box>
    </VStack>

  );
};

export default Login;
