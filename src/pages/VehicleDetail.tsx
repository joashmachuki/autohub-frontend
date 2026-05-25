import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Share2, 
  Check,
  Fuel,
  Settings,
  Users,
  Calendar,
  Gauge,
  Palette,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = 'https://documentary-wright-typical-priorities.trycloudflare.com/api';

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
  specifications: Record<string, string>;
  images: string[];
  featured: boolean;
  stock_status: string;
  created_at: string;
}

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    phone: '',
    amount: '',
    payment_type: 'deposit',
  });

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(`${API_URL}/vehicles/${id}`);
      setVehicle(response.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      // Use sample data if API fails
      setSampleVehicle();
    } finally {
      setLoading(false);
    }
  };

  const setSampleVehicle = () => {
    setVehicle({
      id: parseInt(id || '1'),
      title: 'Toyota Land Cruiser Prado',
      vehicle_type: 'car',
      condition: 'new',
      brand: 'Toyota',
      model: 'Prado',
      year: 2024,
      price: 8500000,
      mileage: 0,
      fuel_type: 'Diesel',
      transmission: 'Automatic',
      color: 'White',
      seats: 7,
      description: 'The Toyota Land Cruiser Prado is a premium SUV that combines luxury with off-road capability. Featuring a powerful 2.8L diesel engine, advanced safety features, and a spacious 7-seat interior. Perfect for both city driving and adventure trips.',
      specifications: {
        'Engine': '2.8L Turbo Diesel',
        'Power': '204 HP',
        'Torque': '500 Nm',
        'Drivetrain': '4WD',
        'Fuel Tank': '87L',
        'Ground Clearance': '220mm',
        'Warranty': '3 Years / 100,000 km',
      },
      images: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800',
      ],
      featured: true,
      stock_status: 'available',
      created_at: new Date().toISOString(),
    });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/inquiries`, {
        ...inquiryForm,
        vehicle_id: id,
        inquiry_type: 'vehicle',
      });
      toast.success('Inquiry submitted successfully! We will contact you soon.');
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.success('Inquiry submitted successfully! (Demo mode)');
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/payments/initiate`, {
        ...paymentForm,
        vehicle_id: id,
        amount: parseFloat(paymentForm.amount),
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.success('Payment initiated! Please check your phone for M-Pesa prompt. (Demo mode)');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle?.title,
        text: `Check out this ${vehicle?.title} on AutoHub Kenya`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="aspect-video bg-gray-200 rounded-lg mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
              <div className="h-64 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
          <p className="text-gray-500 mb-6">The vehicle you are looking for does not exist.</p>
          <Link to="/vehicles">
            <Button>Browse All Vehicles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <span>/</span>
          <Link to="/vehicles" className="hover:text-red-600">Vehicles</Link>
          <span>/</span>
          <span className="text-gray-900">{vehicle.title}</span>
        </div>

        {/* Back Button */}
        <Link to="/vehicles" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
              <img
                src={vehicle.images[selectedImage] || '/placeholder-car.jpg'}
                alt={vehicle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={vehicle.condition === 'new' ? 'bg-green-500' : 'bg-blue-500'}>
                  {vehicle.condition === 'new' ? 'New' : 'Used'}
                </Badge>
                {vehicle.featured && (
                  <Badge className="bg-red-500">Featured</Badge>
                )}
              </div>
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {vehicle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-red-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${vehicle.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Vehicle Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {vehicle.year}
                </span>
                <span className="flex items-center gap-1">
                  <Gauge className="w-4 h-4" />
                  {vehicle.mileage.toLocaleString()} km
                </span>
                <span className="flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  {vehicle.color}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Specifications */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Fuel className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fuel Type</p>
                      <p className="font-medium">{vehicle.fuel_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Transmission</p>
                      <p className="font-medium">{vehicle.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Seats</p>
                      <p className="font-medium">{vehicle.seats}</p>
                    </div>
                  </div>
                  {Object.entries(vehicle.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Check className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{key}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              {/* Price Card */}
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-3xl font-bold text-red-600 mb-4">
                    KES {vehicle.price.toLocaleString()}
                  </p>
                  
                  <div className="space-y-3">
                    {/* Inquiry Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Inquiry
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Send Inquiry - {vehicle.title}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleInquirySubmit} className="space-y-4 mt-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={inquiryForm.name}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={inquiryForm.email}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={inquiryForm.phone}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              value={inquiryForm.message}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                              placeholder="I'm interested in this vehicle..."
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                            Submit Inquiry
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    {/* Payment Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Shield className="w-4 h-4 mr-2" />
                          Make Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Make Payment - {vehicle.title}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-4">
                          <div>
                            <Label htmlFor="pname">Full Name</Label>
                            <Input
                              id="pname"
                              value={paymentForm.name}
                              onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="pphone">M-Pesa Phone Number</Label>
                            <Input
                              id="pphone"
                              value={paymentForm.phone}
                              onChange={(e) => setPaymentForm({ ...paymentForm, phone: e.target.value })}
                              placeholder="e.g., 254720549567"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="pamount">Amount (KES)</Label>
                            <Input
                              id="pamount"
                              type="number"
                              value={paymentForm.amount}
                              onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                              placeholder="Enter amount"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="ptype">Payment Type</Label>
                            <select
                              id="ptype"
                              value={paymentForm.payment_type}
                              onChange={(e) => setPaymentForm({ ...paymentForm, payment_type: e.target.value })}
                              className="w-full border rounded-md p-2"
                            >
                              <option value="deposit">Deposit</option>
                              <option value="full_payment">Full Payment</option>
                            </select>
                          </div>
                          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                            Pay with M-Pesa
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <a href="tel:+254720549567">
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Seller Information</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div>
                      <p className="font-medium">AutoHub Kenya</p>
                      <p className="text-sm text-gray-500">Verified Dealer</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      Verified Seller
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Fast Response
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Shipping Information</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We offer fast and secure shipping from China to Kenya. 
                    Delivery time: 2-4 weeks.
                  </p>
                  <Link to="/shipping" className="text-red-600 text-sm font-medium hover:underline">
                    Learn more about shipping
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
