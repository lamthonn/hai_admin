import {
    ChromeFilled,
    ControlOutlined,
    CrownFilled,
    DollarOutlined,
    PieChartOutlined,
    SmileFilled,
    StarOutlined,
    TabletFilled,
    UsergroupAddOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { routesConfig } from '../routes/routes';
  
  const defaultProps =  {
    route: {
      path: '/',
      routes: [
        {
            path: '/thong-ke',
            name: 'Thống kê',
            icon: <PieChartOutlined />,
            routes: [
              {
                path: '/dashboard',
                name: 'Dashboard',
              },
            ],
        },
        {
            path: '/quan-ly-khach-hang',
            name: 'Quản lý khách hàng',
            icon: <UsergroupAddOutlined />,
          },
          {
            path: '/quan-ly-danh-gia',
            name: 'Quản lý đánh giá',
            icon: <StarOutlined />,
          },
          {
            path: '/',
            name: 'Quản lý sản phẩm',
            icon: <CrownFilled />,
            routes: [
              {
                path: '/quan-ly-danh-muc',
                name: 'Quản lý danh mục',
              },
              {
                path: '/danh-sach-san-pham',
                name: 'Danh sách sản phẩm',
              },
            ],
          },
          {
            path: '/van-hanh',
            name: 'Vận hành',
            icon: <ControlOutlined />,
            routes: [
              {
                path: '/don-hang',
                name: 'Đơn hàng',
              },
            ],
          },
          {
            path: '/tai-chinh',
            name: 'Tài chính',
            icon: <DollarOutlined />,
            routes: [
              {
                path: '/doanh-thu',
                name: 'Doanh thu',
              },
              {
                path: '/so-du',
                name: 'Số dư',
              },
            ],
          },
          {
            path: '/cau-hinh',
            name: 'Cấu hình hệ thống',
            icon: <UserOutlined />,
          },
      ],
    },
    location: {
      pathname: '/',
    },
  };

  export default defaultProps;