import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Grid, List, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    type: '', condition: '', brand: '', min_price: '', max_price: '',
    year: '', fuel_type: '', transmission: '', search: '', sort: 'newest',
  });

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          const apiKey = key === 'type' ? 'vehicle_type' : key;
          params.append(apiKey, value);
        }
      });
      const response = await axios.get(`${API_URL}/vehicles?${params}`);
      setVehicles(response.data);
    } catch (error) {
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      type: '', condition: '', brand: '', min_price: '', max_price: '',
      year: '', fuel_type: '', transmission: '', search: '', sort: 'newest',
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '' && v !== 'newest');

  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <Link to={`/vehicles/${vehicle.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={vehicle.images[0] || '/placeholder-car.jpg'}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-car.jpg'; }}
          />
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${vehicle.condition === 'new' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
              {vehicle.condition === 'new' ? 'New' : 'Used'}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{vehicle.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{vehicle.year} • {vehicle.mileage.toLocaleString()} km • {vehicle.transmission}</p>
          <p className="text-lg font-bold text-red-600">KES {vehicle.price.toLocaleString()}</p>
        </CardContent>
      </Card>
    </Link>
  );

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <Input type="text" placeholder="Search vehicles..." value={filters.search} onChange={(e) => updateFilter('search', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
        <Select value={filters.condition} onValueChange={(v) => updateFilter('condition', v)}>
          <SelectTrigger><SelectValue placeholder="All Conditions" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="used">Used</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
        <Select value={filters.type} onValueChange={(v) => updateFilter('type', v)}>
          <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="car">Cars</SelectItem>
            <SelectItem value="suv">SUVs</SelectItem>
            <SelectItem value="truck">Trucks</SelectItem>
            <SelectItem value="van">Vans</SelectItem>
            <SelectItem value="bus">Buses</SelectItem>
            <SelectItem value="ebike">E-Bikes</SelectItem>
            <SelectItem value="motorcycle">Motorcycles</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" /> Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="pt-28 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Vehicles</h1>
          <p className="text-gray-500">{vehicles.length} vehicles available</p>
        </div>
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</h2>
              <FilterContent />
            </div>
          </aside>
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse"><div className="aspect-[4/3] bg-gray-200" /><CardContent className="p-4 space-y-2"><div className="h-4 bg-gray-200 rounded w-3/4" /><div className="h-3 bg-gray-200 rounded w-1/2" /></CardContent></Card>
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-16">
                {filters.type === 'ebike' || filters.type === 'motorcycle' ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-500">E-bikes and motorcycles will be available shortly. Stay tuned!</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
                    {hasActiveFilters && <Button onClick={clearFilters} variant="outline">Clear All Filters</Button>}
                  </>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {vehicles?.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
