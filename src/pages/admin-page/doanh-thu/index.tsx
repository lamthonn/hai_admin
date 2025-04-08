import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Tabs, message, Typography } from 'antd';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import dayjs, { Dayjs } from 'dayjs';
import DatePickerCustomOld from '../../../components/datepicker/DatePickerCustomOld';
import MainLayout from '../../../layout/MainLayout';
import { GetRevenueStats } from '../../../services/DoanhThuServices';
import { RangePickerProps } from 'antd/es/date-picker';

const { Title: AntTitle } = Typography;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RevenueStats {
    totalRevenue: number;
    revenueByDate: { date: string; revenue: number }[];
    revenueByMonth: { month: string; revenue: number }[];
    revenueByOrder: { orderId: string; revenue: number }[];
    revenueByProduct: { productId: string; productName: string; revenue: number }[];
    revenueByBank: { nganHangId: string; tenNganHang: string; revenue: number; isDefault: boolean }[];
}

const RevenueStats: React.FC = () => {
    const [stats, setStats] = useState<RevenueStats | null>(null);
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().startOf('month'),
        dayjs()
    ]);

    const fetchRevenueStats = async (startDate: string, endDate: string) => {
        try {
            const response = await GetRevenueStats(startDate, endDate);
            setStats(response.data);
        } catch (error) {
            message.error('Lấy thống kê doanh thu thất bại.');
            console.error(error);
        }
    };

    useEffect(() => {
        if (dateRange && dateRange[0] && dateRange[1]) {
            fetchRevenueStats(
                dateRange[0].format('YYYY-MM-DD'),
                dateRange[1].format('YYYY-MM-DD')
            );
        }
    }, [dateRange]);

    const lineChartDataByDate = {
        labels: stats?.revenueByDate.map(item => dayjs(item.date).format('DD/MM')) || [],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: stats?.revenueByDate.map(item => item.revenue) || [],
                borderColor: '#1890ff',
                backgroundColor: 'rgba(24, 144, 255, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const lineChartDataByMonth = {
        labels: stats?.revenueByMonth.map(item => item.month) || [],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: stats?.revenueByMonth.map(item => item.revenue) || [],
                borderColor: '#13c2c2',
                backgroundColor: 'rgba(19, 194, 194, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const barChartDataByOrder = {
        labels: stats?.revenueByOrder.map(item => item.orderId) || [],
        datasets: [
            {
                label: 'Doanh thu theo đơn hàng (VND)',
                data: stats?.revenueByOrder.map(item => item.revenue) || [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const pieChartDataByProduct = {
        labels: stats?.revenueByProduct.map(item => item.productName) || [],
        datasets: [
            {
                label: 'Doanh thu theo sản phẩm',
                data: stats?.revenueByProduct.map(item => item.revenue) || [],
                backgroundColor: [
                    '#1890ff',
                    '#52c41a',
                    '#faad14',
                    '#eb2f96',
                    '#722ed1'
                ],
                borderWidth: 1
            }
        ]
    };

    const onDateRangeChange: RangePickerProps["onChange"] = (dates) => {
        if (dates && dates.length === 2) {
            setDateRange(dates as [Dayjs, Dayjs]);
        } else {
            setDateRange([dayjs().startOf("month"), dayjs()]);
        }
    };

    return (
        <MainLayout label="Doanh thu">
            <div style={{ padding: 24 }}>
                <AntTitle level={3}>Báo cáo thống kê doanh thu</AntTitle>
                <Row gutter={[16, 24]} align="middle">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DatePickerCustomOld
                            mode="range"
                            value={dateRange}
                            format="DD/MM/YYYY"
                            style={{ width: '100%' }}
                            onChange={onDateRangeChange}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={16} lg={18}>
                        <Card style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Tổng doanh thu"
                                value={stats?.totalRevenue || 0}
                                precision={0}
                                suffix="VND"
                                valueStyle={{ color: '#3f8600', fontSize: 24 }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
                    <Tabs.TabPane tab="Theo ngày" key="1">
                        <Card title="Biểu đồ doanh thu theo ngày">
                            <Line data={lineChartDataByDate} options={{ responsive: true }} />
                        </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Theo tháng" key="2">
                        <Card title="Biểu đồ doanh thu theo tháng">
                            <Line data={lineChartDataByMonth} options={{ responsive: true }} />
                        </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Theo đơn hàng" key="3">
                        <Card title="Biểu đồ doanh thu theo đơn hàng">
                            <Bar data={barChartDataByOrder} options={{ responsive: true }} />
                        </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Theo sản phẩm" key="4">
                        <Card title="Biểu đồ doanh thu theo sản phẩm">
                            <Pie data={pieChartDataByProduct} options={{ responsive: true }} />
                        </Card>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </MainLayout>
    );
};

export default RevenueStats;
