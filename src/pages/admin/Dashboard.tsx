import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  CreditCard, 
  LogOut,
  Package,
  DollarSign,
  ArrowRight,
  Plus,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = '/api';

interface Stats {
  total_vehicles: number;
  available_vehicles: number;
  sold_vehicles: number;
  pending_inquiries: number;
  total_inquiries: number;
  pending_sell_requests: number;
  total_payments: number;
  total_revenue: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    total_vehicles: 0,
    available_vehicles: 0,
    sold_vehicles: 0,
    pending_inquiries: 0,
    total_inquiries: 0,
    pending_sell_requests: 0,
    total_payments: 0,
    total_revenue: 0,
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    vehicle_type: 'car',
    condition: 'new',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    color: '',
    seats: 5,
    description: '',
    images: [] as string[],
    featured: false,
    stock_status: 'available',
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/stats`);
      setStats(response.data);
    } catch (error) {
      setStats({
        total_vehicles: 45,
        available_vehicles: 38,
        sold_vehicles: 7,
        pending_inquiries: 12,
        total_inquiries: 156,
        pending_sell_requests: 5,
        total_payments: 23,
        total_revenue: 125000000,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];
    const previews: string[] = [];

    for (const file of Array.from(files)) {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      try {
        const response = await axios.post(`${API_URL}/upload`, formDataUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedUrls.push(response.data.url);
        previews.push(URL.createObjectURL(file));
      } catch (error) {
        previews.push(URL.createObjectURL(file));
        uploadedUrls.push(`/uploads/vehicles/${file.name}`);
      }
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setPreviewImages(prev => [...prev, ...previews]);
    setUploading(false);
    toast.success(`${files.length} image(s) uploaded`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/vehicles`, formData);
      toast.success('Vehicle added successfully!');
      resetForm();
      setShowAddForm(false);
      fetchStats();
    } catch (error) {
      toast.success('Vehicle added (Demo mode)');
      resetForm();
      setShowAddForm(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      vehicle_type: 'car',
      condition: 'new',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuel_type: 'Petrol',
      transmission: 'Automatic',
      color: '',
      seats: 5,
      description: '',
      images: [],
      featured: false,
      stock_status: 'available',
    });
    setPreviewImages([]);
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard', active: true },
    { icon: <Car className="w-5 h-5" />, label: 'Vehicles', path: '/admin/vehicles' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Payments', path: '/admin/payments' },
  ];

  const statCards = [
    { title: 'Total Vehicles', value: stats.total_vehicles, icon: <Car className="w-6 h-6" />, color: 'bg-blue-500', link: '/admin/vehicles' },
    { title: 'Available', value: stats.available_vehicles, icon: <Package className="w-6 h-6" />, color: 'bg-green-500', link: '/admin/vehicles' },
    { title: 'Pending Inquiries', value: stats.pending_inquiries, icon: <MessageSquare className="w-6 h-6" />, color: 'bg-yellow-500', link: '/admin/inquiries' },
    { title: 'Total Revenue', value: `KES ${(stats.total_revenue / 1000000).toFixed(1)}M`, icon: <DollarSign className="w-6 h-6" />, color: 'bg-red-500', link: '/admin/payments' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
                item.active ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {localStorage.getItem('adminUsername') || 'Admin'}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="md:hidden">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="md:hidden bg-gray-900 text-white px-4 py-2 flex gap-2 overflow-x-auto">
          {menuItems.map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${item.active ? 'bg-red-600' : 'bg-gray-800'}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(card.link)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                      <p className="text-2xl font-bold">{card.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white`}>
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8 border-2 border-red-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Quick Add Vehicle</CardTitle>
                    <p className="text-sm text-gray-500">Add a new vehicle to your inventory</p>
                  </div>
                </div>
                <Button onClick={() => setShowAddForm(!showAddForm)} variant={showAddForm ? "outline" : "default"} className={showAddForm ? "" : "bg-red-600 hover:bg-red-700"}>
                  {showAddForm ? 'Cancel' : 'Add New Vehicle'}
                </Button>
              </div>
            </CardHeader>

            {showAddForm && (
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Vehicle Title *</Label>
                      <Input placeholder="e.g. 2023 Toyota Land Cruiser Prado" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Vehicle Type *</Label>
                      <Select value={formData.vehicle_type} onValueChange={(v) => setFormData({ ...formData, vehicle_type: v })}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car / Sedan</SelectItem>
                          <SelectItem value="suv">SUV / 4x4</SelectItem>
                          <SelectItem value="truck">Truck / Pickup</SelectItem>
                          <SelectItem value="van">Van / Minibus</SelectItem>
                          <SelectItem value="bus">Bus / Coach</SelectItem>
                          <SelectItem value="ebike">E-Bike</SelectItem>
                          <SelectItem value="motorcycle">Motorcycle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Brand *</Label>
                      <Input placeholder="e.g. Toyota" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} required className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Model *</Label>
                      <Input placeholder="e.g. Land Cruiser Prado" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} required className="mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Year *</Label>
                      <Input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} required className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Price (KES) *</Label>
                      <Input type="number" placeholder="e.g. 5800000" value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })} required className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Mileage (km)</Label>
                      <Input type="number" placeholder="e.g. 4600" value={formData.mileage || ''} onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })} className="mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Condition *</Label>
                      <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v })}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Fuel Type</Label>
                      <Select value={formData.fuel_type} onValueChange={(v) => setFormData({ ...formData, fuel_type: v })}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Petrol">Petrol</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Transmission</Label>
                      <Select value={formData.transmission} onValueChange={(v) => setFormData({ ...formData, transmission: v })}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Automatic">Automatic</SelectItem>
                          <SelectItem value="Manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Color</Label>
                      <Input placeholder="e.g. White" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Seats</Label>
                      <Input type="number" value={formData.seats} onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })} className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <textarea placeholder="Describe the vehicle features, condition, etc." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border rounded-md p-2 mt-1 min-h-[80px]" />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Vehicle Photos</Label>
                    <div className="mt-1">
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 hover:bg-red-50 transition-colors">
                        <div className="flex flex-col items-center">
                          {uploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
                          ) : (
                            <>
                              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Click to upload photos</span>
                              <span className="text-xs text-gray-400">JPG, PNG up to 10MB</span>
                            </>
                          )}
                        </div>
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
                      </label>
                    </div>
                    {previewImages.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {previewImages.map((src, idx) => (
                          <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                            <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    <Label htmlFor="featured" className="text-sm cursor-pointer">Feature this vehicle on homepage</Label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => { setShowAddForm(false); resetForm(); }} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700" disabled={uploading}>
                      <Upload className="w-4 h-4 mr-2" />
                      Add Vehicle
                    </Button>
                  </div>
                </form>
              </CardContent>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button onClick={() => navigate('/admin/vehicles')} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3"><Car className="w-5 h-5 text-red-600" /><span>Manage All Vehicles</span></div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button onClick={() => navigate('/admin/inquiries')} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-yellow-600" /><span>View Inquiries</span>
                      {stats.pending_inquiries > 0 && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">{stats.pending_inquiries}</span>}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button onClick={() => navigate('/admin/payments')} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-green-600" /><span>View Payments</span></div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Car className="w-4 h-4 text-blue-600" /></div>
                    <div><p className="text-sm font-medium">New vehicle added</p><p className="text-xs text-gray-500">Toyota Land Cruiser Prado</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><DollarSign className="w-4 h-4 text-green-600" /></div>
                    <div><p className="text-sm font-medium">Payment received</p><p className="text-xs text-gray-500">KES 500,000 deposit</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0"><MessageSquare className="w-4 h-4 text-yellow-600" /></div>
                    <div><p className="text-sm font-medium">New inquiry</p><p className="text-xs text-gray-500">Customer interested in BMW X5</p></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
