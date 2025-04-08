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
      <h2 style={{ marginBottom: 24, fontSize: 24 }}>
        📊 Tổng quan hoạt động
      </h2>
  
      {/* Mô tả ngắn */}
      <p style={{ marginBottom: 16, fontSize: 16, color: "#555" }}>
        Dưới đây là tổng quan các chỉ số kinh doanh chính trên hệ thống bán giày. 
        Cập nhật theo thời gian thực từ dữ liệu bán hàng, khách hàng và sản phẩm.
      </p>
  
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
        {/* Tổng doanh thu */}
        <Col xs={24} lg={12}>
          <Card
            hoverable
            style={{
              ...cardBaseStyle,
              background: "linear-gradient(135deg, #e6f7ff, #bae7ff)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: 12,
            }}
          >
            <Statistic
              title={<span style={{ fontSize: 16 }}>💰 Tổng doanh thu</span>}
              value={stats.totalRevenue}
              precision={0}
              suffix="VNĐ"
              prefix="₫"
              valueStyle={{ fontSize: 36, color: "#237804", fontWeight: 600 }}
            />
            <p style={{ marginTop: 8, color: "#888" }}>
              Doanh thu trong khoảng thời gian được chọn
            </p>
          </Card>
        </Col>
  
        {/* Grid 2x2 bên phải */}
        <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                hoverable
                style={{ ...cardBaseStyle, borderRadius: 12 }}
                onClick={() => navigate(routesConfig.quanLyDonHang)}
              >
                <Statistic
                  title="🛒 Đơn hàng"
                  value={stats.totalOrders}
                  prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
                />
                <div style={{ fontSize: 12, color: "#999" }}>
                  Tổng số đơn đã xử lý
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                style={{ ...cardBaseStyle, borderRadius: 12 }}
                onClick={() => navigate(routesConfig.quanLyKhachHang)}
              >
                <Statistic
                  title="👤 Khách hàng"
                  value={stats.totalCustomers}
                  prefix={<UserOutlined style={{ color: "#722ed1" }} />}
                />
                <div style={{ fontSize: 12, color: "#999" }}>
                  Khách hàng đã đăng ký
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                style={{ ...cardBaseStyle, borderRadius: 12 }}
                onClick={() => navigate(routesConfig.quanLySanPham)}
              >
                <Statistic
                  title="👟 Sản phẩm"
                  value={stats.totalProducts}
                  prefix={<ShopOutlined style={{ color: "#fa8c16" }} />}
                />
                <div style={{ fontSize: 12, color: "#999" }}>
                  Tổng sản phẩm đang bán
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                style={{ ...cardBaseStyle, borderRadius: 12 }}
              >
                <Statistic
                  title="↩️ Hoàn / Hủy đơn"
                  value={stats.refundRate}
                  precision={1}
                  suffix="%"
                  prefix={<UndoOutlined style={{ color: "#cf1322" }} />}
                />
                <div style={{ fontSize: 12, color: "#999" }}>
                  Tỉ lệ hoàn/hủy trên tổng đơn
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
  
      {/* Block text mô tả thêm */}
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Card
            style={{
              background: "#fafafa",
              borderLeft: "4px solid #1890ff",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h3 style={{ marginBottom: 8 }}>📌 Ghi chú</h3>
            <ul style={{ paddingLeft: 16, color: "#555" }}>
              <li>Số liệu được cập nhật theo thời gian thực.</li>
              <li>Bạn có thể lọc khoảng thời gian để xem báo cáo cụ thể.</li>
              <li>Nhấn vào từng thẻ để chuyển đến trang quản lý tương ứng.</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
  
  
};

export default Dashboard;
