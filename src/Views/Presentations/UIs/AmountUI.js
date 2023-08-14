export default function AmountUI(props) {
  const { data } = props;
  return (
    <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
      <span>{data?.amount}</span>
      <span style={{ marginLeft: 5, fontSize: 13, fontWeight: 600 }}>
        {data?.currency}
      </span>
    </div>
  );
}
