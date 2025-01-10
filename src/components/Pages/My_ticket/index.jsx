import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Tabs, Card, Pagination, Typography, Space, Input, Button, Modal, Form, notification } from "antd";
import { SearchOutlined, SendOutlined, CalendarOutlined, EnvironmentOutlined, QrcodeOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteTicket, fetchMyTicket, sendTicket } from "../../../utils/geticket_api_helper/tickets";
import { getEventImage } from "../../../utils/geticket_api_helper/static";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const MyTicket = () => {
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTicket, setTotalTicket] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [images, setImages] = useState({});
  const [form] = Form.useForm();
  const [showQRCodeModal, setShowQRCodeModal] = useState(false); // State untuk kontrol modal QR Code
  const [barcodeTicketId, setBarcodeTicketId] = useState(null); // State untuk menyimpan ticket ID yang sedang ditampilkan barcode-nya

  useEffect(() => {
    getMyTicket();
  }, [currentPage, searchQuery]);

  const getMyTicket = async () => {
    try {
      setLoading(true);
      const data = await fetchMyTicket(currentPage, 4, searchQuery);
      setTicket(data);
      setTotalTicket(data.total_count);

      const imagePromises = data.tickets.map(async (tickets) => {
        const imageURL = await getEventImage(tickets.event_image);
        return { id: tickets.ticket_id, imageURL };
      });

      const resolvedImages = await Promise.all(imagePromises);
      const imageMap = resolvedImages.reduce((acc, { id, imageURL }) => {
        acc[id] = imageURL;
        return acc;
      }, {});

      setImages(imageMap);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error fetching tickets",
        description: error.message,
      });
    }
  };

  const handleOpenModal = (ticketId) => {
    setSelectedTicketId(ticketId);
    setVisible(true);
    form.setFieldsValue({ ticket_id: ticketId });
  };

  const handleCloseModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await sendTicket(values.ticket_id, values.new_user_id);
      notification.success({
        message: "Success",
        description: "Ticket transferred successfully!",
      });
      getMyTicket();
      handleCloseModal();
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error transferring ticket",
        description: error.message,
      });
    }
  };

  const handleDeleteTicket = async (ticket_id) => {
    try {
      setLoading(true);
      if (!window.confirm('Are you sure you want to delete this ticket?')) return;
      await deleteTicket(ticket_id);
      notification.success({
        message: "Success",
        description: "Ticket has been deleted!",
      });
      getMyTicket();
      handleCloseModal();
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error deleting ticket",
        description: error.message,
      });
    }
  };

  const handleQRCodeClick = (ticketId) => {
    setBarcodeTicketId(ticketId); // Menyimpan ticketId yang QR-nya akan ditampilkan
    setShowQRCodeModal(true); // Menampilkan modal QR Code
  };

  //MAUNYA
  const generateTicketNumber = (ticket) => {
    const { package_id, ticket_id, purchase_date } = ticket;
    const idAcara = ticket.event?.id_acara || "UNKNOWN"; // Pastikan data event diambil
    const purchaseDate = new Date(purchase_date);

    const day = String(purchaseDate.getDate()).padStart(2, "0");
    const month = String(purchaseDate.getMonth() + 1).padStart(2, "0");
    const year = purchaseDate.getFullYear();

    return `${idAcara}-${package_id}-${ticket_id}-${day}-${month}-${year}`;
  };

  const renderTickets = (tickets) => (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 ">
      {(tickets || []).map((ticket) => (
        <Card
          key={ticket.ticket_id}
          bordered={false}
          className="rounded-sm shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-sky-950"
          style={{
            backgroundColor: ticket.ticket_deleted_at ? "#ffcccc" : "#e6f7ff", // Merah jika terhapus, biru jika tidak
            borderRadius: "10px",
          }}
        >
          <div className="flex items-center">
            {/* Gambar */}
            <img
              src={images[ticket.ticket_id] || "default-placeholder.jpg"}
              alt={ticket.event_name}
              className="w-1/3 h-48 object-cover rounded-md mr-4"
            />

            {/* Detail Event */}
            <div className="flex-1">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>No. Ticket: {ticket.ticket_id}</span>
                <span>
                  Purchase Date: {ticket.ticket_purchase_date ? new Date(ticket.ticket_purchase_date).toLocaleDateString() : "-"}
                </span>
              </div>
              <hr className="border-black mb-3" />
              <div className="text-left">
                <Title level={3} className="font-bold text-lg mb-1">
                  {ticket.event_name}
                </Title>
                <Text className="block mb-1">
                  <CalendarOutlined className="mr-2" />
                  {ticket.event_date || "-"}
                </Text>
                <Text className="block mb-3">
                  <EnvironmentOutlined className="mr-2" />
                  {ticket.event_location || "-"}
                </Text>
              </div>

              <div className="flex justify-between mt-6">

                <div>{ticket.ticket_deleted_at === null && (<Button
                  type="default"
                  className="rounded-md px-4 py-2 bg-indigo-950 text-white hover:bg-indigo-800"
                  onClick={() => handleQRCodeClick(ticket.ticket_id)}
                  icon={<QrcodeOutlined />}
                >
                </Button>)}
                  <Button
                    type="default"
                    className="rounded-md pr-4 pl-0.5 py-2 bg-red-950 text-white hover:bg-indigo-80"
                    onClick={() => handleDeleteTicket(ticket.ticket_id)}
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>
                {ticket.ticket_deleted_at === null && (
                  <Button
                    type="primary"
                    className="rounded-md px-4 py-2 bg-sky-200 text-blue-900 hover:bg-blue-400"
                    icon={<SendOutlined />}
                    onClick={() => handleOpenModal(ticket.ticket_id)}
                  >
                    Share Ticket
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-5  min-h-screen" style={{
      background: "#E0E3E8",
    }}>
      <Title level={1} className="text-center my-5">
        My Tickets
      </Title>

      {/* Wrapper untuk search agar di tengah */}
      <div className="flex justify-center mb-5">
        <Input
          placeholder="Search Ticket"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-2/3 lg:w-1/2 py-2 rounded-2xl shadow-md"
          prefix={<SearchOutlined />}
        />
      </div>

      {/* Wrapper untuk card tab agar berada di tengah dan memenuhi lebar layar */}
      <div className="flex justify-center">
        <Tabs
          type="card"
          className="w-full sm:w-4/5 lg:w-4/5  rounded-lg "
        >
          <TabPane tab={`Active Ticket`} key="1">
            {renderTickets(ticket?.tickets?.filter((t) => !t.ticket_deleted_at))}
          </TabPane>
          <TabPane tab={`Used Ticket`} key="2">
            {renderTickets(ticket?.tickets?.filter((t) => t.ticket_deleted_at))}
          </TabPane>
        </Tabs>
      </div>

      <Pagination
        current={currentPage}
        total={totalTicket}
        pageSize={4}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        className="flex justify-center mt-5"
      />

      <Modal
        title="Transfer Ticket"
        open={visible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleSend}>
            Transfer
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Ticket ID" name="ticket_id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="New User ID"
            name="new_user_id"
            rules={[{ required: true, message: "Please enter the new user ID" }]}
          >
            <Input placeholder="Enter new user ID" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal untuk menampilkan QR Code */}
      <Modal
        title="QR Code"
        open={showQRCodeModal}
        onCancel={() => setShowQRCodeModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowQRCodeModal(false)}>
            Close
          </Button>,
        ]}
      >
        {barcodeTicketId && (
          <div className="flex justify-center">
            <QRCode value={barcodeTicketId} size={200} /> {/* Menampilkan QR Code */}
          </div>
        )}
      </Modal>
    </div>
  );


};

