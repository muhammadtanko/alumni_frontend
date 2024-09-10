import React from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { MdEventAvailable, MdOutlineGroup } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { LiaDonateSolid } from "react-icons/lia";
import { FaRankingStar } from "react-icons/fa6";
import { MdOutlineEventNote } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";



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
  // Dummy data for illustration purposes
  const data = {
    totalMembers: 5000,
    totalChapters: 6,
    totalEvents: 20,
    activeMembers: 3550,
    totalDonations: "₦2,500,000",
    popularFields: "Engineering, Business, Law",
    alumniInLeadership: 34,
    upcomingEvents: 5,
    totalFeesCollected: "₦50,000",
    membersPaid: 900,
    membersOverdue: 150,
    paymentComplianceRate: "85%",
    averagePaymentDate: "March 15th",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Alumni System Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Members"
          value={data.totalMembers}
          icon={<IoPeopleSharp />}
          color="border-blue-500"
        />
        <StatisticsCard
          title="Total Chapters"
          value={data.totalChapters}
          icon={<GoOrganization />}
          color="border-green-500"
        />
        <StatisticsCard
          title="Total Events"
          value={data.totalEvents}
          icon={<MdOutlineEventNote />}
          color="border-yellow-500"
        />
        <StatisticsCard
          title="Verified Members"
          value={data.activeMembers}
          icon={<MdOutlineGroup />}
          color="border-red-500"
        />
         <StatisticsCard
          title="Total Donations"
          value={data.totalDonations}
          icon={<LiaDonateSolid />}
          color="border-teal-500"
        />
        <StatisticsCard
          title="Popular Fields"
          value={data.popularFields}
          icon={<FaRankingStar />}
          color="border-indigo-500"
        />
        <StatisticsCard
          title="Alumni in Leadership Roles"
          value={data.alumniInLeadership}
          icon={<MdOutlineStarBorderPurple500 />}
          color="border-pink-500"
        />
        <StatisticsCard
          title="Upcoming Events"
          value={data.upcomingEvents}
          icon={<MdEventAvailable />}
          color="border-orange-500"
        />
         <StatisticsCard
          title="Total Fees Collected"
          value={data.totalFeesCollected}
          icon={<TbCurrencyNaira />}
          color="border-cyan-500"
        />
        <StatisticsCard
          title="Members Paid"
          value={data.membersPaid}
          icon={<GiTakeMyMoney />}
          color="border-green-400"
        />
        <StatisticsCard
          title="Members Overdue"
          value={data.membersOverdue}
          icon={<GiTakeMyMoney />}
          color="border-red-400"
        />
        <StatisticsCard
          title="Payment Compliance Rate"
          value={data.paymentComplianceRate}
          icon={<TbCurrencyNaira />}
          color="border-yellow-400"
        />
        <StatisticsCard
          title="Average Payment Date"
          value={data.averagePaymentDate}
          icon={<TbCurrencyNaira />}
          color="border-purple-400"
        />
      </div>
    </div>
  );
};

export default Statistics;
