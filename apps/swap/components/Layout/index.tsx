import { Flex } from "antd";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex vertical style={{ minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1, padding: "20px", position: "relative" }}>
        {children}
      </div>
    </Flex>
  );
};

export default Layout;
