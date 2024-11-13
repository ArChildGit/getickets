import React, { useState } from 'react';
import { Carousel, Input, List, Card } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import cakraFIP from '../../../assets/geticket_images/event/cakra.png';
import gkmFMIPA from '../../../assets/geticket_images/event/gkm.png';
import socialHarmony from '../../../assets/geticket_images/event/social_harmony.png';

const { Search } = Input;

const formatTanggal = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('id-ID', { month: 'short' }).toUpperCase(); 
  const day = date.getDate().toString().padStart(2, '0'); 
  const year = date.getFullYear(); 

  return { month, day, year };
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Social Harmony',
      description: 'Social Harmony tahun ini menghadirkan Lomba Sihir dan banyak band lokal lainnya.',
      date: '2024-11-25',
      image: socialHarmony,
    },
    {
      id: 2,
      name: 'Gema Kreasi Matematika',
      description: 'GKM 2024 mengundang Fiersa Besari, The Rain dan band lokal lainnya',
      date: '2024-12-10',
      image: gkmFMIPA,
    },
    {
      id: 3,
      name: 'Cakra Festival',
      description: 'Cakra kembali hadir dengan mengundang For Revenge, Nostress dan masih banyak lainnya',
      date: '2025-12-25',
      image: cakraFIP,
    },
  ]);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Carousel Section */}
      <Carousel autoplay>
        {events.map((event) => (
          <div key={event.id}>
            <img src={event.image} alt={event.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
        ))}
      </Carousel>

      {/* Search Form Section */}
      <div style={{ margin: '20px 0' }}>
        <Search
          placeholder="Cari acara..."
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={(value) => setSearchTerm(value)}
        />
      </div>

      {/* Event List Section */}
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredEvents}
        renderItem={(event) => {
          const { month, day, year } = formatTanggal(event.date);

          return (
            <List.Item>
              <Card
                title={event.name}
                cover={<img alt={event.name} src={event.image} style={{ height: '500px', objectFit: 'cover' }} />}
              >
                <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%' }}>
                  <div style={{ textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                    <p style={{ margin: 0 }}>{month}</p>
                    <p style={{ margin: 0 }}>{day}</p>
                  </div>
                  <p style={{ flex: 1, marginLeft: '10px' }}>{event.description}</p>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Dashboard;