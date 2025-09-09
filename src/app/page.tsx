import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sprout, Recycle, TrendingUp, Users, Award, Globe, BarChart3, Leaf } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">EARTH</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
              <Link href="/tree-planting" className="text-gray-600 hover:text-gray-900 transition-colors">Tree Planting</Link>
              <Link href="/recycling" className="text-gray-600 hover:text-gray-900 transition-colors">Recycling</Link>
              <Link href="/marketplace" className="text-gray-600 hover:text-gray-900 transition-colors">Marketplace</Link>
            </div>
            <Button size="sm">Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-blue-600 to-green-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Revolutionizing Sustainability with{" "}
            <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
              Blockchain Transparency
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Join the movement to combat climate change through transparent carbon credits and eco-actions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Join Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 text-lg">
              Plant a Tree
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 text-lg">
              Buy Carbon Credits
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-green-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Plant Trees</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Plant trees through our app and track their growth with blockchain verification
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-green-800">Earn Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive carbon credits for your eco-actions, verified by our partners
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-green-800">Offset Carbon</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Trade or use your credits to offset your carbon footprint
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Collective Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">125,430</div>
              <div className="text-xl opacity-90">Trees Planted</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">48,750 kg</div>
              <div className="text-xl opacity-90">Plastic Recycled</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2,450 tons</div>
              <div className="text-xl opacity-90">CO₂ Offset</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-green-800">Carbon Credit Marketplace</h2>
              <p className="text-lg text-gray-600 mb-8">
                Buy, sell, and trade carbon credits in a transparent marketplace powered by blockchain. 
                Every transaction is verifiable and contributes to a more sustainable future.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Globe className="w-4 h-4 mr-1" />
                    Transparent
                  </Badge>
                  <span className="text-gray-600">All transactions on blockchain</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Users className="w-4 h-4 mr-1" />
                    Community
                  </Badge>
                  <span className="text-gray-600">Join thousands of eco-warriors</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Growing
                  </Badge>
                  <span className="text-gray-600">Expanding project portfolio</span>
                </div>
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Explore Marketplace
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Live Marketplace</h3>
                  <p className="text-gray-600">Real-time carbon credit trading</p>
                  <div className="mt-4 text-sm text-gray-500">
                    Interactive dashboard coming soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-green-800">Why Choose EARTH?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Recycle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-green-800">Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every action contributes to environmental sustainability
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-green-800">Global Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join a worldwide community fighting climate change
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-green-800">Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All activities verified by trusted partners
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-green-800">Rewarding</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn valuable carbon credits for your contributions
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of individuals and companies already making a positive impact on our planet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Explore the Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track your environmental impact and view your achievements
                </CardDescription>
                <Link href="/dashboard">
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    View Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Tree Planting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Plant trees and track their growth with blockchain verification
                </CardDescription>
                <Link href="/tree-planting">
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Plant Trees
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">Recycling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Recycle plastic and earn carbon credits with our QR system
                </CardDescription>
                <Link href="/recycling">
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Start Recycling
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Buy, sell, and trade carbon credits in our transparent marketplace
                </CardDescription>
                <Link href="/marketplace">
                  <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                    Explore Market
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Test Links Section */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Quick Access Test</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 underline">
                Test Dashboard Link
              </Link>
              <Link href="/dashboard-simple" className="text-green-600 hover:text-green-800 underline">
                Test Simple Dashboard
              </Link>
              <Link href="/tree-planting" className="text-purple-600 hover:text-purple-800 underline">
                Test Tree Planting Link
              </Link>
              <Link href="/recycling" className="text-orange-600 hover:text-orange-800 underline">
                Test Recycling Link
              </Link>
              <Link href="/marketplace" className="text-pink-600 hover:text-pink-800 underline">
                Test Marketplace Link
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}