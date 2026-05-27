import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Wrench, Car, Bike, Truck, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = '/api';

const vehicleTypes = [
  { value: 'car', label: 'Car', icon: <Car className="w-5 h-5" /> },
  { value: 'truck', label: 'Truck', icon: <Truck className="w-5 h-5" /> },
  { value: 'ebike', label: 'Electric Bike', icon: <Bike className="w-5 h-5" /> },
  { value: 'motorcycle', label: 'Motorcycle', icon: <Bike className="w-5 h-5" /> },
];

export default function SpareParts() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: '',
    vehicleBrand: '',
    vehicleModel: '',
    partName: '',
    partNumber: '',
    description: '',
    quantity: '1',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/spare-parts-request`, formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit request. Please try again or contact us directly.');
    }
  };

  if (submitted) {
    return (
      <div className="pt-28 md:pt-32 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Card className="p-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your spare parts request. Our team will contact you within 24 hours with availability and pricing.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Submit Another Request
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Spare Parts</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Can't find the part you need? Submit a request and we'll source it for you. We handle parts for cars, trucks, ebikes, and motorcycles.
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    placeholder="+254 720 549 567"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Vehicle Type *</Label>
                <Select value={formData.vehicleType} onValueChange={(v) => handleChange('vehicleType', v)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <span className="flex items-center gap-2">
                          {type.icon}
                          {type.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicleBrand">Vehicle Brand *</Label>
                  <Input
                    id="vehicleBrand"
                    required
                    placeholder="Toyota, BMW, Honda..."
                    value={formData.vehicleBrand}
                    onChange={(e) => handleChange('vehicleBrand', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Vehicle Model *</Label>
                  <Input
                    id="vehicleModel"
                    required
                    placeholder="Corolla, X5, CBR..."
                    value={formData.vehicleModel}
                    onChange={(e) => handleChange('vehicleModel', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="partName">Part Name *</Label>
                  <Input
                    id="partName"
                    required
                    placeholder="Brake pads, Oil filter, Battery..."
                    value={formData.partName}
                    onChange={(e) => handleChange('partName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partNumber">Part Number (if known)</Label>
                  <Input
                    id="partNumber"
                    placeholder="OEM-12345"
                    value={formData.partNumber}
                    onChange={(e) => handleChange('partNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  placeholder="Year of manufacture, specific requirements, preferred brand (OEM/Aftermarket)..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg">
                Submit Request
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Our team will contact you within 24 hours with availability and pricing.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
