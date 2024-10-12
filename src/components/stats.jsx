import React, { useEffect, useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { MdEventAvailable, MdOutlineGroup } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { FaRankingStar } from "react-icons/fa6";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { configs } from "../config";

// Component to display each statistics card
const StatisticsCard = ({ title, value, icon, color }) => (
  <div className={`flex items-center p-6 shadow-lg rounded-lg bg-white border-l-4 ${color}`}>
    <div className="mr-4 text-4xl text-gray-600">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${configs.baseUrl}/dashboard/stats`);
        const data = await response.json();

        if (data.ok) {
          setStats(data.payLoad);
        } else {
          setError("Failed to load statistics.");
        }
      } catch (err) {
        setError("An error occurred while fetching statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const popularFieldsString = stats.popularFields
    .map((field) => `${field._id} (${field.count})`)
    .join(", ");

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Alumni System Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Members"
          value={stats.totalMembers}
          icon={<IoPeopleSharp />}
          color="border-blue-500"
        />
         <StatisticsCard
          title="Verified Members"
          value={stats.activeMembers}
          icon={<MdOutlineGroup />}
          color="border-red-500"
        />
        <StatisticsCard
          title="Total Chapters"
          value={stats.totalChapters}
          icon={<GoOrganization />}
          color="border-green-500"
        />
        <StatisticsCard
          title="Total Events"
          value={stats.totalEvents}
          icon={<MdEventAvailable />}
          color="border-yellow-500"
        />
       
        <StatisticsCard
          title="Popular Fields"
          value={popularFieldsString}
          icon={<FaRankingStar />}
          color="border-indigo-500"
        />
        <StatisticsCard
          title="Alumni Excos"
          value={stats.alumniInLeadership}
          icon={<MdOutlineStarBorderPurple500 />}
          color="border-pink-500"
        />
      </div>
    </div>
  );
};

export default Statistics;