export default MyTicket;

// import React, { useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import { Tabs, Card, Pagination, Typography, Space, Input, Button, Modal, Form, notification, Skeleton } from "antd";
// import { SearchOutlined, SendOutlined, CalendarOutlined, EnvironmentOutlined, QrcodeOutlined, FieldTimeOutlined } from "@ant-design/icons";
// import { fetchMyTicket, sendTicket } from "../../../utils/geticket_api_helper/tickets";
// import { getEventImage } from "../../../utils/geticket_api_helper/static";

// const { Title, Text } = Typography;
// const { TabPane } = Tabs;

// const TicketCardSkeleton = () => (
//   <Card
//     bordered={false}
//     className="rounded-sm shadow-5xl shadow-white"
//     style={{
//       backgroundColor: "#e6f7ff",
//       borderRadius: "10px",
//     }}
//   >
//     <div className="flex flex-col items-stretch">
//       <div className="flex justify-between text-sm font-medium mb-2 rounded-t-lg pb-2 border-b border-black">
//         <Skeleton.Input active size="small" style={{ width: 120 }} />
//         <Skeleton.Input active size="small" style={{ width: 150 }} />
//       </div>

//       <div className="flex items-center">
//         <Skeleton.Image style={{ width: "33%", height: 160, marginRight: 8 }} active />
//         <div className="flex-1">
//           <div className="text-left">
//             <Skeleton active paragraph={{ rows: 3 }} />
//           </div>
//           <div className="flex justify-end mt-6 gap-x-2">
//             <Skeleton.Button active size="default" shape="round" />
//             <Skeleton.Button active size="default" shape="round" />
//           </div>
//         </div>
//       </div>
//     </div>
//   </Card>
// );

