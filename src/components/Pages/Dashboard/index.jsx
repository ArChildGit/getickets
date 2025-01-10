import React, { useState, useEffect } from 'react';
import { Carousel, Input, List, Card, Pagination } from 'antd';
import { SearchOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { fetchEvents } from '../../../utils/geticket_api_helper/events'; // Helper API sebelumnya
import { getEventImage } from '../../../utils/geticket_api_helper/static'; // Helper baru
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import cr1 from '../../../assets/geticket_images/carrousel items/cr1.jpeg'
import cr2 from '../../../assets/geticket_images/carrousel items/cr2.jpeg'
import cr3 from '../../../assets/geticket_images/carrousel items/cr3.jpeg'
import './dashboard.css';

const { Search } = Input;

const formatTanggal = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('id-ID', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return { month, day, year };
};

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick}>
    <LeftOutlined />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick}>
    <RightOutlined />
  </div>
);

const featured = [
  { image: cr1, title: 'Featured Event 1' },
  { image: cr2, title: 'Featured Event 2' },
  { image: cr3, title: 'Featured Event 2' },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [images, setImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchAndSetEvents = async () => {
    const data = await fetchEvents(currentPage, 9, searchTerm);
    setEvents(data.events);
    setTotalEvents(data.total_events);

    const imagePromises = data.events.map(async (event) => {
      const imageURL = await getEventImage(event.gambar);
      return { id: event.id, imageURL };
    });

    const resolvedImages = await Promise.all(imagePromises);
    const imageMap = resolvedImages.reduce((acc, { id, imageURL }) => {
      acc[id] = imageURL;
      return acc;
    }, {});

    setImages(imageMap);
  };

  useEffect(() => {
    fetchAndSetEvents();
  }, [currentPage, searchTerm]);

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`); // Navigate to event details page
  };

  return (
    <div style={{ background: "#E0E3E8" }}>
      <Carousel autoplay dots arrows prevArrow={<PrevArrow />} nextArrow={<NextArrow />}>
        {featured.map((item, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={item.image || 'default-placeholder.jpg'}
              alt={item.title}
              style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>


      <div style={{ margin: '35px ' }}>
        <Search
          placeholder="Cari acara..."
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: '100%' }}
        />
      </div>

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={events}
        renderItem={(event) => {
          const { month, day, year } = formatTanggal(event.tanggal);

          return (
            <List.Item>
              <Card
                className="card-3d"
                title={<div className="card-title">{event.nama}</div>}
                cover={
                  <img
                    alt={event.nama}
                    src={images[event.id] || 'default-placeholder.jpg'}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                }
                onClick={() => handleCardClick(event.id)} // Add onClick here
              >
                <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                  <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%', color: '#3F72AF' }}>
                    <p style={{ margin: 0 }}>{month}</p>
                    <p style={{ margin: 0 }}>{day}</p>
                  </div>
                  <p className="card-description" style={{ flex: 1, marginLeft: '10px' }}>
                    {event.deskripsi}
                  </p>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />

      <Pagination
        current={currentPage}
        total={totalEvents}
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

export default Dashboard;
