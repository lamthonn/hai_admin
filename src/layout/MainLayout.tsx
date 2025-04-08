import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { ProConfigProvider } from '@ant-design/pro-provider';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import defaultProps from './defaultProps';
import { menuItem } from '../config';
import { useLocation, useNavigate } from 'react-router-dom';
import { routesConfig } from '../routes/routes';
import { jwtDecode, JwtPayload } from 'jwt-decode';
interface CustomJwtPayload extends JwtPayload {
  ten?: string; // hoặc number nếu `dvvc_id` là số
}
const MainLayout:React.FC<{
  label?: string;
  children?: React.ReactNode;
}> = ({
  label,
  children
}) => {
  const [pathname, setPathname] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin route hiện tại
  const authValue = localStorage.getItem("auth");
  const [auth, setAuth] = useState<CustomJwtPayload>();
  useEffect(()=> {
    if (authValue) {
          const decoded = jwtDecode(authValue);
          setAuth(decoded);
        }
  },[])

  return (
    <ProConfigProvider>
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        items={menuItem}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: "Administrator",
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            props.layout !== 'side' ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginInlineEnd: 24,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
              </div>
            ) : undefined,
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GithubFilled key="GithubFilled" />,
          ];
        }}
        logo={<><img src="/images/shop_logo_image.webp" /></>}
        title={label}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || 'dashboard');
              if(item.path === '/dashboard'){
                navigate(routesConfig.dashboard);
              }
              if(item.path === "/quan-ly-danh-muc") {
                navigate(routesConfig.quanLyDanhMuc);
              }
              if(item.path === "/danh-sach-san-pham") {
                navigate(routesConfig.quanLySanPham);
              }
              if(item.path === "/nhap-kho") {
                navigate(routesConfig.nhapKho);
              }
              if(item.path === "/don-hang") {
                navigate(routesConfig.quanLyDonHang);
              }
              if(item.path === "/ma-giam-gia") {
                navigate(routesConfig.quanLyMaGiamGia);
              }
              if(item.path === "/chuong-trinh-marketing") {
                navigate(routesConfig.chuongTrinhMarketing);
              }
              if(item.path === "/quang-cao") {
                navigate(routesConfig.quangCao);
              }
              if(item.path === "/don-vi-van-chuyen") {
                navigate(routesConfig.donViVanChuyen);
              }
              if(item.path === "/doanh-thu") {
                navigate(routesConfig.doanhThu);
              }
              if(item.path === "/so-du") {
                navigate(routesConfig.SoDu);
              }
              if(item.path === "/tai-khoan-ngan-hang") {
                navigate(routesConfig.taiKhoanNganHang);
              }
              if(item.path === "/cau-hinh-he-thong") {
                navigate(routesConfig.cauHinhHeThong);
              }
              if(item.path === "/cau-hinh") {
                navigate(routesConfig.cauHinh);
              }
              if(item.path === "/quan-ly-khach-hang") {
                navigate(routesConfig.quanLyKhachHang);
              }
              if(item.path === "/quan-ly-danh-gia") {
                navigate(routesConfig.quanLyDanhGia);
              }
          
            }}
          >
            {dom}
          </a>
        )}

        // menuFooterRender={(props) => {
        //   return <div style={{ display: 'flex', gap:8 }}>
        //     <Button type="primary" style={{ width: '100%' }} onClick={() => {
        //       navigate("/seller-center/login");}}>
        //     Đăng nhập
        //   </Button>
        //   </div>
        // }}
      >
        <PageContainer
          footer={[
            <div key="3"> Shoes seller center ©{new Date().getFullYear()} Created by Đinh Hải</div>,
            // <Button key="2" type="primary">
            //   提交
            // </Button>,
          ]}
        >
          <ProCard
            style={{
              height: '100vh',
              minHeight: 800,
            }}
          >
            {children}
          </ProCard>
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  );
};

export default MainLayout;