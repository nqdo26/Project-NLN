import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = () => {
  return (
    <Input
      placeholder="Tìm kiếm tài liệu..."
      prefix={<SearchOutlined style={{ color: "#888" }} />}
      style={{
        width: '100%',
        borderRadius: 100000,
        padding: "15px 20px",
      }}
    />
  );
};

export default SearchBar;
