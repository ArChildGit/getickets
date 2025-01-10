import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChartData from "./EChartData";

function EChart() {
  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "1,2K",
      user: "Bookings",
    },
    {
      Title: "6.5m",
      user: "Clicks",
    },
    {
      Title: "IDR 15.4M",
      user: "Revenue",
    },
    {
      Title: "120",
      user: "Tours",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChartData.options}
          series={eChartData.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-visitor">
        <Title level={5}>Dolphin-Watching Bookings</Title>
        <Paragraph className="lastweek">
          Growth compared to last week <span className="bnb2">+15%</span>
        </Paragraph>
      </div>
      <div className="chart-details">
        <Row gutter={[16, 16]}>
          {items.map((item, index) => (
            <Col key={index} span={6}>
              <div className="stat-item">
                <Title level={4}>{item.Title}</Title>
                <Paragraph>{item.user}</Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
