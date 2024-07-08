import { CompactTable } from "@table-library/react-table-library/compact";
import React from "react";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
const Table = ({ data }) => {
  // const nodes = [
  //   {
  //     id: "0",
  //     name: "Shopping List",
  //     deadline: new Date(2020, 1, 15),
  //     type: "TASK",
  //     isComplete: true,
  //     nodes: 3,
  //   },
  //   {
  //     id: "2",
  //     name: "OS",
  //     deadline: new Date(2020, 1, 15),
  //     type: "TASK",
  //     isComplete: true,
  //     nodes: 3,
  //   },
  //   {
  //     id: "3",
  //     name: "VS CODE",
  //     deadline: new Date(2020, 1, 15),
  //     type: "TASK",
  //     isComplete: true,
  //     nodes: 3,
  //   },
  //   {
  //     id: "4",
  //     name: "STUDIO",
  //     deadline: new Date(2020, 1, 15),
  //     type: "TASK",
  //     isComplete: true,
  //     nodes: 3,
  //   },
  // ];
  const nodes = data;

  let mydata = { nodes };
  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  mydata = {
    nodes: mydata.nodes.filter((item) =>
      item?.merch_order_id?.includes(search)
    ),
  };
  const theme = useTheme({
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
    BaseCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        padding: 8px 16px;
      `,
  });

  const pagination = usePagination(mydata, {
    state: {
      page: 0,
      size: 7,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }
  const COLUMNS = [
    {
      label: "First Name",
      renderCell: (item) => item.ownerName,
    },
    {
      label: "Middle Name",
      renderCell: (item) => item.middleName,
    },
    {
      label: "Last Name",
      renderCell: (item) => item.lastName,
    },
    {
      label: "Phone Number",
      renderCell: (item) => item.ownerTel,
    },
    {
      label: "Price",
      renderCell: (item) => item.price,
    },
    {
      label: "Size",
      renderCell: (item) => item.size,
    },
    {
      label: "Status",
      renderCell: (item) => item.status,
    },
    {
      label: "Gender",
      renderCell: (item) => item.gender,
    },
    {
      label: "Delivery",
      renderCell: (item) => item.delivery,
    },
    {
      label: "isSelf",
      renderCell: (item) => item.isSelf,
    },
    {
      label: "Reference No.",
      renderCell: (item) => item.merch_order_id,
    },
  ];

  return (
    <>
      <label htmlFor="search">
        Search by Ref No.:&nbsp;
        <input
          id="search"
          type="text"
          value={search}
          placeholder="Search here"
          onChange={handleSearch}
        />
      </label>
      <br />
      <div className="p-4">
        <CompactTable
          columns={COLUMNS}
          data={mydata}
          theme={theme}
          pagination={pagination}
        />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total Pages: {pagination.state.getTotalPages(mydata.nodes)}</span>

        <span>
          Page:{" "}
          {pagination.state.getPages(mydata.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>

      <br />
    </>
  );
};
export default Table;
