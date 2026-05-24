import React from 'react';

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';


// SIDEBAR LINK
const SidebarLink = ({
  to,
  icon: Icon,
  label,
}) => (

  <NavLink
    to={to}
    className={({ isActive }) =>
      `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
      ${
        isActive
          ? 'bg-primary-500 text-white shadow-lg'
          : 'text-secondary-300 hover:bg-white/5 hover:text-white'
      }
    `
    }
  >

    <Icon size={20} />

    <span>{label}</span>

  </NavLink>
);


// MAIN LAYOUT
export const DashboardLayout = ({
  children,
}) => {

  const { logout } = useAuth();

  return (

    <div className="min-h-screen bg-[#020617] flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f172a] border-r border-[#1e293b] p-6 hidden lg:flex flex-col">

        {/* LOGO */}
        <div className="mb-10">

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            TaskFlow
          </h1>

          <p className="text-slate-200/80 text-sm mt-2 font-medium tracking-wide">
            Welcome back to your workspace
          </p>

        </div>


        {/* NAVIGATION */}
        <nav className="space-y-3 flex-1">

          <SidebarLink
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
          />

          <SidebarLink
            to="/projects"
            icon={FolderKanban}
            label="Projects"
          />

          <SidebarLink
            to="/tasks"
            icon={CheckSquare}
            label="Tasks"
          />

        </nav>


        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >

          <LogOut size={20} />

          Logout

        </button>

      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">

        {/* TOP BAR */}
        <header className="h-16 border-b border-[#1e293b] bg-[#020617]/90 backdrop-blur-md flex items-center justify-between px-8">

          <div />

          {/* REMOVED ICONS */}
          <div className="text-sm text-secondary-400">
            Productivity Workspace
          </div>

        </header>


        {/* PAGE CONTENT */}
        <div className="p-8">

          {children}

        </div>

      </main>

    </div>
  );
};