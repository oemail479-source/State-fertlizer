import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, ShoppingCart, Calendar, FileText, Users, 
  TrendingUp, AlertCircle, CheckCircle2, Clock, ArrowUpRight, Activity 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { db } from '../../services/db';
import { useAuth } from '../../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const orders = db.getOrders();
  const bookings = db.getBookings();
  const inquiries = db.getInquiries();
  const tenders = db.getTenders();
  const auditLogs = db.getAuditLogs().slice(0, 6);
  const erpLogs = db.getERPSyncLogs();

  const totalSalesRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Successful' ? o.totalAmount : 0), 0);
  const totalBungalowRevenue = bookings.reduce((sum, b) => sum + (b.status === 'Approved' || b.status === 'Payment Successful' ? b.totalFee : 0), 0);
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending Internal Approval').length;
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'New' || i.status === 'Assigned').length;

  // Chart Sample Data
  const salesTrendData = [
    { month: 'Mar', sales: 420000, bookings: 45000, tenderDocs: 12000 },
    { month: 'Apr', sales: 580000, bookings: 62000, tenderDocs: 18000 },
    { month: 'May', sales: 710000, bookings: 58000, tenderDocs: 25000 },
    { month: 'Jun', sales: 890000, bookings: 78000, tenderDocs: 32000 },
    { month: 'Jul', sales: 940000, bookings: 85000, tenderDocs: 28000 },
    { month: 'Aug', sales: 1250000, bookings: 110000, tenderDocs: 45000 }
  ];

  const paymentStatusData = [
    { name: 'Successful', value: 85, color: '#16A34A' },
    { name: 'Pending IPG', value: 10, color: '#D97706' },
    { name: 'Failed / Cancelled', value: 5, color: '#DC2626' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Executive Welcome & Role Header */}
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-8 rounded-2xl shadow-lg border border-gov-gold/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-gov-gold text-gov-navy font-extrabold text-xs rounded-full uppercase tracking-wider">
            Enterprise Management Dashboard
          </span>
          <h2 className="text-3xl font-extrabold mt-2">Executive Overview</h2>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as <strong className="text-white font-bold">{user?.name}</strong> ({user?.role}). Real-time analytics, order processing, and audit logs.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link to="/admin/integrations" className="px-4 py-2.5 bg-gov-green hover:bg-gov-greenDark text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5">
            <Activity className="w-4 h-4 text-gov-gold" />
            <span>ERP Sync Monitor</span>
          </Link>
        </div>
      </div>

      {/* Top 6 Executive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Total E-Sales</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xl font-extrabold font-mono text-slate-900">
            LKR {totalSalesRevenue.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center">
            <ArrowUpRight className="w-3 h-3" /> +18.4% this month
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Total Orders</span>
            <ShoppingCart className="w-5 h-5 text-gov-navy" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-slate-900">{orders.length}</p>
          <span className="text-[10px] text-slate-500">Small to bulk orders</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Bungalow Revenue</span>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xl font-extrabold font-mono text-slate-900">
            LKR {totalBungalowRevenue.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-500">Polonnaruwa & Nuwara Eliya</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Pending Approval</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-amber-600">{pendingBookingsCount}</p>
          <span className="text-[10px] text-amber-700 font-bold">Internal Bungalow requests</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Open Inquiries</span>
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-rose-600">{pendingInquiriesCount}</p>
          <span className="text-[10px] text-slate-500">Requires officer response</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Active Tenders</span>
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold font-mono text-slate-900">{tenders.length}</p>
          <span className="text-[10px] text-purple-600 font-bold">Paid downloads active</span>
        </div>
      </div>

      {/* Actionable Pending Alerts Widget (Required by RFP) */}
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-3">
        <h3 className="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Pending Administrative Action Items</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <Link to="/admin/bookings" className="p-3 bg-white rounded-xl border border-amber-200 hover:shadow-sm transition flex justify-between items-center">
            <div>
              <strong className="text-slate-900 block">{pendingBookingsCount} Internal Booking Requests</strong>
              <span className="text-[11px] text-slate-500">Requires officer approval clearance</span>
            </div>
            <span className="text-amber-700 font-bold">Review →</span>
          </Link>
          <Link to="/admin/inquiries" className="p-3 bg-white rounded-xl border border-amber-200 hover:shadow-sm transition flex justify-between items-center">
            <div>
              <strong className="text-slate-900 block">{pendingInquiriesCount} Helpdesk Inquiries</strong>
              <span className="text-[11px] text-slate-500">Awaiting officer assignment</span>
            </div>
            <span className="text-amber-700 font-bold">Assign →</span>
          </Link>
          <Link to="/admin/integrations" className="p-3 bg-white rounded-xl border border-amber-200 hover:shadow-sm transition flex justify-between items-center">
            <div>
              <strong className="text-slate-900 block">ERP Payment Sync Queue</strong>
              <span className="text-[11px] text-slate-500">Trigger manual ERP synchronization</span>
            </div>
            <span className="text-amber-700 font-bold">Sync Now →</span>
          </Link>
        </div>
      </div>

      {/* Charts Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Revenue & Sales Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">Monthly Revenue Growth (LKR)</h3>
              <p className="text-xs text-slate-500">Comparative revenue from fertilizer sales & bungalow bookings</p>
            </div>
            <span className="text-xs font-bold text-gov-green bg-emerald-50 px-2.5 py-1 rounded-full">
              Maha Season Surge
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" name="Fertilizer Sales" stroke="#16A34A" fill="#16A34A" fillOpacity={0.2} />
                <Area type="monotone" dataKey="bookings" name="Bungalow Bookings" stroke="#0F2C59" fill="#0F2C59" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IPG Payment Transaction Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 border-b pb-3">IPG Payment Status Distribution</h3>
            <div className="h-56 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2 text-xs border-t pt-3">
            {paymentStatusData.map(item => (
              <div key={item.name} className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-700 font-semibold">{item.name}</span>
                </span>
                <span className="font-bold font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Activity Stream Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-base text-slate-900">Recent Security & Audit Trail Activity</h3>
          <Link to="/admin/reports" className="text-xs font-bold text-gov-green hover:underline">View Full Audit Log</Link>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 font-bold text-slate-700 uppercase border-b">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User & Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Module</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="p-3 font-bold text-slate-900">{log.user} ({log.role})</td>
                  <td className="p-3 font-semibold text-gov-navy">{log.action}</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold">{log.module}</span></td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