// const MyTicket = () => {
//   const [loading, setLoading] = useState(true);
//   const [ticket, setTicket] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalTicket, setTotalTicket] = useState(0);
//   const [visible, setVisible] = useState(false);
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [images, setImages] = useState({});
//   const [form] = Form.useForm();
//   const [showQRCodeModal, setShowQRCodeModal] = useState(false);
//   const [barcodeTicketId, setBarcodeTicketId] = useState(null);

//   useEffect(() => {
//     getMyTicket();
//   }, [currentPage, searchQuery]);

//   const getMyTicket = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchMyTicket(currentPage, 4, searchQuery);
//       setTicket(data);
//       setTotalTicket(data.total_count);

//       const imagePromises = data.tickets.map(async (tickets) => {
//         const imageURL = await getEventImage(tickets.event_image);
//         return { id: tickets.ticket_id, imageURL };
//       });

//       const resolvedImages = await Promise.all(imagePromises);
//       const imageMap = resolvedImages.reduce((acc, { id, imageURL }) => {
//         acc[id] = imageURL;
//         return acc;
//       }, {});

//       setImages(imageMap);

//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       notification.error({
//         message: "Error fetching tickets",
//         description: error.message,
//       });
//     }
//   };

//   const handleOpenModal = (ticketId) => {
//     setSelectedTicketId(ticketId);
//     setVisible(true);
//     form.setFieldsValue({ ticket_id: ticketId });
//   };

//   const handleCloseModal = () => {
//     setVisible(false);
//     form.resetFields();
//   };

//   const handleSend = async () => {
//     try {
//       setLoading(true);
//       const values = await form.validateFields();
//       await sendTicket(values.ticket_id, values.new_user_id);
//       notification.success({
//         message: "Success",
//         description: "Ticket transferred successfully!",
//       });
//       getMyTicket();
//       handleCloseModal();
//     } catch (error) {
//       setLoading(false);
//       notification.error({
//         message: "Error transferring ticket",
//         description: error.message,
//       });
//     }
//   };

//   const handleQRCodeClick = (ticketId) => {
//     setBarcodeTicketId(ticketId);
//     setShowQRCodeModal(true);
//   };

//   const formatPurchaseDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);

//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const period = hours >= 12 ? "PM" : "AM";
//     const formattedHours = String(hours % 12 || 12).padStart(2, "0");
//     const formattedTime = `${formattedHours}:${minutes} ${period}`;

//     return `${formattedDate}, ${formattedTime}`;
//   };

//   const generateTicketNumber = (ticket) => {
//     const { package_id, ticket_id, purchase_date } = ticket;
//     const idAcara = ticket.event?.id_acara || "UNKNOWN";
//     const purchaseDate = new Date(purchase_date);

//     const day = String(purchaseDate.getDate()).padStart(2, "0");
//     const month = String(purchaseDate.getMonth() + 1).padStart(2, "0");
//     const year = purchaseDate.getFullYear();

//     return `${idAcara}-${package_id}-${ticket_id}-${day}-${month}-${year}`;
//   };

//   const renderSkeletonGrid = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
//       {[1, 2, 3, 4].map((key) => (
//         <TicketCardSkeleton key={key} />
//       ))}
//     </div>
//   );

//   const renderTickets = (tickets) => (
//     <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
//       {(tickets || []).map((ticket) => (
//         <Card
//           key={ticket.ticket_id}
//           bordered={false}
//           className="rounded-sm shadow-5xl shadow-white"
//           style={{
//             backgroundColor: "#e6f7ff",
//             borderRadius: "10px",
//           }}
//         >
//           <div className="flex flex-col items-stretch">
//             <div className="flex justify-between text-sm font-medium mb-2 rounded-t-lg pb-2 border-b border-black">
//               <span>No. Ticket: {ticket.ticket_id}</span>
//               <span><FieldTimeOutlined /> {formatPurchaseDate(ticket.ticket_purchase_date)}</span>
//             </div>

//             <div className="flex items-center">
//               <img
//                 src={images[ticket.ticket_id] || "default-placeholder.jpg"}
//                 alt={ticket.event_name}
//                 className="w-1/3 h-40 object-cover rounded-sm mr-2"
//               />

