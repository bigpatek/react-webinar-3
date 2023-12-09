import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem} from "@bem-react/classname";

const   Pagination = ({ firstPage, activePage, lastPage, changePage }) => {

  const cn = bem("Pagination");

  return (
    <div className={cn()}>
      <div className={cn("row")}>
        <div className={cn("list")}>
          <div className={cn("item")}>
            <span className={cn("link" , {active: activePage === firstPage})} onClick={() => changePage(firstPage)}>{firstPage}</span>
          </div>

          <div
            className={cn("main-list", {
              separatedLeft: activePage - firstPage >= 3,
              separatedRight: lastPage - activePage >= 3,
            })}
          >
            {activePage === lastPage && (
              <div className={cn("item")}>
                  <span className={cn("link" , {active: activePage === lastPage - 2})} onClick={() => changePage(lastPage-2)}>{lastPage-2}</span>
              </div>
            )}

            {activePage - 1 > firstPage && (
              <div className={cn("item")}>
                  <span className={cn("link" , {active: activePage === activePage -1})} onClick={() => changePage(activePage - 1)}>{activePage - 1}</span>
              </div>
            )}

            {![firstPage, lastPage].includes(activePage) && (
              <div className={cn("item")}>
                  <span className={cn("link", {active: activePage === activePage})} onClick={() => changePage(activePage)}>{activePage}</span>
              </div>
            )}

            {activePage + 1 < lastPage && (
              <div className={cn("item")}>
                  <span className={cn("link", {active: activePage === activePage + 1})} onClick={() => changePage(activePage + 1)}>{activePage + 1}</span>
              </div>
            )}

            {activePage === firstPage && (
              <div className={cn("item")}>
                  <span className={cn("link", {active: activePage === firstPage + 2})} onClick={() => changePage(firstPage + 2)}>{firstPage + 2}</span>
              </div>
            )}
          </div>

          <div className={cn("item")}>
            <span className={cn("link", {active: activePage === lastPage})} onClick={() => changePage(lastPage)}>{lastPage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  firstPage: PropTypes.number,
  activePage: PropTypes.number,
  lastPage: PropTypes.number,
};

Pagination.defaultProps = {
  firstPage: 1,
};

export default Pagination;