import { useState } from "react";
import QrScanner from "react-qr-scanner";
import { Modal, message } from "antd";

const QRScanner = ({ isOpen, onClose, onScan }) => {
  const [error, setError] = useState("");

  const handleScan = (data) => {
    if (data) {
      message.success("QR Code Scanned Successfully!");
      onScan(data.text); // Kirim hasil scan ke parent component
      onClose(); // Tutup modal setelah berhasil scan
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Gagal membaca QR Code.");
  };

  return (
    <Modal
      title="Scan Tiket QR"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <QrScanner
        delay={300}
        style={{ width: "100%" }}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          facingMode: "environment", // Gunakan kamera belakang jika tersedia
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Modal>
  );
};

export default QRScanner;