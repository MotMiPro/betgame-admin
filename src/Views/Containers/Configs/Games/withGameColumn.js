import { appColor } from "../../../../configs/settings";
import { parseTimer } from "../../../../ultils/helpers/parseTimer";
import { Tag } from "antd";
export const withData = (arr, name) => {
  return arr
    .filter((item) => item.name === name)
    .map((item, idx) => {
      return {
        key: idx,
        createdAt: parseTimer(item?.createdAt),
        winRate: item?.winRate,
        name: item?.name,
        earnRate: item?.earnRate,
        game: item?.game,
        maxMultiplier: item?.maxMultiplier,
        isRun: item?.isRun,
        action: item,
      };
    });
};

export const withGameConfigColumn = ({ editTable }) => {
  return [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["xs", "sm"],
    },
    {
      title: "WinRate",
      dataIndex: "winRate",
      key: "winRate",
      responsive: ["xs", "sm"],
    },
    {
      title: "EarnRate",
      dataIndex: "earnRate",
      key: "earnRate",
      responsive: ["xs", "sm"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm"],
    },
    {
      title: "Game",
      dataIndex: "game",
      key: "game",
      responsive: ["xs", "sm"],
    },
    {
      title: "Run",
      dataIndex: "isRun",
      key: "isRun",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item ? "green" : "magenta"}>
          {item ? "Running" : "Stopped"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <span
            style={{
              cursor: "pointer",
              backgroundColor: appColor.textPrimaryColorGreen,
              padding: "4px 12px",
              color: appColor.white,
              borderRadius: 5,
            }}
            onClick={() => editTable(item)}
          >
            <i className="far fa-edit" />
          </span>
        </div>
      ),
    },
  ];
};

export const withGameMoonConfigColumn = ({ editTable, stopGame }) => {
  return [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["xs", "sm"],
    },
    {
      title: "WinRate",
      dataIndex: "winRate",
      key: "winRate",
      responsive: ["xs", "sm"],
    },
    {
      title: "EarnRate",
      dataIndex: "earnRate",
      key: "earnRate",
      responsive: ["xs", "sm"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm"],
    },

    {
      title: "Game",
      dataIndex: "game",
      key: "game",
      responsive: ["xs", "sm"],
    },
    {
      title: "Max Multiplier",
      dataIndex: "maxMultiplier",
      key: "maxMultiplier",
      responsive: ["xs", "sm"],
    },
    {
      title: "Run",
      dataIndex: "isRun",
      key: "isRun",
      responsive: ["xs", "sm"],
      render: (item) => (
        <Tag color={item ? "green" : "magenta"}>
          {item ? "Running" : "Stopped"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      responsive: ["xs", "sm"],
      render: (item) => (
        <div>
          <span
            style={{
              cursor: "pointer",
              backgroundColor: appColor.textPrimaryColorGreen,
              padding: "4px 12px",
              color: appColor.white,
              borderRadius: 5,
            }}
            onClick={() => editTable(item)}
          >
            <i className="far fa-edit" />
          </span>
          <span
            style={{
              cursor: "pointer",
              backgroundColor: appColor.orange,
              padding: "8px 12px",
              color: appColor.white,
              borderRadius: 5,
              marginLeft: 15,
            }}
            onClick={() => stopGame(item)}
          >
            STOP GAME
          </span>
        </div>
      ),
    },
  ];
};
