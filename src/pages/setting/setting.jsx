import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const Setting = () => {
  const tabs = [
    { icon: PersonOutlineOutlinedIcon, label: 'Personal Info', path: 'userinfo' },
    { icon: AdminPanelSettingsOutlinedIcon, label: 'Institute Info', path: 'institute' },
    { icon: NotificationsOutlinedIcon, label: 'Notifications', path: 'notifications' },
    { icon: HttpsOutlinedIcon, label: 'Password', path: 'password' },
    { icon: PaymentsOutlinedIcon, label: 'Subscription', path: 'subscription' },
    { icon: CreditCardOutlinedIcon, label: 'Payment Methods', path: 'payment-methods' },
  ];

  return (
    <div className="flex gap-6 p-6">
      {/* Sidebar */}
      <div className="w-72 bg-white rounded-xl p-4">
        <h3 className="text-xl font-semibold mb-4">Settings</h3>

        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <NavLink
              to={tab.path}
              key={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 mb-2 rounded-lg cursor-pointer transition-colors 
                ${isActive ? 'bg-[#C24C99] text-white' : 'hover:bg-neutral-100'}`
              }
            >
              <Icon />
              <span className="text-sm">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-xl p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
