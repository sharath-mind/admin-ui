import React, { useEffect, useState, useContext } from "react";
import ListTable from "../../components/ListTable";
import Pagination from "../../components/Pagination";
import "./landing-page.css";
import { API } from "../../constants";
import SearchBar from "../../components/SearchBar";
import {
  deleteMultipleUser,
  deleteUser,
  editUserData,
  getPaginatedData,
  storeUsersData,
} from "../../service";
import AlertContext from "../../AlertContext";

const LandingPage = () => {
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [lastPage, setLastPage] = useState(1);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        storeUsersData(data);
        updatePage();
      });
  }, []);

  useEffect(() => {
    if (page) updatePage();
  }, [page]);

  useEffect(() => {
    if (displayData?.length === 0 && page === 1) return;
    if (displayData?.length === 0) setPage(lastPage);
  }, [displayData]);

  const updatePage = () => {
    const paginatedData = getPaginatedData(page, searchKey);
    setDisplayData(paginatedData.userInfo);
    setLastPage(paginatedData.lastPage);
  };

  const handleSearch = (key) => {
    setPage(1);
    setSearchKey(key);
    const paginatedData = getPaginatedData(page, key);
    setDisplayData(paginatedData.userInfo);
    setLastPage(paginatedData.lastPage);
  };

  const handleEditSave = (id, payload) => {
    editUserData(id, payload);
    updatePage();
  };

  const handleDelete = (id) => {
    deleteUser(id);
    updatePage();
  };

  const handleSelectAll = (isChecked) => {
    const currentPageIds = displayData?.map((info) => info.id);
    if (isChecked) {
      const ids = [...new Set([...selectedIds, ...currentPageIds])];
      setSelectedIds(ids);
    } else {
      const ids = selectedIds.filter((id) => !currentPageIds.includes(id));
      setSelectedIds(ids);
    }
  };

  const onDeleteMultipleUsers = () => {
    deleteMultipleUser(selectedIds);
    setSelectedIds([]);
    updatePage();
  };

  const handleDeleteMultiple = () => {
    if (selectedIds?.length === 0) return;
    const alertHeader = `Deleting User${selectedIds.length > 1 ? "s" : ""}`;
    const alertMessage = `You are deleting <strong>${
      selectedIds.length
    }</strong> user${
      selectedIds.length > 1 ? "s" : ""
    }. Please check before clicking OK.`;
    showAlert(alertHeader, alertMessage, onDeleteMultipleUsers);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} searchKey={searchKey} />
      {displayData?.length ? (
        <>
          <ListTable
            data={displayData}
            handleSelectAll={handleSelectAll}
            handleEditSave={handleEditSave}
            handleDelete={handleDelete}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
          />
          <div
            onClick={handleDeleteMultiple}
            className="delete-btn"
            disabled={!selectedIds?.length}
            // disabled={!selectedIds.length}
          >
            Delete
          </div>
          <Pagination page={page} setPage={setPage} lastPage={lastPage} />
        </>
      ) : (
        <div className="no-data">No data found</div>
      )}
    </>
  );
};

export default LandingPage;
