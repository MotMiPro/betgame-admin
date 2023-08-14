import { Tabs, Table } from "antd";
import React from "react";
const { TabPane } = Tabs;

export default function AdminTabsTable(props) {
  const {
    loading,
    scrollX,
    className,
    stateTabletabs,
    handleTabsChange,
    handleTableChanges,
  } = props;
  return (
    <div>
      <Tabs
        style={{
          padding: "5px 10px",
        }}
        onChange={handleTabsChange}
      >
        {stateTabletabs?.length > 0 &&
          stateTabletabs.map((item) => {
            return (
              <TabPane tab={item.title} key={item.keyword}>
                <Table
                  loading={loading}
                  pagination={item.pagin}
                  columns={item.column}
                  className={`live-table ${className}`}
                  dataSource={item.data}
                  rowClassName={(_, index) =>
                    index % 2 === 0 ? "table-row-light" : "table-row-dark"
                  }
                  bordered={false}
                  scroll={{ x: scrollX ? scrollX : 350 }}
                  rowKey={(row) => row.key}
                  onChange={(value) => handleTableChanges(value, item.keyword)}
                />
              </TabPane>
            );
          })}
      </Tabs>
    </div>
  );
}
