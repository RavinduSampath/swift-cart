import { Watch, Mail, Phone, MapPin, Shield, Truck, Clock, Award, Users, Heart, Globe, Star } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Watch className="w-12 h-12 text-blue-400" />
                <span className="text-4xl font-bold">SwiftCart</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Crafting Timeless
                <span className="text-blue-400"> Experiences</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                At SwiftCart, we believe a great watch is more than an accessory — it's a statement
                of precision, elegance, and individuality. Since our founding, we've been dedicated
                to bringing the world's finest timepieces to discerning collectors and enthusiasts.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Explore Collection
                </Link>
                <a
                  href="#contact"
                  className="border-2 border-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-semibold transition"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop"
                alt="Luxury Watch Collection"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=400&fit=crop"
                alt="Watch craftsmanship"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                A Passion for Horology
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                SwiftCart was founded with a singular vision: to make the world's most prestigious
                timepieces accessible to watch lovers everywhere. What started as a small boutique
                has grown into a trusted destination for luxury watches from iconic brands like
                Rolex, Omega, Patek Philippe, TAG Heuer, and many more.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Every watch in our collection is hand-selected by our team of certified horologists
                who inspect each piece for authenticity, quality, and condition. We partner directly
                with authorized dealers and manufacturers to ensure you receive only genuine
                timepieces backed by official warranties.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our commitment extends beyond the sale — we provide lifetime support, maintenance
                guidance, and a community for fellow watch enthusiasts to share their passion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-2">10K+</p>
              <p className="text-slate-300">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-2">50+</p>
              <p className="text-slate-300">Premium Brands</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-2">500+</p>
              <p className="text-slate-300">Watch Models</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-2">15+</p>
              <p className="text-slate-300">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose SwiftCart</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We go above and beyond to deliver an exceptional experience at every touchpoint
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Authentic</h3>
              <p className="text-slate-600">
                Every timepiece is verified by our certified horologists. We guarantee authenticity
                with official certificates and brand documentation.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Free Insured Shipping</h3>
              <p className="text-slate-600">
                Complimentary fully-insured shipping on all orders over $500. Your watch arrives
                safely in premium packaging.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2-Year Warranty</h3>
              <p className="text-slate-600">
                International warranty coverage on every purchase, with access to our network of
                authorized service centers worldwide.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Curation</h3>
              <p className="text-slate-600">
                Our team hand-picks every watch in our catalog, ensuring only the finest timepieces
                make it to our collection.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Customer First</h3>
              <p className="text-slate-600">
                Dedicated support team available 24/7 to assist with purchases, sizing, maintenance
                questions, and after-sale care.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Worldwide Delivery</h3>
              <p className="text-slate-600">
                We ship to over 100 countries with real-time tracking and customs-cleared delivery
                for a seamless experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to delivering excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Head of Curation</h3>
              <p className="text-blue-600 font-semibold mb-2">Master Horologist</p>
              <p className="text-slate-600 text-sm">
                15+ years of experience in luxury watch authentication and curation from the world's top brands.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Customer Experience Lead</h3>
              <p className="text-blue-600 font-semibold mb-2">Service Excellence</p>
              <p className="text-slate-600 text-sm">
                Ensuring every customer interaction is seamless, from first browse to lifetime after-sale support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Operations Director</h3>
              <p className="text-blue-600 font-semibold mb-2">Logistics & Fulfillment</p>
              <p className="text-slate-600 text-sm">
                Managing our secure global shipping network and ensuring every watch arrives in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Absolutely exceptional service! My Rolex Submariner arrived in pristine condition
                with all documentation. SwiftCart is now my go-to for luxury watches."
              </p>
              <p className="font-bold text-slate-900">— James W.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "The team helped me find the perfect Omega Seamaster. Their expertise and
                personalized recommendations made the experience truly special."
              </p>
              <p className="font-bold text-slate-900">— Sarah C.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Fast shipping, beautiful packaging, and the watch was exactly as described.
                The 2-year warranty gives great peace of mind. Highly recommended!"
              </p>
              <p className="font-bold text-slate-900">— Michael B.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out to our team anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                    <a href="tel:0714655760" className="text-blue-600 hover:text-blue-700 text-lg">
                      0714655760
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Mon - Sat, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <a href="mailto:swiftcart@gmail.com" className="text-blue-600 hover:text-blue-700 text-lg">
                      swiftcart@gmail.com
                    </a>
                    <p className="text-sm text-slate-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Visit Us</h4>
                    <p className="text-slate-600">SwiftCart Luxury Watches</p>
                    <p className="text-slate-600">123 Watch Avenue, Horological District</p>
                    <p className="text-sm text-slate-500 mt-1">Walk-in appointments welcome</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-10 bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monday - Friday</span>
                    <span className="font-semibold text-slate-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saturday</span>
                    <span className="font-semibold text-slate-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sunday</span>
                    <span className="font-semibold text-slate-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for your message! We will get back to you shortly.');
                }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select a topic</option>
                    <option value="inquiry">Product Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Watch?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our curated collection of luxury timepieces from the world's finest brands.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 hover:bg-slate-100 px-10 py-4 rounded-lg font-bold text-lg transition"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
