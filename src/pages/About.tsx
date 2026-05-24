import { 
  Shield, 
  Truck, 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  Globe
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const stats = [
    { number: '500+', label: 'Vehicles Sold' },
    { number: '1000+', label: 'Happy Customers' },
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Vehicle Brands' },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Transparency',
      description: 'We believe in honest dealings with no hidden fees or surprises.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality First',
      description: 'Every vehicle undergoes rigorous inspection before delivery.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority, always.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Sourcing',
      description: 'Direct partnerships with manufacturers worldwide.',
    },
  ];

  const team = [
    {
      name: 'John Kamau',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    },
    {
      name: 'Sarah Ochieng',
      role: 'Sales Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    },
    {
      name: 'Michael Otieno',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
  ];

  return (
    <div className="pt-28 md:pt-32 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)' }}
        />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-red-500">AutoHub Kenya</span>
            </h1>
            <p className="text-xl text-gray-300">
              Your trusted partner for premium vehicles in Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  AutoHub Kenya is a trusted Kenya-based vehicle sales platform located in Magenche, 
                  specializing in sourcing, shipping, and selling brand-new and high-quality used cars, 
                  electric bikes, and motorcycles directly from reliable manufacturers and auto markets in China.
                </p>
                <p>
                  With years of cross-border auto trade experience, we guarantee 100% genuine vehicles, 
                  strict quality inspection before shipping, safe and fast international shipping to Kenya, 
                  and transparent pricing with no hidden fees.
                </p>
                <p>
                  We are committed to providing customers with affordable, reliable vehicles and professional 
                  after-sales support, serving customers across all regions of Kenya.
                </p>
                <p className="font-medium text-gray-900">
                  Our mission is to make high-quality imported vehicles accessible to every Kenyan, 
                  with a seamless buying experience from browsing to delivery.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400"
                alt="Car showroom"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"
                alt="Car dealership"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-red-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at AutoHub Kenya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">100% Genuine Vehicles</h3>
                    <p className="text-gray-600 text-sm">All our vehicles are sourced directly from manufacturers with complete documentation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Quality Inspection</h3>
                    <p className="text-gray-600 text-sm">Every vehicle undergoes strict quality checks before shipping.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Fast Shipping</h3>
                    <p className="text-gray-600 text-sm">Safe and fast international shipping from China to Kenya.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Transparent Pricing</h3>
                    <p className="text-gray-600 text-sm">No hidden fees or charges. What you see is what you pay.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800"
                alt="Our showroom"
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The dedicated professionals behind AutoHub Kenya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us or contact us for any inquiries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-gray-600">Magenche, Kenya</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+254 720 549 567</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@autohubkenya.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
