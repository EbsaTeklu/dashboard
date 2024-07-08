import React, { useState, useRef } from "react";
import { Button, Input, Space, Table } from "antd";
import { signOut } from 'next-auth/react'
import {
  SearchOutlined,
  DownloadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";
import XLSX from "xlsx/dist/xlsx.full.min.js";

const MyTable = ({ data }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleLogout = () => {
    // router.push("/api/auth/federated-sign-out");
    // signOutHandler();
      signOut({ redirect: false }).then(() => {
        router.push("/");})
  };

  const handleExportToExcel = () => {
    if (!data || data.length === 0) {
      console.error("No data to export");
      return;
    }

    const exportData = data.map((item) => ({ ...item }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "exported_data.xlsx");
  };
  const handleEdit = () =>{
    console.log("from edit")
    router.push('/edit')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className="p-8">
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="secondary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="w-20"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            className="w-20"
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // const columns =
  //   data && data.length > 0
  //     ? Object.keys(data[0]).map((key) => ({
  //         title: key,
  //         dataIndex: key,
  //         key: key,
  //         ...getColumnSearchProps(key),
  //       }))
  //     : [];
  const columns = [
    {
      title: "#",
      // dataIndex: "ownerName",
      key: "index",
      width: "10%",
      // key="index"
      render: (text, record, index) => index + 1,
      // render: (text, record, index) =>
      // (pageSize - 1) * paginationSize + index + 1,
      // render: (value, item, index) => 1 + index,
      // ...getColumnSearchProps("ownerName"),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      width: "10%",
      render: (text, record) => (
        <button onClick={()=> {router.push(`/edit/${record.code}`)} }>
        {/* // <button onClick={()=> {console.log(record)} }> */}
          <img src="/great/dashboard/icons/edit.svg" className="h-4 w-4"/>
        </button>
       ),
    },
    {
      title: "Owner Name",
      dataIndex: "name",
      key: "ownerName",
      width: "15%",
      // ...getColumnSearchProps("name"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
      // ...getColumnSearchProps("firstName"),
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      key: "mname",
      width: "15%",
      ...getColumnSearchProps("middleName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lname",
      width: "15%",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Phone Number",
      dataIndex: "ownerTel",
      key: "telNum",
      width: "15%",
      ...getColumnSearchProps("ownerTel"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      ...getColumnSearchProps("price"),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: "20%",
      ...getColumnSearchProps("size"),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: "20%",
    //   ...getColumnSearchProps("status"),
    // },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "20%",
      ...getColumnSearchProps("gender"),
    },
    {
      title: "Station",
      dataIndex: "station",
      key: "station",
      width: "20%",
      ...getColumnSearchProps("station"),
    },
    {
      // title: "isSelf",
      // dataIndex: "isSelf",
      // key: "isSelf",
      // width: "20%",
      title: "isSelf",
      dataIndex: "isSelf",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      key: "isSelf",
      width: "20%",
      // onFilter: (value, record) => record.address.startsWith(value),
      ...getColumnSearchProps("isSelf"),
      render: (value) => String(value),
    },
    // {
    //   title: "isSelf",
    //   dataIndex: "isSelf",
    //   filters: [
    //     {
    //       text: "True",
    //       value: true,
    //     },
    //     {
    //       text: "False",
    //       value: false,
    //     },
    //   ],
    //   onFilter: (value, record) => record.address.startsWith(value),
    //   filterSearch: true,
    //   width: "40%",
    // },
    {
      title: "Reference No.",
      dataIndex: "code",
      key: "reference",
      width: "20%",
      ...getColumnSearchProps("code"),
    },
  ];

  return (
    <>
    
      {/* <div className="flex flex-row items-end justify-end w-full space-x-4 mb-4">
        <Button
          type="text"
          icon={<DownloadOutlined />}
          onClick={handleExportToExcel}
          className="text-green-500"
        >
          Export to Excel
        </Button>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="text-red-500"
        >
          Logout
        </Button>
      </div> */}
      <div className="flex flex-row items-end justify-end px-10 m-2">
         <Button
          type="text"
          icon={<DownloadOutlined />}
          onClick={handleExportToExcel}
          className="bg-d-500 text-c"
        >
          Export Data to Excel
        </Button>
      </div>
      <div className="px-10">

      <Table columns={columns} dataSource={data} pagination={{ pageSize: 8 }} />
      </div>
    </>
  );
};

export default MyTable;
