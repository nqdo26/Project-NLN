import React, { useEffect, useState } from "react";
import { notification, Select } from "antd";
import classNames from "classnames/bind";
import styles from "./ResultSorter.module.scss";
import { getLevelsApi } from "~/utils/api";

const cx = classNames.bind(styles);

function ResultSorter({ onChange }) {  
  const [sortOption, setSortOption] = useState("Tất cả");
  const [dataSource, setDataSources] = useState([]);

  useEffect(() => { 
    const fetchLevel = async () => {
      try {
        const res = await getLevelsApi();
        if (res && Array.isArray(res.data)) {
          setDataSources(res.data);
        } else {
          setDataSources([]);
          notification.error({ message: "Error", description: "Invalid data format" });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setDataSources([]);
        notification.error({ message: "Error", description: "Failed to fetch categories" });
      }
    };
    fetchLevel();
  }, []);

  const handleChange = (value) => {
    setSortOption(value);
    onChange(value); 
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sortContainer")}>
        <span className={cx("sortLabel")}>Chọn cấp bậc</span>
        <Select
          value={sortOption}
          onChange={handleChange}  
          className={cx("sortSelect")}
          placeholder="Select level"
          allowClear
        >
          <Select.Option key="all" value="Tất cả">
            Tất cả
          </Select.Option>
          {dataSource.length > 0 ? (
            dataSource.map((level) => (
              <Select.Option key={level._id} value={level.title}>
                {level.title}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="" disabled>
              No levels available
            </Select.Option>
          )}
        </Select>
      </div>
    </div>
  );
}

export default ResultSorter;
