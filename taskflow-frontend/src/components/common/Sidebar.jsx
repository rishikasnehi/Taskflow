import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  ];

  const handleLogout = () => {
    logout();
  };

  const NavItem = ({ icon: Icon, label, path }) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${
          isActive
            ? 'bg-primary-500 text-white shadow-md'
            : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800'
        }
      `
      }
      onClick={onClose}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full w-64 bg-white dark:bg-secondary-900
          border-r border-secondary-200 dark:border-secondary-800
          transform transition-transform duration-300 z-50
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-secondary-200 dark:border-secondary-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary-600">TaskFlow</h1>
            <button
              onClick={onClose}
              className="lg:hidden btn-icon"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Manage your tasks efficiently
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Divider */}
        <div className="px-4 py-2">
          <div className="divider" />
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-secondary-200 dark:border-secondary-800">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-secondary-900 dark:text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-secondary-600 dark:text-secondary-400 truncate">
                {user?.email}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {isProfileOpen && (
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="mt-2 w-full flex items-center gap-3 px-4 py-3 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
