import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Car, MessageSquare, CreditCard, Wrench, LogOut, CheckCircle, Clock, XCircle, Package } from 'lucide-react';

const API_URL = '/api';

const sidebarItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/Jerry@-2020/dashboard' },
  { icon: <Car className="w-5 h-5" />, label: 'Vehicles', path: '/Jerry@-2020/vehicles' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Inquiries', path: '/Jerry@-2020/inquiries' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Payments', path: '/Jerry@-2020/payments' },
  { icon: <Wrench className="w-5 h-5" />, label: 'Spare Parts', path: '/Jerry@-2020/spare-parts', active: true },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  sourced: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminSpareParts() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/Jerry@-2020/login');
      return;
    }
    fetchRequests();
  }, [navigate]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/Jerry@-2020/spare-parts`);
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.put(`${API_URL}/Jerry@-2020/spare-parts/${id}`, { status });
      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/Jerry@-2020/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">AutoHub Admin</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Spare Parts Requests</h2>
          <p className="text-gray-600">Manage customer spare parts requests</p>
        </div>

        {loading ? (
          <div className="text-center py-16">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No spare parts requests yet</div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <Card key={req.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{req.part_name}</h3>
                        <Badge className={statusColors[req.status] || 'bg-gray-100'}>
                          {req.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {req.vehicle_brand} {req.vehicle_model} ({req.vehicle_type})
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        Requested by: {req.name} | Phone: {req.phone} {req.email && `| Email: ${req.email}`}
                      </p>
                      {req.part_number && (
                        <p className="text-sm text-gray-500 mb-1">Part Number: {req.part_number}</p>
                      )}
                      <p className="text-sm text-gray-500 mb-1">Quantity: {req.quantity}</p>
                      {req.description && (
                        <p className="text-sm text-gray-600 mt-2">{req.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-3">
                        Submitted: {new Date(req.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {req.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => updateStatus(req.id, 'sourced')} className="bg-blue-600 hover:bg-blue-700">
                            <Package className="w-4 h-4 mr-1" /> Sourced
                          </Button>
                          <Button size="sm" onClick={() => updateStatus(req.id, 'cancelled')} variant="outline" className="text-red-600 border-red-600">
                            <XCircle className="w-4 h-4 mr-1" /> Cancel
                          </Button>
                        </>
                      )}
                      {req.status === 'sourced' && (
                        <Button size="sm" onClick={() => updateStatus(req.id, 'delivered')} className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" /> Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
