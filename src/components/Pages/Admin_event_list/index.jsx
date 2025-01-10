import React, { useState, useEffect } from "react";
import { Card, Pagination, Input, Button, Spin, Empty } from "antd";
import { PlusOutlined, InfoCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { fetchManagedEvents } from "../../../utils/geticket_api_helper/events";
import { getEventImage } from "../../../utils/geticket_api_helper/static";
import "./admin_event_list.css";
import { useNavigate } from "react-router-dom";

const AdminEventList = () => {
  const [currentSegment, setCurrentSegment] = useState("All Event");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [images, setImages] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [page, searchQuery]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetchManagedEvents(page, perPage, searchQuery);
      const events = response.data?.events || response.events || [];
      const totalEvents = response.data?.total_events || response.total_events || 0;

      setEvents(events);
      setTotalEvents(totalEvents);

      const imagePromises = events.map(async (event) => {
        const imageURL = await getEventImage(event.gambar);
        return { id: event.id, imageURL };
      });

      const resolvedImages = await Promise.all(imagePromises);
      const imageMap = resolvedImages.reduce((acc, { id, imageURL }) => {
        acc[id] = imageURL;
        return acc;
      }, {});

      setImages(imageMap);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleAddEventClick = () => {
    navigate("/admin-add-event");
  };

  const handleCardClick = (eventId) => {
    navigate(`/admin-events/${eventId}`);
  };

  const formatTanggal = (tanggal) => {
    const options = { day: "numeric", month: "long" };
    return new Date(tanggal).toLocaleDateString("id-ID", options).toUpperCase();
  };


  return (
    <div className="admin-event-list">
      <div className="admin-event-list-header">
        <h1 className="admin-event-list-title">Manage Events</h1>
        <div className="admin-event-actions">
          <Input
            placeholder="Search events..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddEventClick}
          >
            Add Event
          </Button>
        </div>
      </div>

      <div className="event-list-container">
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : events.length > 0 ? (
          <div className="event-grid">
            {events.map((event) => (
              <Card
                key={event.id}
                hoverable
                className="event-card"
                cover={
                  <div className="event-card-image-container">
                    <img
                      alt={event.nama}
                      src={images[event.id] || "default-placeholder.jpg"}
                      className="event-card-image"
                    />
                    <div className="event-card-date">{formatTanggal(event.tanggal)}</div>
                  </div>
                }
                onClick={() => handleCardClick(event.id)}
              >
                <Card.Meta
                  title={
                    <h2 className="event-card-title">{event.nama}</h2>
                  }
                  description={
                    <div className="event-card-details">
                      <div className="event-card-item">
                        <InfoCircleOutlined className="event-card-icon" />
                        <span className="event-card-text">{event.deskripsi}</span>
                      </div>
                      <div className="event-card-item">
                        <EnvironmentOutlined className="event-card-icon" />
                        <span className="event-card-text">{event.lokasi}</span>
                      </div>
                    </div>
                  }
                />
              </Card>

            ))}
          </div>
        ) : (
          <Empty description="No events found" />
        )}
      </div>

      <div className="pagination-container">
        <Pagination
          current={page}
          pageSize={perPage}
          total={totalEvents}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AdminEventList;