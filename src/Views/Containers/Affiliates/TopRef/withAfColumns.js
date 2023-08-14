import EmailComponent from "../../../Presentations/UIs/EmailComponent";

export const withData = (arr) => {
  return arr.map((item, idx) => ({
    stt: idx + 1,
    email: item.user,
    totalF1: item.totalF1,
    totalReferral: item.totalReferral,
    key: idx,
  }));
};

export const withColumn = () => {
  return [
    {
      title: "Stt",
      dataIndex: "stt",
      key: "stt",
      responsive: ["xs", "sm"],
    },
    {
      title: "Total",
      dataIndex: "totalReferral",
      key: "totalReferral",
      responsive: ["xs", "sm"],
    },

    {
      title: "Total F1",
      dataIndex: "totalF1",
      key: "totalF1",
      responsive: ["xs", "sm"],
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm"],
      render: (items) => {
        return (
          items?.length &&
          items.map((item, idx) => (
            <EmailComponent
              key={idx}
              item={{ email: item?.email, id: item?._id }}
            />
          ))
        );
      },
    },
  ];
};
