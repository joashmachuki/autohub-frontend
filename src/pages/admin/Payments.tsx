import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  CreditCard, 
  LogOut,
  Search,
  Check,
  X,
  DollarSign,
  Calendar,
  User,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface Payment {
  id: number;
  transaction_id: string;
  vehicle_id: number;
  customer_name: string;
  customer_phone: string;
  amount: number;
  payment_type: string;
  status: string;
  mpesa_receipt: string;
  created_at: string;
}

const AdminPayments = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    checkAuth();
    fetchPayments();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/payments`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Demo data
      setPayments([
        { id: 1, transaction_id: 'APH202401150001', vehicle_id: 1, customer_name: 'John Doe', customer_phone: '254712345678', amount: 500000, payment_type: 'deposit', status: 'completed', mpesa_receipt: 'QW123456', created_at: '2024-01-15T10:00:00Z' },
        { id: 2, transaction_id: 'APH202401140002', vehicle_id: 2, customer_name: 'Jane Smith', customer_phone: '254723456789', amount: 6200000, payment_type: 'full_payment', status: 'completed', mpesa_receipt: 'QW123457', created_at: '2024-01-14T15:30:00Z' },
        { id: 3, transaction_id: 'APH202401130003', vehicle_id: 3, customer_name: 'Mike Johnson', customer_phone: '254734567890', amount: 1000000, payment_type: 'deposit', status: 'pending', mpesa_receipt: '', created_at: '2024-01-13T09:00:00Z' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const updatePaymentStatus = async (id: number, status: string) => {
    try {
      // In a real app, you'd have an endpoint for this
      toast.success('Status updated');
      setPayments(payments.map(p => p.id === id ? { ...p, status } : p));
    } catch (error) {
      toast.success('Status updated (Demo)');
    }
  };

  const filteredPayments = payments.filter(p =>
    p.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.customer_phone.includes(searchQuery)
  );

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Car className="w-5 h-5" />, label: 'Vehicles', path: '/admin/vehicles' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Payments', path: '/admin/payments', active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <span className="font-bold text-lg">AutoHub</span>
              <span className="text-xs text-gray-400 block">Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                item.active 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          </div>
        </header>

        {/* Mobile Menu */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-2 flex gap-2 overflow-x-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                item.active ? 'bg-red-600' : 'bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">KES {totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pending Amount</p>
                    <p className="text-2xl font-bold text-yellow-600">KES {pendingAmount.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
                    <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, transaction ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Payments List */}
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="text-center py-16">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">No payments found</h3>
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{payment.customer_name}</h3>
                            <p className="text-sm text-gray-500">{payment.transaction_id}</p>
                          </div>
                          <Badge className={
                            payment.status === 'completed' ? 'bg-green-500' :
                            payment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }>
                            {payment.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Amount</p>
                            <p className="font-semibold text-lg text-red-600">KES {payment.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Type</p>
                            <p className="font-semibold capitalize">{payment.payment_type.replace('_', ' ')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Vehicle ID</p>
                            <p className="font-semibold">#{payment.vehicle_id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-semibold">{new Date(payment.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <a href={`tel:${payment.customer_phone}`} className="flex items-center gap-1 text-gray-500 hover:text-red-600">
                            <Phone className="w-4 h-4" />
                            {payment.customer_phone}
                          </a>
                          {payment.mpesa_receipt && (
                            <span className="text-green-600">
                              M-Pesa Receipt: {payment.mpesa_receipt}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {payment.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updatePaymentStatus(payment.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Confirm
                          </Button>
                        )}
                        {payment.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updatePaymentStatus(payment.id, 'failed')}
                            className="bg-red-100 text-red-700 hover:bg-red-200"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPayments;
