"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, BookOpen, Home, Star, ArrowRight, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Menu, X } from 'lucide-react';

const ChildrenNGOLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Fix: Define the type for isVisible state
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stories data
  const stories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop",
      title: "Maria's Education Journey",
      description: "From living on the streets to graduating top of her class, Maria's transformation shows the power of education and care."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
      title: "Building Safe Homes",
      description: "Our shelter program has provided safe housing for over 500 children, giving them stability and hope for the future."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
      title: "Nutrition Program Success",
      description: "Healthy meals and nutrition education have improved the health outcomes of 1,200+ children in our programs."
    }
  ];

  // Statistics data
  const stats = [
    { number: "2,500+", label: "Children Helped", icon: <Users className="w-8 h-8" /> },
    { number: "150+", label: "Volunteers", icon: <Heart className="w-8 h-8" /> },
    { number: "50+", label: "Programs", icon: <BookOpen className="w-8 h-8" /> },
    { number: "25+", label: "Safe Homes", icon: <Home className="w-8 h-8" /> }
  ];

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % stories.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 transition-all duration-300">
        {/* Desktop/Laptop Navigation */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex justify-center items-center space-x-8">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Our Programs', href: '#programs' },
                { name: 'Get Involved', href: '#get-involved', hasDropdown: true },
                { name: 'Blog/Stories', href: '#stories' },
                { name: 'Contact Us', href: '#contact' }
              ].map((item) => (
                <div key={item.name} className="relative group">
                  <a href={item.href} 
                     className="text-white hover:text-yellow-400 transition-colors duration-300 relative px-4 py-2 flex items-center text-sm font-medium">
                    {item.name}
                    {item.hasDropdown && <ChevronRight className="w-4 h-4 ml-1 rotate-90" />}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 bg-black/95 backdrop-blur-sm rounded-lg shadow-xl py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <a href="#volunteer" className="block px-4 py-2 text-white hover:text-yellow-400 hover:bg-white/10 transition-colors duration-300">Volunteer</a>
                      <a href="#partner" className="block px-4 py-2 text-white hover:text-yellow-400 hover:bg-white/10 transition-colors duration-300">Partner</a>
                      <a href="#donate" className="block px-4 py-2 text-white hover:text-yellow-400 hover:bg-white/10 transition-colors duration-300">Donate</a>
                    </div>
                  )}
                </div>
              ))}
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ml-4">
                Donate Now
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        <div className="lg:hidden py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              Bright<span className="text-yellow-400">Future</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                Donate
              </button>
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="px-6 py-4 space-y-4">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Our Programs', href: '#programs' },
                { name: 'Blog/Stories', href: '#stories' },
                { name: 'Contact Us', href: '#contact' }
              ].map((item) => (
                <a key={item.name} href={item.href} 
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="block text-white hover:text-yellow-400 transition-colors duration-300 py-2 border-b border-gray-800 last:border-b-0">
                  {item.name}
                </a>
              ))}
              <div className="py-2">
                <div className="text-yellow-400 font-semibold mb-2">Get Involved</div>
                <div className="pl-4 space-y-2">
                  <a href="#volunteer" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-yellow-400 transition-colors duration-300 py-1">Volunteer</a>
                  <a href="#partner" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-yellow-400 transition-colors duration-300 py-1">Partner</a>
                  <a href="#donate" onClick={() => setIsMobileMenuOpen(false)} className="block text-white hover:text-yellow-400 transition-colors duration-300 py-1">Donate</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/30 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-blue-300/30 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-300/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
            Every Child Deserves a Bright Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join us in transforming lives through education, care, and endless possibilities for children who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
              Donate Now
              <Heart className="ml-2 w-5 h-5 group-hover:animate-pulse" />
            </button>
            <button className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
              Learn More
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white" data-animate>
        <div className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${isVisible.impact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-center mb-4">Our Impact</h2>
          <p className="text-xl text-center mb-16 text-purple-100">Together, we're making a real difference in children's lives</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center transform transition-all duration-700 ${isVisible.impact ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`} style={{transitionDelay: `${index * 200}ms`}}>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20">
                  <div className="text-yellow-300 mb-4 flex justify-center">{stat.icon}</div>
                  <div className="text-4xl font-black mb-2">{stat.number}</div>
                  <div className="text-lg text-purple-100">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-20 bg-gray-50" data-animate>
        <div className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${isVisible.stories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-center mb-4 text-gray-800">Success Stories</h2>
          <p className="text-xl text-center mb-16 text-gray-600">Real children, real transformations, real hope</p>
          
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
              {stories.map((story, index) => (
                <div key={story.id} className="w-full flex-shrink-0 flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img src={story.image} alt={story.title} className="w-full h-64 md:h-96 object-cover" />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800">{story.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">{story.description}</p>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110">
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {stories.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/70'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 text-black" data-animate>
        <div className={`max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible['get-involved'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold mb-4">Get Involved</h2>
          <p className="text-xl mb-16 text-black/80">Your support can change a child's life forever</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20">
              <Heart className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-2xl font-bold mb-4">Donate</h3>
              <p className="text-black/80 mb-6">Your financial support directly funds our programs and helps us reach more children in need.</p>
              <button className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto group">
                Donate Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/20">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold mb-4">Volunteer</h3>
              <p className="text-black/80 mb-6">Join our community of volunteers and make a hands-on difference in children's lives.</p>
              <button className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto group">
                Join Us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                Bright<span className="text-yellow-400">Future</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Dedicated to providing every child with the opportunity to thrive, learn, and build a brighter future.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'Our Programs', 'Success Stories', 'Get Involved', 'News & Updates'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-yellow-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-yellow-400" />
                  <span className="text-gray-400">info@brightfuture.org</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-yellow-400" />
                  <span className="text-gray-400">123 Hope Street, City, State</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook className="w-6 h-6" />, href: "#" },
                  { icon: <Twitter className="w-6 h-6" />, href: "#" },
                  { icon: <Instagram className="w-6 h-6" />, href: "#" }
                ].map((social, index) => (
                  <a key={index} href={social.href} className="text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 BrightFuture NGO. All rights reserved. | 
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300 ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300 ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChildrenNGOLanding;