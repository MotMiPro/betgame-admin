import React, { Fragment, useContext } from "react";
import { typeList, withdrawStatus } from "../../../configs/configs";
import { tabKeys } from "../../../configs/settings";
import { RootContext } from "../../../ContextApp";
import {
  ButtonWrapper,
  FormItemWrapper,
  FormWrapper,
  InputWrapper,
  SelectWrapper,
} from "../../Presentations/UIs/UiModifies";

function WithFilter(props) {
  const { currencyList } = useContext(RootContext);
  const { filterState, handleFilter, form } = props;
  const handleClear = () => {
    form.resetFields();
  };

  const handleReturnList = (cat, equ) => {
    switch (cat) {
      case "type":
        return typeList.map((item) => ({ label: item, value: item }));
      case "status":
        return (equ === tabKeys._DEPOSIT ? ["success"] : withdrawStatus).map(
          (item) => ({ label: item, value: item })
        );
      case "currency":
        return (
          currencyList?.length &&
          currencyList.map((item) => ({
            label: item.currency,
            value: item.currency,
          }))
        );
      default:
        return [];
    }
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      {filterUI[filterState]?.length > 0 ? (
        <FormWrapper layout="vertical" onFinish={handleFilter} form={form}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {filterUI[filterState].map((item, idx) => {
              const filterList = handleReturnList(item.name, filterState);
              return (
                <Fragment key={idx}>
                  {item.type === "input" && (
                    <FormItemWrapper
                      style={idx > 0 ? { padding: "0 8px" } : {}}
                      name={item.name}
                      label={item.title}
                    >
                      <InputWrapper />
                    </FormItemWrapper>
                  )}

                  {item.type === "dropdown" && (
                    <FormItemWrapper
                      style={idx > 0 ? { padding: "0 8px" } : {}}
                      name={item.name}
                      label={item.title}
                    >
                      <SelectWrapper
                        placeholder="Select an option"
                        style={{
                          width: 150,
                        }}
                      >
                        {filterList.map(({ value, label }, idx) => (
                          <SelectWrapper.Option key={idx} value={value}>
                            <span
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {label}
                            </span>
                          </SelectWrapper.Option>
                        ))}
                      </SelectWrapper>
                    </FormItemWrapper>
                  )}
                </Fragment>
              );
            })}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <FormItemWrapper>
                <ButtonWrapper htmlType="submit" type="primary">
                  Search
                </ButtonWrapper>
              </FormItemWrapper>
              <FormItemWrapper
                style={{
                  marginLeft: 15,
                }}
              >
                <ButtonWrapper onClick={handleClear} type="primary-reverse">
                  Clear
                </ButtonWrapper>
              </FormItemWrapper>
            </div>
          </div>
        </FormWrapper>
      ) : null}
    </div>
  );
}

export default React.memo(WithFilter);

const filterUI = {
  [tabKeys._DEPOSIT]: [
    {
      title: "Transaction Hash",
      type: "input",
      name: "transactionHash",
    },
    {
      title: "Type",
      type: "dropdown",
      name: "type",
    },
    {
      title: "Status",
      type: "dropdown",
      name: "status",
    },
    {
      title: "Coin",
      type: "dropdown",
      name: "currency",
    },
  ],
  [tabKeys._WITHDRAW]: [
    {
      title: "Transaction Hash",
      type: "input",
      name: "transactionHash",
    },
    {
      title: "Type",
      type: "dropdown",
      name: "type",
    },
    {
      title: "Status",
      type: "dropdown",
      name: "status",
    },
    {
      title: "Coin",
      type: "dropdown",
      name: "currency",
    },
  ],
};
