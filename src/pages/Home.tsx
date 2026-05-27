import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Clock, 
  Award, 
  Users,
  CheckCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  images: string[];
  featured: boolean;
}

const Home = () => {
  const [featuredNewCars, setFeaturedNewCars] = useState<Vehicle[]>([]);
  const [featuredUsedCars, setFeaturedUsedCars] = useState<Vehicle[]>([]);
  const [featuredEbikes, setFeaturedEbikes] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetchFeaturedVehicles();
  }, []);

  const fetchFeaturedVehicles = async () => {
    try {
      const newCarsRes = await axios.get(`${API_URL}/vehicles?vehicle_type=car&condition=new&featured=true`);
      setFeaturedNewCars(newCarsRes.data.slice(0, 4));

      const usedCarsRes = await axios.get(`${API_URL}/vehicles?vehicle_type=car&condition=used&featured=true`);
      setFeaturedUsedCars(usedCarsRes.data.slice(0, 4));

      const ebikesRes = await axios.get(`${API_URL}/vehicles?vehicle_type=ebike&condition=new`);
      const motorcyclesRes = await axios.get(`${API_URL}/vehicles?vehicle_type=motorcycle&condition=new`);
      setFeaturedEbikes([...ebikesRes.data, ...motorcyclesRes.data].slice(0, 4));
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <Link to={`/vehicles/${vehicle.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={vehicle.images[0] || '/placeholder-car.jpg'}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              vehicle.condition === 'new' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {vehicle.condition === 'new' ? 'New' : 'Used'}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{vehicle.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
          <p className="text-lg font-bold text-red-600">KES {vehicle.price.toLocaleString()}</p>
        </CardContent>
      </Card>
    </Link>
  );

  const ComingSoon = ({ message }: { message: string }) => (
    <div className="col-span-full text-center py-16">
      <p className="text-2xl text-gray-300 font-bold mb-2">Coming Soon</p>
      <p className="text-gray-500">{message}</p>
    </div>
  );

  return (
    <div className="pt-28 md:pt-32">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Vehicles from China to Kenya
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Direct import of new & used cars, electric bikes, and motorcycles with quality guarantee.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/vehicles">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  Browse Vehicles <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-red-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured New Cars */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured New Cars</h2>
              <p className="text-gray-500 mt-1">Latest arrivals with zero mileage</p>
            </div>
            <Link to="/vehicles?condition=new" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNewCars.length === 0 ? (
              <ComingSoon message="New cars will be available shortly" />
            ) : (
              featuredNewCars?.map((car) => <VehicleCard key={car.id} vehicle={car} />)
            )}
          </div>
        </div>
      </section>

      {/* Featured Used Cars */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Used Cars</h2>
              <p className="text-gray-500 mt-1">Quality pre-owned vehicles at great prices</p>
            </div>
            <Link to="/vehicles?condition=used" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredUsedCars.length === 0 ? (
              <ComingSoon message="Used cars will be available shortly" />
            ) : (
              featuredUsedCars?.map((car) => <VehicleCard key={car.id} vehicle={car} />)
            )}
          </div>
        </div>
      </section>

      {/* Featured Ebikes & Motorcycles */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ebikes & Motorcycles</h2>
              <p className="text-gray-500 mt-1">Eco-friendly rides for urban commuting</p>
            </div>
            <Link to="/vehicles?type=ebike" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEbikes.length === 0 ? (
              <ComingSoon message="E-bikes and motorcycles will be available shortly" />
            ) : (
              featuredEbikes?.map((bike) => <VehicleCard key={bike.id} vehicle={bike} />)
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose AutoHub Kenya?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are committed to providing the best vehicle buying experience with quality assurance 
              and professional service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-400 text-sm">All vehicles undergo strict quality inspection before shipping.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-400 text-sm">Direct shipping from China to Kenya with tracking.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-400 text-sm">Competitive pricing with no hidden fees or charges.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-400 text-sm">Professional team to assist you at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Shipping Highlights */}
      <section className="py-12 md:py-16 bg-red-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="flex items-center gap-4">
              <Clock className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">Fast Delivery</h3>
                <p className="text-red-100">2-4 weeks shipping time</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">Easy Process</h3>
                <p className="text-red-100">Hassle-free documentation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Star className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">5-Star Service</h3>
                <p className="text-red-100">Customer satisfaction guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Trust Badges */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Trusted by Thousands</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">500+</div>
              <div className="text-sm text-gray-600">Vehicles Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">1000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">5+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920)' }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Vehicle?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Browse our extensive collection of new and used cars, ebikes, and motorcycles. 
            Contact us today for the best deals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vehicles">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Browse All Vehicles <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-red-600">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
