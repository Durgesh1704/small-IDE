"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Leaf, 
  Globe,
  Search,
  Filter,
  ShoppingCart,
  Sell,
  Wallet,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface Project {
  id: number;
  name: string;
  location: string;
  type: "reforestation" | "renewable" | "conservation";
  price: number;
  available: number;
  totalSupply: number;
  rating: number;
  description: string;
  verified: boolean;
  image: string;
}

interface Order {
  id: number;
  type: "buy" | "sell";
  amount: number;
  price: number;
  status: "open" | "filled" | "cancelled";
  createdAt: string;
  project?: Project;
}

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: "Amazon Reforestation Project",
      location: "Brazil",
      type: "reforestation",
      price: 25.50,
      available: 1200,
      totalSupply: 5000,
      rating: 4.8,
      description: "Large-scale reforestation initiative in the Amazon rainforest focusing on native species restoration.",
      verified: true,
      image: "🌳"
    },
    {
      id: 2,
      name: "Wind Energy Farm",
      location: "India",
      type: "renewable",
      price: 18.75,
      available: 850,
      totalSupply: 2000,
      rating: 4.6,
      description: "Clean energy generation through wind power, reducing reliance on fossil fuels.",
      verified: true,
      image: "💨"
    },
    {
      id: 3,
      name: "Mangrove Restoration",
      location: "Indonesia",
      type: "conservation",
      price: 22.30,
      available: 650,
      totalSupply: 1500,
      rating: 4.9,
      description: "Coastal mangrove ecosystem restoration providing carbon sequestration and biodiversity protection.",
      verified: true,
      image: "🌊"
    },
    {
      id: 4,
      name: "Solar Power Initiative",
      location: "Morocco",
      type: "renewable",
      price: 20.00,
      available: 950,
      totalSupply: 3000,
      rating: 4.7,
      description: "Large-scale solar power plant providing clean energy to local communities.",
      verified: true,
      image: "☀️"
    },
    {
      id: 5,
      name: "Forest Conservation",
      location: "Canada",
      type: "conservation",
      price: 28.90,
      available: 400,
      totalSupply: 1000,
      rating: 4.5,
      description: "Protection of old-growth forests and prevention of deforestation.",
      verified: true,
      image: "🌲"
    }
  ];

  const myOrders: Order[] = [
    {
      id: 1,
      type: "buy",
      amount: 10,
      price: 25.50,
      status: "filled",
      createdAt: "2024-01-15",
      project: projects[0]
    },
    {
      id: 2,
      type: "sell",
      amount: 5,
      price: 22.00,
      status: "open",
      createdAt: "2024-01-12"
    }
  ];

  const myCredits = {
    total: 15.5,
    available: 8.5,
    retired: 7.0
  };

  const priceData = [
    { date: "Jan", price: 18.50, volume: 1200 },
    { date: "Feb", price: 19.25, volume: 1450 },
    { date: "Mar", price: 20.10, volume: 1680 },
    { date: "Apr", price: 21.75, volume: 2100 },
    { date: "May", price: 23.40, volume: 2350 },
    { date: "Jun", price: 25.20, volume: 2800 }
  ];

  const marketStats = {
    totalVolume: 28450,
    averagePrice: 22.85,
    priceChange: 8.5,
    activeProjects: 5,
    totalCredits: 12500
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyCredits = (project: Project) => {
    setSelectedProject(project);
    // This would typically open a buy modal
    alert(`Buy functionality for ${project.name} would be implemented here`);
  };

  const handleSellCredits = () => {
    // This would typically open a sell modal
    alert("Sell functionality would be implemented here");
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "default",
      filled: "default",
      cancelled: "destructive"
    };
    const icons = {
      open: <Clock className="w-3 h-3" />,
      filled: <CheckCircle className="w-3 h-3" />,
      cancelled: <AlertCircle className="w-3 h-3" />
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"} className="gap-1">
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
            <p className="text-gray-600 mt-1">Buy, sell, and trade carbon credits</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <DollarSign className="w-4 h-4 mr-1" />
              ${marketStats.averagePrice}/avg
            </Badge>
            <Badge variant={marketStats.priceChange >= 0 ? "default" : "destructive"} className="text-sm">
              {marketStats.priceChange >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(marketStats.priceChange)}%
            </Badge>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{marketStats.totalVolume.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Credits traded</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${marketStats.averagePrice}</div>
              <p className="text-xs text-muted-foreground">Per ton CO₂</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Globe className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{marketStats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">Available for investment</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
              <Leaf className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{marketStats.totalCredits.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">In marketplace</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Credits</CardTitle>
              <Wallet className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{myCredits.available}</div>
              <p className="text-xs text-muted-foreground">{myCredits.total} total</p>
            </CardContent>
          </Card>
        </div>

        {/* Price Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Carbon credit price movements over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="price" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Price ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buy" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Buy Credits
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex items-center gap-2">
              <Sell className="w-4 h-4" />
              Sell Credits
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              My Portfolio
            </TabsTrigger>
          </TabsList>

          {/* Buy Credits Tab */}
          <TabsContent value="buy" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{project.image}</div>
                        <div>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {project.location}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{project.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Price per ton:</span>
                        <div className="font-semibold text-green-600">${project.price}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Available:</span>
                        <div className="font-semibold">{project.available} tons</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Supply progress:</span>
                        <span>{project.totalSupply - project.available} / {project.totalSupply} sold</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${((project.totalSupply - project.available) / project.totalSupply) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.verified ? (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      <Badge variant="outline">{project.type}</Badge>
                    </div>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleBuyCredits(project)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Credits
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sell Credits Tab */}
          <TabsContent value="sell" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sell Your Carbon Credits</CardTitle>
                  <CardDescription>List your carbon credits for sale on the marketplace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (tons)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="Enter amount to sell"
                      max={myCredits.available}
                    />
                    <p className="text-sm text-gray-600">Available: {myCredits.available} tons</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price per ton ($)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="Enter price per ton"
                      step="0.01"
                    />
                    <p className="text-sm text-gray-600">Current market average: ${marketStats.averagePrice}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Listing Duration</Label>
                    <select id="duration" className="w-full p-2 border rounded-md">
                      <option value="1">1 day</option>
                      <option value="3">3 days</option>
                      <option value="7" selected>7 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleSellCredits}
                  >
                    <Sell className="w-4 h-4 mr-2" />
                    List for Sale
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                  <CardDescription>Current market conditions and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#3b82f6" name="Price ($)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Market Trend:</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">Bullish</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Volume (24h):</span>
                      <span className="font-medium">1,250 tons</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Listings:</span>
                      <span className="font-medium">342</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. Sale Time:</span>
                      <span className="font-medium">2.3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>Your buy and sell orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              order.type === "buy" ? "bg-green-100" : "bg-blue-100"
                            }`}>
                              {order.type === "buy" ? (
                                <ShoppingCart className="w-5 h-5 text-green-600" />
                              ) : (
                                <Sell className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">
                                {order.type === "buy" ? "Buy" : "Sell"} {order.amount} tons
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>${order.price}/ton</span>
                                <span>•</span>
                                <span>{order.createdAt}</span>
                                {order.project && (
                                  <>
                                    <span>•</span>
                                    <span>{order.project.name}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ${order.amount * order.price}
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Credits</CardTitle>
                    <CardDescription>Your carbon credit balance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{myCredits.available}</div>
                      <div className="text-sm text-gray-600">Available tons</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Earned:</span>
                        <span className="font-medium">{myCredits.total} tons</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Retired:</span>
                        <span className="font-medium">{myCredits.retired} tons</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Value:</span>
                        <span className="font-medium">${(myCredits.available * marketStats.averagePrice).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Sell className="w-4 h-4 mr-2" />
                        Sell Credits
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Leaf className="w-4 h-4 mr-2" />
                        Retire Credits
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common marketplace actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      Browse Projects
                    </Button>
                    <Button className="w-full" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Price Alerts
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}