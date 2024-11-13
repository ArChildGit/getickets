import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Card, List, Skeleton, Input, Divider, Drawer, Form, Button, notification, Popconfirm, message, FloatButton, Select } from "antd";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { sendDataUTS, getDataUTS, deleteDataUTS } from "../../../utils/apiuts";

export const TengahSemester = () => {
  const { Search } = Input;

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const genreOptions = [
    { label: 'Music', value: 'music' },
    { label: 'Song', value: 'song' },
    { label: 'Movie', value: 'movie' },
    { label: 'Education', value: 'education' },
    { label: 'Others', value: 'others' },
  ];

  useEffect(() => {
    fetchDataUTS();
  }, []);

  const filteredEvents = data.filter((event) =>
    event.play_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ALERT
  const showAlert = (status, title, description) => {
    notification[status]({
      message: title,
      description: description,
    });
  };

  // DRAWER RELATED
  const handleDrawer = () => {
    setIsDrawer(true);
  };

  const renderDrawer = () => {
    return (
      <Drawer
        title="Add/Edit Event"
        onClose={onCloseDrawer}
        open={isDrawer}
        extra={
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="play_name" label="Play Name">
            <Input />
          </Form.Item>
          <Form.Item name="play_url" label="YouTube URL">
            <Input />
          </Form.Item>
          <Form.Item name="play_thumbnail" label="Thumbnail URL">
            <Input />
          </Form.Item>
          <Form.Item name="play_genre" label="Genre">
            <Select options={genreOptions} placeholder="Select a genre" />
          </Form.Item>
          <Form.Item name="play_description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  const onCloseDrawer = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    setIsDrawer(false);
  };

  const confirmDelete = (record_id) => {
    const url = `/api/playlist/${record_id}`;
    deleteDataUTS(url)
      .then((resp) => {
        if (resp?.status >= 200 && resp?.status <= 299) {
          showAlert("success", "Data deleted", "Data berhasil terhapus");

          // Selalu refetch data ke /api/playlist/16 setelah delete
          fetchDataUTS(); // Refetch data dengan URL yang benar

          form.resetFields();
          onCloseDrawer();
        } else {
          console.log("Response diterima tapi gagal menghapus");
          showAlert("error", "Failed", "Data gagal terhapus");
        }
      })
      .catch((err) => {
        console.log("Response tidak keterima sama sekali");
        showAlert("error", "Failed", "Data gagal terhapus");
      });
  };

  // Fungsi fetchDataUTS tetap mengarah ke /api/playlist/16
  const fetchDataUTS = () => {
    setLoading(true);
    const url = "/api/playlist/16";  // Pastikan URL ini
    console.log("Fetching data from: ", url);  // Log URL
    getDataUTS(url)
      .then((resp) => {
        console.log("Fetched data: ", resp);  // Log data yang diterima
        if (resp) {
          setData(resp.datas);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);  // Log error
        setLoading(false);
      });
  };



  const handleDrawerEdit = (record) => {
    setIsDrawer(true);
    setIsEdit(true);
    setIdSelected(record?.id_play);
    form.setFieldsValue({
      play_name: record?.play_name,
      play_url: record?.play_url,
      play_thumbnail: record?.play_thumbnail,
      play_genre: record?.play_genre,
      play_description: record?.play_description
    });
  };

  const handleSubmit = () => {
    const playName = form.getFieldValue("play_name");
    const playUrl = form.getFieldValue("play_url");
    const playThumbnail = form.getFieldValue("play_thumbnail");
    const playGenre = form.getFieldValue("play_genre");
    const playDescription = form.getFieldValue("play_description");

    const url = isEdit ? `/api/playlist/update/${idSelected}` : "/api/playlist/16";

    let formData = new FormData();
    formData.append("play_name", playName);
    formData.append("play_url", playUrl);
    formData.append("play_thumbnail", playThumbnail);
    formData.append("play_genre", playGenre);
    formData.append("play_description", playDescription);

    sendDataUTS(url, formData)
      .then((resp) => {
        if (resp?.datas) {
          showAlert("success", "Data Saved", "Success to send data");
          fetchDataUTS();
          onCloseDrawer();
        } else {
          showAlert("error", "Failed", "Send data failed");
        }
      })
      .catch(() => {
        showAlert("error", "Failed", "Something went wrong");
      });
  }

  return (
    <div style={{ padding: '20px' }}>
      <FloatButton
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={handleDrawer}
        tooltip="Add Event"
      />
      {renderDrawer()}

      {/* Search Form Section */}
      <div style={{ margin: '20px 0' }}>
        <Search
          placeholder="Search events..."
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={(value) => setSearchTerm(value)}
        />
      </div>

      {/* Event List Section */}
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredEvents}
        loading={isLoading}
        renderItem={(event) => (
          <List.Item>
            <Card
              title={event.play_name}
              cover={
                <img
                  alt={event.play_name}
                  src={event.play_thumbnail}
                  style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => window.open(event.play_url, '_blank')}
                />
              }
              actions={[
                <EditOutlined key={event?.id_play} onClick={() => handleDrawerEdit(event)} />,
                <Popconfirm
                  key={event?.id_play}
                  title={`Delete the item`}
                  description={`Are you sure you want to delete ${event?.play_name}?`}
                  onConfirm={() => confirmDelete(event?.id_play)} // Use id_play here
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key={event?.id_play} />
                </Popconfirm>,
              ]}
            >
              <p><strong>Genre:</strong> {event?.play_genre}</p>
              <p>{event?.play_description}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
