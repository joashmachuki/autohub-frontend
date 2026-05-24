import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  MessageSquare, 
  CreditCard, 
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

interface Vehicle {
  id: number;
  title: string;
  vehicle_type: string;
  condition: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  color: string;
  seats: number;
  description: string;
  images: string[];
  featured: boolean;
  stock_status: string;
}

const AdminVehicles = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
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
    fetchVehicles();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      // Demo data
      setVehicles([
        { id: 1, title: 'Toyota Land Cruiser Prado', vehicle_type: 'car', condition: 'new', brand: 'Toyota', model: 'Prado', year: 2024, price: 8500000, mileage: 0, fuel_type: 'Diesel', transmission: 'Automatic', color: 'White', seats: 7, description: 'Luxury SUV', images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'], featured: true, stock_status: 'available' },
        { id: 2, title: 'Mercedes-Benz C-Class', vehicle_type: 'car', condition: 'new', brand: 'Mercedes', model: 'C200', year: 2024, price: 6200000, mileage: 0, fuel_type: 'Petrol', transmission: 'Automatic', color: 'Black', seats: 5, description: 'Premium sedan', images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400'], featured: true, stock_status: 'available' },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        await axios.put(`${API_URL}/vehicles/${editingVehicle.id}`, formData);
        toast.success('Vehicle updated successfully');
      } else {
        await axios.post(`${API_URL}/vehicles`, formData);
        toast.success('Vehicle created successfully');
      }
      setIsDialogOpen(false);
      fetchVehicles();
      resetForm();
    } catch (error) {
      toast.success(editingVehicle ? 'Vehicle updated (Demo)' : 'Vehicle created (Demo)');
      setIsDialogOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      await axios.delete(`${API_URL}/vehicles/${id}`);
      toast.success('Vehicle deleted successfully');
      fetchVehicles();
    } catch (error) {
      toast.success('Vehicle deleted (Demo)');
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      title: vehicle.title,
      vehicle_type: vehicle.vehicle_type,
      condition: vehicle.condition,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      fuel_type: vehicle.fuel_type,
      transmission: vehicle.transmission,
      color: vehicle.color,
      seats: vehicle.seats,
      description: vehicle.description,
      images: vehicle.images,
      featured: vehicle.featured,
      stock_status: vehicle.stock_status,
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingVehicle(null);
    resetForm();
    setIsDialogOpen(true);
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
  };

  const filteredVehicles = vehicles.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Car className="w-5 h-5" />, label: 'Vehicles', path: '/admin/vehicles', active: true },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Payments', path: '/admin/payments' },
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
            <h1 className="text-2xl font-bold text-gray-900">Manage Vehicles</h1>
            <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
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
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Vehicles Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-16">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-500 mb-4">Add your first vehicle to get started</p>
              <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={vehicle.images[0] || '/placeholder-car.jpg'}
                      alt={vehicle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        vehicle.condition === 'new' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        {vehicle.condition}
                      </span>
                      {vehicle.featured && (
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-red-500 text-white">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{vehicle.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {vehicle.year} • {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="text-lg font-bold text-red-600 mb-4">
                      KES {vehicle.price.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Vehicle Type</Label>
                <Select
                  value={formData.vehicle_type}
                  onValueChange={(v) => setFormData({ ...formData, vehicle_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
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
                <Label>Brand</Label>
                <Input
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Model</Label>
                <Input
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Year</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Price (KES)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Mileage (km)</Label>
                <Input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(v) => setFormData({ ...formData, condition: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fuel Type</Label>
                <Select
                  value={formData.fuel_type}
                  onValueChange={(v) => setFormData({ ...formData, fuel_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Transmission</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(v) => setFormData({ ...formData, transmission: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Color</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
              <div>
                <Label>Seats</Label>
                <Input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-md p-2"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Featured on homepage</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {editingVehicle ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVehicles;
