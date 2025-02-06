import { Flex } from "antd";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex vertical style={{ minHeight: "100vh" }}>
      <Header />
      <Flex
        justify="center"
        align="center"
        style={{ flex: 1, padding: "20px" }}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
