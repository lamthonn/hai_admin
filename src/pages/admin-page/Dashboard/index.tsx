import { Card, Col, Row, Statistic } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import DatePickerCustomOld from "../../../components/datepicker/DatePickerCustomOld";
import { RangePickerProps } from "antd/es/date-picker";
import MainLayout from "../../../layout/MainLayout";
import { GetDashboardStats } from "../../../services/DoanhThuServices";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../../routes/routes";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf("month"),
    dayjs(),
  ]);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    refundRate: 0,
  });

  const onDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    if (dates) {
      setDateRange(dates as [Dayjs, Dayjs]);
      fetchStatistics(dates as [Dayjs, Dayjs]);
    }
  };

  const fetchStatistics = async (dates: [Dayjs, Dayjs]) => {
    try {
      const response = await GetDashboardStats(
        dates[0].format("YYYY-MM-DD"),
        dates[1].format("YYYY-MM-DD")
      );
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics(dateRange);
  }, []);

  const cardBaseStyle: React.CSSProperties = {
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "24px",
    height: "100%",
    transition: "all 0.3s",
    cursor: "pointer",
  };

  return (
    <MainLayout label="Dashboard">
      <h2 style={{ marginBottom: 16 }}>📊 Tổng quan hoạt động</h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <DatePickerCustomOld
            mode="range"
            value={dateRange}
            onChange={onDateRangeChange}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Thẻ lớn doanh thu bên trái */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              ...cardBaseStyle,
              background: "linear-gradient(to right, #f0f5ff, #d6e4ff)",
            }}
          >
            <Statistic
              title="Tổng doanh thu"
              value={stats.totalRevenue}
              precision={0}
              suffix="VNĐ"
              prefix="₫"
              valueStyle={{ fontSize: 32, color: "#3f8600" }}
            />
          </Card>
        </Col>

        {/* Grid 2x2 bên phải */}
        <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                style={cardBaseStyle}
                onClick={() => navigate(routesConfig.quanLyDonHang)}
              >
                <Statistic
                  title="Đơn hàng"
                  value={stats.totalOrders}
                  prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={cardBaseStyle}
                onClick={() => navigate(routesConfig.quanLyKhachHang)}
              >
                <Statistic
                  title="Khách hàng"
                  value={stats.totalCustomers}
                  prefix={<UserOutlined style={{ color: "#722ed1" }} />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={cardBaseStyle}
                onClick={() => navigate(routesConfig.quanLySanPham)}
              >
                <Statistic
                  title="Sản phẩm"
                  value={stats.totalProducts}
                  prefix={<ShopOutlined style={{ color: "#fa8c16" }} />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card style={cardBaseStyle}>
                <Statistic
                  title="Hoàn / Hủy đơn"
                  value={stats.refundRate}
                  precision={1}
                  suffix="%"
                  prefix={<UndoOutlined style={{ color: "#cf1322" }} />}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Dashboard;