//               <div className="flex-1">
//                 <div className="text-left">
//                   <Title level={3} className="font-bold text-lg mb-1">
//                     {ticket.event_name}
//                   </Title>
//                   <Text className="block mb-1">
//                     <CalendarOutlined className="mr-2" />
//                     {ticket.event_date || "-"}
//                   </Text>
//                   <Text className="block mb-3">
//                     <EnvironmentOutlined className="mr-2" />
//                     {ticket.event_location || "-"}
//                   </Text>
//                 </div>

//                 <div className="flex justify-end mt-6 gap-x-2">
//                   <Button
//                     type="default"
//                     className="rounded-md px-4 py-2 bg-indigo-950 text-white hover:bg-indigo-800"
//                     icon={<QrcodeOutlined />}
//                     onClick={() => handleQRCodeClick(ticket.ticket_id)}
//                   />
//                   <Button
//                     type="primary"
//                     className="rounded-md px-4 py-2 bg-blue-500 !text-blue-900 hover:!bg-blue-400"
//                     icon={<SendOutlined />}
//                     onClick={() => handleOpenModal(ticket.ticket_id)}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );

//   return (
//     <div className="p-5 min-h-screen"
//     style={{ background: "#E0E3E8", }}
//     >
//       <Title level={1} className="text-center my-5" style={{ fontWeight: "bold" }}>
//         {loading ? <Skeleton.Input style={{ width: 200 }} active /> : "My Tickets"}
//       </Title>

//       <div className="flex justify-center mb-5">
//         <Input
//           placeholder="Search Ticket"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full sm:w-2/3 lg:w-1/2 py-2 rounded-2xl shadow-lg shadow-sky-700"
//           prefix={<SearchOutlined />}
//           disabled={loading}
//         />
//       </div>

//       <div className="flex justify-center">
//         <Tabs
//           type="line"
//           centered
//           tabBarStyle={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "3rem",
//             marginBottom: "1rem",
//           }}
//           tabBarClassName="text-lg font-medium"
//         >
//           <TabPane
//             tab={
//               <span className="hover:text-blue-500 transition duration-200">
//                 Active Ticket ({loading ? "-" :
//                   (ticket?.total_count - ticket?.tickets?.filter((t) => t.ticket_deleted_at).length || 0)})
//               </span>
//             }
//             key="1"
//           >
//             {loading ? renderSkeletonGrid() : renderTickets(ticket?.tickets?.filter((t) => !t.ticket_deleted_at))}
//           </TabPane>
//           <TabPane
//             tab={
//               <span className="hover:text-blue-500 transition duration-200">
//                 Used Ticket ({loading ? "-" :
//                   (ticket?.tickets?.filter((t) => t.deleted_at).length || 0)})
//               </span>
//             }
//             key="2"
//           >
//             {loading ? renderSkeletonGrid() : renderTickets(ticket?.tickets?.filter((t) => t.deleted_at))}
//           </TabPane>
//         </Tabs>
//       </div>

//       {loading ? (
//         <div className="flex justify-center mt-5">
//           <Skeleton.Input style={{ width: 200 }} active />
//         </div>
//       ) : (
//         <Pagination
//           current={currentPage}
//           total={totalTicket}
//           pageSize={4}
//           onChange={(page) => setCurrentPage(page)}
//           showSizeChanger={false}
//           className="flex justify-center mt-5"
//         />
//       )}

//       <Modal
//         title="Transfer Ticket"
//         open={visible}
//         onCancel={handleCloseModal}
//         footer={[
//           <Button key="cancel" onClick={handleCloseModal}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" loading={loading} onClick={handleSend}>
//             Transfer
//           </Button>,
//         ]}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item label="Ticket ID" name="ticket_id">
//             <Input disabled />
//           </Form.Item>
//           <Form.Item
//             label="New User ID"
//             name="new_user_id"
//             rules={[{ required: true, message: "Please enter the new user ID" }]}
//           >
//             <Input placeholder="Enter new user ID" />
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="QR Code"
//         open={showQRCodeModal}
//         onCancel={() => setShowQRCodeModal(false)}
//         footer={[
//           <Button key="close" onClick={() => setShowQRCodeModal(false)}>
//             Close
//           </Button>,
//         ]}
//       >
//         {barcodeTicketId && (
//           <div className="flex justify-center">
//             <QRCode value={barcodeTicketId} size={200} />
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default MyTicket;