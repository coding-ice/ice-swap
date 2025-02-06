import { Flex } from "antd";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex vertical style={{ minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </Flex>
  );
};

export default Layout;
