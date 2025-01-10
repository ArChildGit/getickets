// import React, { useState } from "react";
// import { Tabs, Input, Select, DatePicker, Table } from "antd";
// import { activeTickets, usedTickets } from '../../../dataDummy';
// import "./my_ticket.css";

// const { TabPane } = Tabs;
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const MyTicket = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [filteredTickets, setFilteredTickets] = useState({
//     active: activeTickets || [],
//     used: usedTickets || [],
//   });

//   // Handle Search
//   const handleSearch = (value) => {
//     const lowercasedValue = value.toLowerCase();
//     setFilteredTickets({
//       active: (activeTickets || []).filter((ticket) =>
//         ticket.product.toLowerCase().includes(lowercasedValue)
//       ),
//       used: (usedTickets || []).filter((ticket) =>
//         ticket.product.toLowerCase().includes(lowercasedValue)
//       ),
//     });
//   };

//   // Handle Sorting
//   const handleSort = (value) => {
//     const sortedActive = [...(filteredTickets.active || [])];
//     const sortedUsed = [...(filteredTickets.used || [])];

//     if (value === "new") {
//       sortedActive.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
//       sortedUsed.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
//     } else if (value === "old") {
//       sortedActive.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
//       sortedUsed.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
//     } else if (value === "alphabetical") {
//       sortedActive.sort((a, b) => a.product.localeCompare(b.product));
//       sortedUsed.sort((a, b) => a.product.localeCompare(b.product));
//     }

//     setFilteredTickets({ active: sortedActive, used: sortedUsed });
//     setSortBy(value);
//   };

//   // Render product column
//   const renderProductColumn = (text, record) => (
//     <div className="product-cell">
//       <p className="product-code">{`[${record.ticketCode}] - ${record.product}`}</p>
//       <div className="product-detail">
//         <img
//           src={record.image}
//           alt={record.product}
//           className="product-image"
//         />
//         <div className="product-info">
//           <h3 className="product-location">Location</h3>
//           <p>{record.location}</p>
//           <h3 className="product-organizer">Organizer</h3>
//           <p>{record.organizer}</p>
//         </div>
//       </div>
//     </div>
//   );

//   // Handle view details
//   const handleViewDetails = (ticket) => {
//     console.log("Viewing details for:", ticket);
//   };

//   // Columns for Tables
//   const columnsActive = [
//     {
//       title: "Product",
//       dataIndex: "product",
//       key: "product",
//       align: "left",
//       render: renderProductColumn,
//     },
//     { title: "Purchase Date", dataIndex: "purchaseDate", key: "purchaseDate", align: "center" },
//     { title: "Qty", dataIndex: "qty", key: "qty", align: "center" },
//     { 
//       title: "Total Price", 
//       dataIndex: "totalPrice", 
//       key: "totalPrice", 
//       align: "center",
//       render: (price) => `Rp${price.toLocaleString()}`, // Ensure safe rendering
//     },
//     { title: "Expiration Date", dataIndex: "expirationDate", key: "expirationDate", align: "center" },
//   ];

//   const columnsUsed = [
//     {
//       title: "Product",
//       dataIndex: "product",
//       key: "product",
//       align: "left",
//       render: renderProductColumn,
//     },
//     { title: "Purchase Date", dataIndex: "purchaseDate", key: "purchaseDate", align: "center" },
//     { title: "Qty", dataIndex: "qty", key: "qty", align: "center" },
//     { 
//       title: "Total Price", 
//       dataIndex: "totalPrice", 
//       key: "totalPrice", 
//       align: "center",
//       render: (price) => `Rp${price.toLocaleString()}`, // Ensure safe rendering
//     },
//     { title: "Used Date", dataIndex: "usedDate", key: "usedDate", align: "center" },
//   ];

//   // Render filter section
//   const renderFilters = () => (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexWrap: "wrap",
//         gap: "20px",
//         marginBottom: "20px",
//       }}
//     >
//       <Input.Search
//         placeholder="Cari tiket..."
//         enterButton
//         onSearch={handleSearch}
//         style={{ width: "250px" }}
//       />
//       <Select
//         placeholder="Sort by"
//         style={{ width: "200px" }}
//         onChange={handleSort}
//         value={sortBy}
//       >
//         <Option value="new">New date</Option>
//         <Option value="old">Old date</Option>
//         <Option value="alphabetical">Name</Option>
//       </Select>
//       <RangePicker placeholder={["Tanggal Awal", "Tanggal Akhir"]} />
//     </div>
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <Tabs>
//         <TabPane tab={`Active Tickets (${filteredTickets.active.length})`} key="1">
//           {renderFilters()}
//           <Table
//             dataSource={filteredTickets.active}
//             columns={columnsActive}
//             rowKey="id"
//             pagination={{ pageSize: 5 }}
//           />
//         </TabPane>
//         <TabPane tab={`Used Tickets (${filteredTickets.used.length})`} key="2">
//           {renderFilters()}
//           <Table
//             dataSource={filteredTickets.used}
//             columns={columnsUsed}
//             rowKey="id"
//             pagination={{ pageSize: 5 }}
//           />
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default MyTicket;
