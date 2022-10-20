import React, { useEffect, useState } from "react";
import ListCard from "../ListCard";
import "./data-list.css";

const Header = ({ handleSelectAll, selectedIds, data }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const presentIds = data?.map((info) => info.id);
    const isCheckedAll = presentIds.every(val => selectedIds.includes(val))
    setIsChecked(isCheckedAll)
  }, [selectedIds, data]);

  const handleOnChange = (e) => {
    setIsChecked(e.target.checked);
    handleSelectAll(e.target.checked);
  };
  return (
    <div className="header-container">
      <div>
        <input
          type="checkbox"
          id="check-all"
          checked={isChecked}
          onChange={handleOnChange}
        />
        <div className="mobile-view">Select all</div>
      </div>
      <div>Name</div>
      <div>Email</div>
      <div>Role</div>
      <div>Actions</div>
    </div>
  );
};

const ListTable = (props) => {
  const { data } = props;
  return (
    <div>
      <div className="table-container">
        <Header {...props} />
        {data
          ?.sort((a, b) => a.id - b.id)
          ?.map((info) => (
            <ListCard key={info.id} info={info} {...props} />
          ))}
      </div>
    </div>
  );
};

export default ListTable;
