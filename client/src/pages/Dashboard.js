import React, { useEffect, useState } from 'react';
import { 
  ClipboardList, AlertCircle, CheckCircle2, Package, Activity, FileDown, Search, MessageSquare, Trash2 
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PageTransition from '../components/PageTransition';
import { inquiryService } from '../services/api';
import { INQUIRY_STATUS } from '../config/constants';

const Dashboard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        try {
            // Using centralized API service
            const response = await inquiryService.getAllInquiries();
            setInquiries(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    // Search logic
    const filteredInquiries = inquiries.filter(iq => 
        iq.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iq.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // PDF Generation logic
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(15, 23, 42);
        doc.text('SRI MAYUR COLORS', 14, 20);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        const tableColumn = ['Company', 'Material', 'Qty (kg)', 'AI Category', 'Sentiment', 'Status'];
        const tableRows = inquiries.map(iq => [
            iq.companyName,
            iq.fabricType,
            iq.quantity,
            iq.aiAnalysis?.category || 'Standard',
            iq.aiAnalysis?.sentiment || 'Neutral',
            iq.status
        ]);

        autoTable(doc, {
            startY: 40,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42] }
        });

        doc.save('SriMayur_Inquiry_Report.pdf');
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await inquiryService.updateInquiryStatus(id, { status: newStatus });
            fetchInquiries();
        } catch (err) { 
            console.error('Update error:', err); 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Permanently delete this inquiry?')) {
            try {
                await inquiryService.deleteInquiry(id);
                fetchInquiries();
            } catch (err) { 
                console.error('Delete error:', err); 
            }
        }
    };

    if (loading) return (
        <PageTransition>
            <div className="pt-40 text-center animate-pulse font-bold text-slate-500">
                Establishing Secure Connection to MongoDB...
            </div>
        </PageTransition>
    );

    return (
        <PageTransition>
            <div className="pt-28 pb-12 px-6 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-lg text-white">
                                <ClipboardList size={28} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manager Dashboard</h2>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search Company or Country..." 
                                    className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 text-sm"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={downloadPDF}
                                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                            >
                                <FileDown size={18} /> Export PDF
                            </button>
                        </div>
                    </div>

                    {/* Summary Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <StatCard icon={<Package className="text-blue-600"/>} label="Total Orders" value={inquiries.length} color="bg-blue-50" />
                        <StatCard icon={<AlertCircle className="text-red-600"/>} label="High Priority" value={inquiries.filter(iq => iq.aiAnalysis?.priority === 'High').length} color="bg-red-50" />
                        <StatCard icon={<Activity className="text-orange-600"/>} label="Processing" value={inquiries.filter(iq => iq.status === INQUIRY_STATUS.PROCESSING).length} color="bg-orange-50" />
                        <StatCard icon={<CheckCircle2 className="text-green-600"/>} label="Total Capacity (Kg)" value={inquiries.reduce((s, i) => s + (Number(i.quantity) || 0), 0)} color="bg-green-50" />
                    </div>

                    {/* Main Data Table */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="p-5">Client Entity</th>
                                    <th className="p-5">Fabric Profile</th>
                                    <th className="p-5 text-center">AI Analysis & Tone</th>
                                    <th className="p-5">Workflow</th>
                                    <th className="p-5 text-center">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredInquiries.map((iq) => (
                                    <tr key={iq._id} className="hover:bg-blue-50/20 transition-all">
                                        <td className="p-5">
                                            <div className="font-bold text-slate-800">{iq.companyName}</div>
                                            <div className="text-[10px] text-slate-400 uppercase font-semibold">{iq.country}</div>
                                        </td>
                                        <td className="p-5 text-sm text-slate-600 italic">
                                            {iq.fabricType} ({iq.quantity}kg)
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                                                    iq.aiAnalysis?.category === 'Technical Textile' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                                                }`}>
                                                    {iq.aiAnalysis?.category || 'Standard'}
                                                </span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm ${
                                                    iq.aiAnalysis?.sentiment === 'Frustrated/Urgent' ? 'bg-red-100 text-red-600 border border-red-200' : 
                                                    iq.aiAnalysis?.sentiment === 'Highly Interested' ? 'bg-green-100 text-green-600 border border-green-200' : 
                                                    'bg-slate-100 text-slate-500 border border-slate-200'
                                                }`}>
                                                    <MessageSquare size={10} /> {iq.aiAnalysis?.sentiment || 'Neutral'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <select 
                                                value={iq.status} 
                                                onChange={(e) => handleStatusUpdate(iq._id, e.target.value)}
                                                className="text-[11px] font-bold border-2 border-slate-100 rounded-lg p-2 outline-none bg-slate-50 cursor-pointer"
                                            >
                                                <option value={INQUIRY_STATUS.PENDING}>{INQUIRY_STATUS.PENDING}</option>
                                                <option value={INQUIRY_STATUS.PROCESSING}>{INQUIRY_STATUS.PROCESSING}</option>
                                                <option value={INQUIRY_STATUS.SHIPPED}>{INQUIRY_STATUS.SHIPPED}</option>
                                                <option value={INQUIRY_STATUS.COMPLETED}>{INQUIRY_STATUS.COMPLETED}</option>
                                            </select>
                                        </td>
                                        <td className="p-5 text-center">
                                            <button 
                                                onClick={() => handleDelete(iq._id)} 
                                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        MERN Stack Enterprise System • Sri Mayur Colors Factory
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className={`p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 ${color}`}>
        <div className="p-4 bg-white rounded-2xl shadow-sm">{icon}</div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-black text-slate-900">{value}</p>
        </div>
    </div>
);

export default Dashboard;
