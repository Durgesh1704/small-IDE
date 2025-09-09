"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Recycle, 
  QrCode, 
  Trophy, 
  Award, 
  TrendingUp,
  Search,
  MapPin,
  Calendar,
  Scale,
  Star,
  Users,
  Target
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RecyclingCenter {
  id: number;
  name: string;
  location: string;
  distance: number;
  rating: number;
  acceptedMaterials: string[];
  operatingHours: string;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  amount: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  target?: number;
}

export default function Recycling() {
  const [activeTab, setActiveTab] = useState('scan');
  const [searchQuery, setSearchQuery] = useState('');

  const recyclingCenters: RecyclingCenter[] = [
    {
      id: 1,
      name: "Eco Center Downtown",
      location: "123 Main St, Downtown",
      distance: 0.5,
      rating: 4.8,
      acceptedMaterials: ["Plastic", "Glass", "Paper", "Metal"],
      operatingHours: "8:00 AM - 8:00 PM"
    },
    {
      id: 2,
      name: "Green Point Recycling",
      location: "456 Oak Ave, Midtown",
      distance: 1.2,
      rating: 4.6,
      acceptedMaterials: ["Plastic", "Electronics", "Batteries"],
      operatingHours: "9:00 AM - 6:00 PM"
    },
    {
      id: 3,
      name: "City Recycling Hub",
      location: "789 Pine Rd, Uptown",
      distance: 2.1,
      rating: 4.9,
      acceptedMaterials: ["Plastic", "Glass", "Paper", "Metal", "Electronics"],
      operatingHours: "7:00 AM - 9:00 PM"
    },
    {
      id: 4,
      name: "Community Recycling Center",
      location: "321 Elm St, Riverside",
      distance: 3.5,
      rating: 4.3,
      acceptedMaterials: ["Plastic", "Paper", "Cardboard"],
      operatingHours: "10:00 AM - 5:00 PM"
    }
  ];

  const leaderboardData: LeaderboardEntry[] = [
    { id: 1, name: "EcoWarrior", amount: 45.2, rank: 1, trend: 'up' },
    { id: 2, name: "GreenGuru", amount: 38.7, rank: 2, trend: 'same' },
    { id: 3, name: "PlanetSaver", amount: 32.1, rank: 3, trend: 'up' },
    { id: 4, name: "NatureLover", amount: 28.5, rank: 4, trend: 'down' },
    { id: 5, name: "RecycleMaster", amount: 24.3, rank: 5, trend: 'up' },
    { id: 6, name: "You", amount: 18.9, rank: 15, trend: 'up' }
  ];

  const badges: Badge[] = [
    {
      id: 1,
      name: "First Recycle",
      description: "Recycle your first item",
      icon: "♻️",
      earned: true
    },
    {
      id: 2,
      name: "10kg Recycled",
      description: "Recycle 10kg of materials",
      icon: "🏆",
      earned: true
    },
    {
      id: 3,
      name: "Plastic Hero",
      description: "Recycle 25kg of plastic",
      icon: "🥇",
      earned: false,
      progress: 18.9,
      target: 25
    },
    {
      id: 4,
      name: "Recycling Streak",
      description: "Recycle for 7 days in a row",
      icon: "🔥",
      earned: false,
      progress: 3,
      target: 7
    },
    {
      id: 5,
      name: "Eco Champion",
      description: "Recycle 50kg total",
      icon: "👑",
      earned: false,
      progress: 18.9,
      target: 50
    },
    {
      id: 6,
      name: "Community Leader",
      description: "Reach top 10 on leaderboard",
      icon: "🌟",
      earned: false
    }
  ];

  const monthlyData = [
    { month: "Jan", amount: 2.5 },
    { month: "Feb", amount: 4.2 },
    { month: "Mar", amount: 6.8 },
    { month: "Apr", amount: 8.1 },
    { month: "May", amount: 12.3 },
    { month: "Jun", amount: 18.9 }
  ];

  const myStats = {
    totalRecycled: 18.9,
    plasticRecycled: 12.5,
    thisMonth: 6.6,
    rank: 15,
    streak: 3
  };

  const filteredCenters = recyclingCenters.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <span className="w-4 h-4 text-gray-400">—</span>;
    }
  };

  const handleScanQR = () => {
    // This would typically open a QR scanner
    alert("QR scanner would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Plastic Recycling</h1>
            <p className="text-gray-600 mt-1">Recycle plastic and earn carbon credits</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <Recycle className="w-4 h-4 mr-1" />
              {myStats.totalRecycled}kg Recycled
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Trophy className="w-4 h-4 mr-1" />
              Rank #{myStats.rank}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recycled</CardTitle>
              <Recycle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{myStats.totalRecycled}kg</div>
              <p className="text-xs text-muted-foreground">+{myStats.thisMonth}kg this month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plastic Recycled</CardTitle>
              <Scale className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{myStats.plasticRecycled}kg</div>
              <p className="text-xs text-muted-foreground">66% of total</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Target className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{myStats.streak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
              <Trophy className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">#{myStats.rank}</div>
              <p className="text-xs text-muted-foreground">Top 25%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scan" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Scan QR
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Badges
            </TabsTrigger>
          </TabsList>

          {/* QR Scanner Tab */}
          <TabsContent value="scan" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Scanner</CardTitle>
                  <CardDescription>Scan QR codes at recycling centers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">QR Code Scanner</h3>
                    <p className="text-gray-600 mb-4">Click the button below to scan QR codes at partner recycling centers</p>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleScanQR}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Open Scanner
                    </Button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">How it works</h4>
                    <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                      <li>Visit a partner recycling center</li>
                      <li>Scan their QR code with our app</li>
                      <li>Submit your recycling receipt</li>
                      <li>Earn carbon credits based on weight</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Recycling Progress</CardTitle>
                  <CardDescription>Track your recycling activity over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#3b82f6" name="Recycled (kg)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{myStats.thisMonth}kg</div>
                      <div className="text-sm text-gray-600">This Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+45%</div>
                      <div className="text-sm text-gray-600">vs Last Month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recycling Centers */}
            <Card>
              <CardHeader>
                <CardTitle>Partner Recycling Centers</CardTitle>
                <CardDescription>Find recycling centers near you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search recycling centers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCenters.map((center) => (
                    <Card key={center.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{center.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{center.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{center.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <span className="text-blue-600 font-medium">{center.distance}km away</span>
                          <span>•</span>
                          <span>{center.operatingHours}</span>
                        </div>

                        <div className="mb-3">
                          <span className="text-sm text-gray-600">Accepted:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {center.acceptedMaterials.map((material) => (
                              <Badge key={material} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full" size="sm">
                          Get Directions
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Recyclers</CardTitle>
                    <CardDescription>Monthly recycling leaderboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboardData.map((entry) => (
                        <div 
                          key={entry.id} 
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            entry.name === "You" 
                              ? "bg-blue-50 border-2 border-blue-200" 
                              : entry.rank <= 3 
                                ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200" 
                                : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              entry.rank === 1 ? "bg-yellow-400 text-white" :
                              entry.rank === 2 ? "bg-gray-400 text-white" :
                              entry.rank === 3 ? "bg-orange-400 text-white" :
                              "bg-gray-200 text-gray-700"
                            }`}>
                              {entry.rank}
                            </div>
                            <div>
                              <h4 className={`font-medium ${entry.name === "You" ? "text-blue-600" : ""}`}>
                                {entry.name}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Scale className="w-4 h-4" />
                                <span>{entry.amount}kg recycled</span>
                                {getTrendIcon(entry.trend)}
                              </div>
                            </div>
                          </div>
                          {entry.rank <= 3 && (
                            <Trophy className={`w-6 h-6 ${
                              entry.rank === 1 ? "text-yellow-500" :
                              entry.rank === 2 ? "text-gray-500" :
                              "text-orange-500"
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Stats</CardTitle>
                    <CardDescription>Your recycling performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">#{myStats.rank}</div>
                      <div className="text-sm text-gray-600">Current Rank</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>To reach top 10:</span>
                        <span className="font-medium">9.2kg more</span>
                      </div>
                      <Progress value={(myStats.totalRecycled / 28.1) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>To reach top 5:</span>
                        <span className="font-medium">5.4kg more</span>
                      </div>
                      <Progress value={(myStats.totalRecycled / 24.3) * 100} className="h-2" />
                    </div>

                    <Button className="w-full mt-4">
                      <Recycle className="w-4 h-4 mr-2" />
                      Recycle Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Impact</CardTitle>
                    <CardDescription>Together we're making a difference</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-blue-600" />
                      <div>
                        <div className="font-medium">2,847 Active Users</div>
                        <div className="text-sm text-gray-600">This month</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Recycle className="w-8 h-8 text-green-600" />
                      <div>
                        <div className="font-medium">12,450 kg Recycled</div>
                        <div className="text-sm text-gray-600">This month</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                      <div>
                        <div className="font-medium">25.8 tons CO₂ Offset</div>
                        <div className="text-sm text-gray-600">Environmental impact</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className={`hover:shadow-lg transition-all ${
                    badge.earned 
                      ? "bg-gradient-to-br from-green-50 to-blue-50 border-green-200" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl ${
                      badge.earned ? "bg-green-100" : "bg-gray-200"
                    }`}>
                      {badge.icon}
                    </div>
                    <CardTitle className={`text-lg ${
                      badge.earned ? "text-green-800" : "text-gray-600"
                    }`}>
                      {badge.name}
                    </CardTitle>
                    <CardDescription>{badge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {badge.progress !== undefined && badge.target !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress:</span>
                          <span className="font-medium">{badge.progress} / {badge.target}</span>
                        </div>
                        <Progress value={(badge.progress / badge.target) * 100} className="h-2" />
                      </div>
                    )}
                    
                    <div className="text-center">
                      {badge.earned ? (
                        <Badge className="bg-green-600 hover:bg-green-700">
                          <Award className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Locked
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How to Earn Badges</CardTitle>
                <CardDescription>Tips for unlocking achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-green-800">Recycling Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        Recycle regularly to build streaks
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        Focus on plastic for higher impact
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        Visit different recycling centers
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-blue-800">Community Goals</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        Help friends join the platform
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        Compete in monthly challenges
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        Share your achievements
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}