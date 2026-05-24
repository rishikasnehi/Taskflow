import React, {
  useEffect,
  useState,
} from 'react';

import {
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
} from 'lucide-react';

import { DashboardLayout } from '../layouts/DashboardLayout';

import {
  Card,
  Badge,
  Spinner,
} from '../components/ui';

import dashboardService from '../services/dashboardService';


// STAT CARD
const StatCard = ({
  icon: Icon,
  label,
  value,
}) => (

  <Card className="hover:shadow-lg">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-secondary-600 dark:text-secondary-400 text-sm font-medium mb-1">
          {label}
        </p>

        <h3 className="text-3xl font-bold text-secondary-900 dark:text-white">
          {value}
        </h3>

      </div>

      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">

        <Icon
          className="text-primary-600 dark:text-primary-400"
          size={24}
        />

      </div>

    </div>

  </Card>
);


// RECENT TASK ITEM
const RecentTaskItem = ({
  task,
}) => (

  <div className="flex items-center gap-4 p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors">

    <div className="w-2 h-2 rounded-full bg-primary-500" />

    <div className="flex-1 min-w-0">

      <p className="font-medium text-secondary-900 dark:text-white truncate">
        {task.title}
      </p>

      <p className="text-sm text-secondary-600 dark:text-secondary-400 truncate">
        {task.project?.title}
      </p>

    </div>

    <Badge
      variant={
        task.priority === 'high'
          ? 'error'
          : task.priority === 'medium'
          ? 'warning'
          : 'info'
      }
    >
      {task.priority}
    </Badge>

  </div>
);


// MAIN COMPONENT
export const Dashboard = () => {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  useEffect(() => {

    fetchStats();

  }, []);


  const fetchStats = async () => {

    try {

      setLoading(true);

      const response =
        await dashboardService.getStats();

      setStats({
        ...response.data.stats,
        recentTasks:
          response.data.recentTasks || [],
      });

    } catch (err) {

      setError(err.message);

      console.error(err);

    } finally {

      setLoading(false);

    }
  };


  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-96">

          <Spinner
            size="lg"
            className="text-primary-500"
          />

        </div>

      </DashboardLayout>
    );
  }


  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Welcome back 👋
        </h1>

        <p className="text-secondary-600 dark:text-secondary-400">
          Here's your productivity overview.
        </p>

      </div>


      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <StatCard
          icon={CheckCircle}
          label="Completed Tasks"
          value={stats?.completedTasks || 0}
        />

        <StatCard
          icon={Clock}
          label="Pending Tasks"
          value={stats?.pendingTasks || 0}
        />

        <StatCard
          icon={AlertCircle}
          label="High Priority"
          value={
            stats?.highPriorityTasks || 0
          }
        />

        <StatCard
          icon={BarChart3}
          label="Projects"
          value={stats?.totalProjects || 0}
        />

      </div>


      {/* RECENT TASKS */}
      <Card>

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-lg font-bold text-secondary-900 dark:text-white flex items-center gap-2">

            <Calendar
              size={20}
              className="text-primary-600"
            />

            Recent Tasks

          </h2>

        </div>

        <div className="space-y-2">

          {stats?.recentTasks?.length === 0 ? (

            <p className="text-secondary-500 text-sm">
              No recent tasks
            </p>

          ) : (

            stats?.recentTasks?.map(
              (task) => (

                <RecentTaskItem
                  key={task._id}
                  task={task}
                />

              )
            )

          )}

        </div>

      </Card>


      {/* PRODUCTIVITY */}
      <Card className="mt-6">

        <h2 className="text-lg font-bold text-secondary-900 dark:text-white mb-6 flex items-center gap-2">

          <TrendingUp
            size={20}
            className="text-primary-600"
          />

          Productivity Trend

        </h2>

        <div className="h-64 flex items-end justify-around gap-2">

          {[45, 52, 48, 65, 72, 58, 76].map(
            (height, index) => (

              <div
                key={index}
                className="flex-1 flex flex-col items-center"
              >

                <div
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg"
                  style={{
                    height: `${
                      (height / 100) * 200
                    }px`,
                  }}
                />

                <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-2">

                  {
                    [
                      'Mon',
                      'Tue',
                      'Wed',
                      'Thu',
                      'Fri',
                      'Sat',
                      'Sun',
                    ][index]
                  }

                </p>

              </div>

            )
          )}

        </div>

      </Card>

    </DashboardLayout>
  );
};