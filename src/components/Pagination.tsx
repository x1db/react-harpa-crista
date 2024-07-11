import { useState } from "react";
import { Pagination as BsPagination } from "react-bootstrap";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisibleItems?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisibleItems = 5,
}: Props) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    onPageChange(page);
  };

  const startPage = Math.max(1, activePage - Math.floor(maxVisibleItems / 2));
  const endPage = Math.min(totalPages, startPage + maxVisibleItems - 1);

  const pageItems = [];
  if (startPage > 1) {
    pageItems.push(
      <BsPagination.Item key={1} onClick={() => handlePageChange(1)}>
        1
      </BsPagination.Item>
    );
    if (startPage > 2) {
      pageItems.push(<BsPagination.Ellipsis key="ellipsis-start" disabled />);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <BsPagination.Item
        key={i}
        active={i === activePage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </BsPagination.Item>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageItems.push(<BsPagination.Ellipsis key="ellipsis-end" disabled />);
    }
    pageItems.push(
      <BsPagination.Item
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </BsPagination.Item>
    );
  }

  return (
    <BsPagination>
      <BsPagination.First
        onClick={() => handlePageChange(1)}
        disabled={activePage === 1}
      />
      <BsPagination.Prev
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      />
      {pageItems}
      <BsPagination.Next
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      />
      <BsPagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={activePage === totalPages}
      />
    </BsPagination>
  );
};

export default Pagination;
