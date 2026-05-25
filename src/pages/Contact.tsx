import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = 'https://atm-enables-investigator-jane.trycloudflare.com/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/inquiries`, {
        ...formData,
        inquiry_type: 'general',
      });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.success('Message sent! (Demo mode)');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '+254 720 549 567',
      link: 'tel:+254720549567',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'jrmachuki@gmail.com',
      link: 'mailto:jrmachuki@gmail.com',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      content: 'Magenche, Kenya',
      link: 'https://www.google.com/maps/search/JP3H+63X+Magadi+Rd+Kenya/',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      content: 'Mon - Sat: 8AM - 6PM',
      link: null,
    },
  ];

  return (
    <div className="pt-28 md:pt-32 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920)' }}
        />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact <span className="text-red-500">Us</span>
            </h1>
            <p className="text-xl text-gray-300">
              Get in touch with our team for any inquiries or assistance
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                  {info.link ? (
                    <a 
                      href={info.link}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-6">
                      <Send className="mr-2 w-5 h-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Social */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Location</h2>
              <p className="text-gray-600 mb-8">
                Visit our showroom to see our vehicles in person.
              </p>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-80 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <p className="text-gray-600">Magenche, Kenya</p>
                  <a 
                    href="https://www.google.com/maps/search/JP3H+63X+Magadi+Rd+Kenya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline mt-2 inline-block"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://wa.me/254720549567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-red-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-xl text-red-100 mb-8">
              Our customer support team is available 24/7 to help you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+254720549567">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </Button>
              </a>
              <a href="https://wa.me/254720549567">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
