import React, { useState } from "react";
import { Tabs, Input, Select, DatePicker, Table, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { activeTickets, usedTickets } from '../../../dataDummy';
import "./my_ticket.css";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const MyTicket = () => {
  const [customer, setCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const filteredData = customer?.data.tickets?.filter(ticket =>
    (statusFilter ? (ticket.deleted_at ? "Terpakai" : "Belum terpakai") === statusFilter : true) &&
    (searchQuery ? ticket.ticket_owner_username.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  ) || [];
  const navigate = useNavigate();

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Input
        placeholder="Search Pelanggan"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        prefix={<SearchOutlined />}
      />

      {/* Filter Status Tiket */}
      <Select
        placeholder="Filter Status"
        value={statusFilter}
        onChange={handleStatusFilterChange}
        className="status-filter"
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="Terpakai">Terpakai</Select.Option>
        <Select.Option value="Belum terpakai">Belum terpakai</Select.Option>
      </Select>

      {/* Tabel Data Pelanggan */}
      <Table
        dataSource={filteredData.map(ticket => ({
          id: ticket.ticket_id,
          name: ticket.ticket_owner_username,
          status: ticket.deleted_at ? "Terpakai" : "Belum terpakai",
          usedTime: ticket.deleted_at ? ticket.deleted_at : "—",
        }))}
        rowKey="id"
        pagination={false}
      >
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="Nama" dataIndex="name" key="name" />
        <Table.Column
          title="Status Tiket"
          dataIndex="status"
          key="status"
          render={(text) => (
            <span className="status-container">
              <span className={`status-badge ${text === 'Terpakai' ? 'red-bg' : 'green-bg'}`}>
                {text}
              </span>
            </span>
          )}
        />
        <Table.Column title="Waktu" dataIndex="usedTime" key="usedTime" />
      </Table>

      <Pagination
        current={currentPage}
        total={totalCustomer}
        pageSize={9}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          textAlign: 'center'
        }}
      />
    </div>
  );
};

export default MyTicket;
