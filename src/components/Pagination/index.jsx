import React, { useState, useMemo, useEffect } from "react";
import { MAX_PAGINATION_BTNS } from "../../constants";
import "./pagination.css";
import {
  LeftIcon,
  RightIcon,
  JumpLeftIcon,
  JumpRightIcon,
} from "../../Assets/icons";

const Pagination = (props) => {
  const { page, setPage, lastPage } = props;

  const [paginationBtns, setPaginationBtns] = useState([]);
  const [pageGroupNum, setPageGroupNum] = useState(0);
  const [currentPageGroupBtns, setCurrentPageGroupBtns] = useState([]);

  useEffect(() => {
    generatePaginationBtns();
  }, [lastPage]);

  useEffect(() => {
    for (let i = 0; i < paginationBtns.length; i++) {
      const btnGroup = paginationBtns[i];
      const isPagePresent = btnGroup.find((btn) => btn === page);
      if (isPagePresent) {
        setPageGroupNum(i);
        setCurrentPageGroupBtns(btnGroup);
        break;
      }
    }
  }, [paginationBtns, page]);

  const pageSections = useMemo(
    () => Math.ceil(lastPage / MAX_PAGINATION_BTNS),
    [lastPage]
  );

  const generatePaginationBtns = () => {
    const pageBtns = [];
    let k = 1;
    for (let i = 0; i < pageSections; i++) {
      const individualPageBtns = [];
      for (let j = 0; j < MAX_PAGINATION_BTNS; j++) {
        if (k > lastPage) break;
        individualPageBtns.push(k++);
      }
      pageBtns.push(individualPageBtns);
      if (k > lastPage) break;
    }
    setPaginationBtns(pageBtns);
  };

  const changePage = (isNext) => {
    const changedPage = isNext ? page + 1 : page - 1;
    if (changedPage > 0 && changedPage <= lastPage) setPage(changedPage);
  };

  const jumpChangePage = (isNext) => {
    if(isNext) {
      let tempLastPage = paginationBtns[pageGroupNum][paginationBtns[pageGroupNum].length - 1];
      if(page === tempLastPage && page !==lastPage){
        tempLastPage = paginationBtns[pageGroupNum + 1][paginationBtns[pageGroupNum + 1].length - 1];
        setPage(tempLastPage)
      }else{
        setPage(tempLastPage)
      }
    } else {
      let tempFirstPage = paginationBtns[pageGroupNum][0];
      if(page === tempFirstPage && page !==1){
        tempFirstPage = paginationBtns[pageGroupNum - 1][0];
        setPage(tempFirstPage)
      }else{
        setPage(tempFirstPage)
      }
    }
  };

  const handleSelectPage = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className="pagination-container">
      <div
        onClick={() => jumpChangePage(false)}
        disabled={page === 1}
        className="arrow-btns"
        title="Skip-Prev"
      >
        <JumpLeftIcon />
      </div>
      <div
        onClick={() => changePage(false)}
        disabled={page === 1}
        className="arrow-btns"
        title="Prev"
      >
        <LeftIcon />
      </div>
      <div className="btns-container">
        {currentPageGroupBtns?.map((btn) => (
          <div
            key={btn}
            className={"btns" + (page === btn ? " selected" : "")}
            onClick={() => handleSelectPage(btn)}
          >
            {btn}
          </div>
        ))}
      </div>
      <div
        onClick={() => changePage(true)}
        disabled={page === lastPage}
        className="arrow-btns"
        title="Next"
      >
        <RightIcon />
      </div>
      <div
        onClick={() => jumpChangePage(true)}
        disabled={page === lastPage}
        className="arrow-btns"
        title="Skip-Next"
      >
        <JumpRightIcon />
      </div>
    </div>
  );
};

export default Pagination;
