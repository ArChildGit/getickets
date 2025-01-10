// import React, { useState } from "react";
// import { Segmented, Card, Badge } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { eventsData } from '../../../dataDummy';
// import "./admin_event_list.css";
// import { useNavigate } from 'react-router-dom';

// const AdminEventList = () => {
//   const [currentSegment, setCurrentSegment] = useState("All Event");
//   const [searchQuery, setSearchQuery] = useState(""); // State for search input
//   const navigate = useNavigate();

//   const getStatus = (eventDate) => {
//     const today = new Date();
//     const date = new Date(eventDate);

//     if (date > today) return "Upcoming";
//     if (date.toDateString() === today.toDateString()) return "Ongoing";
//     return "Ended";
//   };

//   const enrichedEvents = eventsData.map((event) => ({
//     ...event,
//     status: getStatus(event.date),
//   }));

//   const filterEvents = (status) => {
//     let filtered = enrichedEvents;
//     if (status !== "All Event") {
//       filtered = filtered.filter((event) => event.status === status);
//     }
//     // Filter based on search query
//     if (searchQuery) {
//       filtered = filtered.filter((event) =>
//         event.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     return filtered;
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value); // Update search query
//   };

//   const handleAddEventClick = () => {
//     navigate('/admin-add-event');
//   };

//   const segments = [
//     {
//       label: `All Event (${enrichedEvents.length})`,
//       value: "All Event",
//     },
//     {
//       label: `Upcoming (${enrichedEvents.filter((e) => e.status === "Upcoming").length})`,
//       value: "Upcoming",
//     },
//     {
//       label: `Ongoing (${enrichedEvents.filter((e) => e.status === "Ongoing").length})`,
//       value: "Ongoing",
//     },
//     {
//       label: `Ended (${enrichedEvents.filter((e) => e.status === "Ended").length})`,
//       value: "Ended",
//     },
//   ];

//   return (
//     <div className="admin-event-list">
//       {/* Header with title, search, and add button */}
//       <div className="admin-event-list-header">
//         <h1 className="admin-event-list-title">Event List</h1>
//         <div className="admin-event-actions">
//           <input
//             type="text"
//             placeholder="Search events..."
//             className="search-input"
//             value={searchQuery}
//             onChange={handleSearch} // Call handleSearch
//           />
//           <button className="add-event-button" onClick={handleAddEventClick}>
//             <PlusOutlined /> Add Event
//           </button>
//         </div>
//       </div>

//       {/* Segmented Control */}
//       <Segmented
//         className="admin-segmented"
//         options={segments}
//         value={currentSegment}
//         onChange={setCurrentSegment}
//         block
//         style={{ fontSize: "16px" }}
//       />

//       {/* Event List */}
//       <div className="event-grid">
//         {filterEvents(currentSegment).map((event) => (
//           <Card key={event.id} className="event-card">
//             {/* Header: Title and Status */}
//             <div className="event-card-header">
//               <span className="event-card-title-text">{event.name}</span>
//               <Badge
//                 text={event.status}
//                 color={
//                   event.status === "Upcoming"
//                     ? "blue"
//                     : event.status === "Ongoing"
//                       ? "green"
//                       : "red"
//                 }
//                 className="event-badge"
//               />
//             </div>

//             {/* Body: Image and Details */}
//             <div className="event-card-body">
//               <div className="event-card-image-container">
//                 <img
//                   alt={event.name}
//                   src={event.image}
//                   className="event-card-image"
//                 />
//               </div>
//               <div className="event-card-details">
//                 <p>{event.description}</p>
//                 <p>
//                   <strong>Lokasi:</strong> {event.location}
//                 </p>
//                 <p>
//                   <strong>Penyelenggara:</strong> {event.organizer}
//                 </p>
//                 <p>
//                   <strong>Harga Tiket:</strong> Rp{event.ticketPrice.toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Kuota:</strong> {event.quota} tiket
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminEventList;
