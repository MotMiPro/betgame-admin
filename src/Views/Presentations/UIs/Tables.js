import React from "react";
import { Table } from "antd";

function AdminTables(props) {
  const {
    style,
    loading,
    scrollX,
    className,
    tableRender,
    rowSelection = null,
    handleTableChanges,
    bordered = false,
  } = props;

  return (
    <Table
      loading={loading}
      className={className}
      rowSelection={rowSelection}
      pagination={tableRender?.pagination}
      columns={tableRender?.column}
      dataSource={tableRender?.data}
      rowClassName={(_, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      bordered={bordered}
      scroll={{ x: scrollX ? scrollX : 1200 }}
      style={style}
      rowKey={(row) => row.key}
      onChange={handleTableChanges}
    />
  );
}

export default AdminTables;
