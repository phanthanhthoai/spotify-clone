import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, Button, Card, Input, Heading, Text } from "@chakra-ui/react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { registerUser } = useAuth();
  const nav = useNavigate();

  const handleRegister = async () => {
    await registerUser(username, email, password, passwordConfirm);
  };

  const handleNavigate = () => {
    nav("/login");
  };

  return (
    <Card w="70%" maxW="400px" minH="500px" p={6} shadow="md">
      <Heading mb={5} color="gray.700" size="xl">
        Register
      </Heading>

      {/* Input Username */}
      <FormControl mb={4}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          placeholder="Your username here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      {/* Input Email */}
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Input Password */}
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Your password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      {/* Confirm Password */}
      <FormControl mb={4}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm password here"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </FormControl>

      {/* Nút Register */}
      <Button colorScheme="green" w="full" mt={4} onClick={handleRegister}>
        Register
      </Button>

      {/* Chuyển sang trang Login */}
      <Text
        color="gray.600"
        fontSize="sm"
        mt={2}
        cursor="pointer"
        _hover={{ textDecoration: "underline" }}
        onClick={handleNavigate}
      >
        Have an account? Sign in
      </Text>
    </Card>
  );
};

export default Register;
