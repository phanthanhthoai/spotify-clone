import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Container
      maxW="full"
      minH="100vh"
    >
      {children}
    </Container>
  );
};

export default Layout;

