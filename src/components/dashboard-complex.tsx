"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Sprout, 
  Recycle, 
  TrendingUp, 
  Award, 
  Wallet, 
  Leaf,
  MapPin,
  Calendar,
  Target
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function Dashboard() {
  // Mock data for demonstration
  const userStats = {
    treesPlanted: 25,
    plasticRecycled: 45.2,
    co2Offset: 2.8,
    earthTokens: 150,
    carbonCredits: 12.5,
    impactScore: 78,
    rank: 15
  };

  const recentActivities = [
    {
      id: 1,
      type: "TREE_PLANTING",
      title: "Oak Tree Planting",
      location: "Central Park, NY",
      date: "2024-01-15",
      carbonOffset: 0.5,
      status: "VERIFIED"
    },
    {
      id: 2,
      type: "PLASTIC_RECYCLING",
      title: "Plastic Bottle Recycling",
      location: "Eco Center, CA",
      date: "2024-01-12",
      carbonOffset: 0.3,
      status: "VERIFIED"
    },
    {
      id: 3,
      type: "TREE_PLANTING",
      title: "Pine Tree Grove",
      location: "Forest Reserve, WA",
      date: "2024-01-10",
      carbonOffset: 0.8,
      status: "PENDING"
    }
  ];

  const monthlyData = [
    { month: "Jan", trees: 5, plastic: 8.5, carbon: 1.2 },
    { month: "Feb", trees: 8, plastic: 12.3, carbon: 1.8 },
    { month: "Mar", trees: 12, plastic: 15.7, carbon: 2.5 },
    { month: "Apr", trees: 15, plastic: 20.1, carbon: 3.2 },
    { month: "May", trees: 20, plastic: 28.9, carbon: 4.1 },
    { month: "Jun", trees: 25, plastic: 45.2, carbon: 5.8 }
  ];

  const badges = [
    { name: "First Tree", icon: "🌱", earned: true },
    { name: "Eco Warrior", icon: "🌟", earned: true },
    { name: "Recycling Hero", icon: "♻️", earned: true },
    { name: "Carbon Master", icon: "🏆", earned: false },
    { name: "Community Leader", icon: "👥", earned: false },
    { name: "Earth Guardian", icon: "🌍", earned: false }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "TREE_PLANTING":
        return <Sprout className="w-5 h-5 text-green-600" />;
      case "PLASTIC_RECYCLING":
        return <Recycle className="w-5 h-5 text-blue-600" />;
      default:
        return <Leaf className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      VERIFIED: "default",
      PENDING: "secondary",
      REJECTED: "destructive"
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Earth Impact</h1>
            <p className="text-gray-600 mt-1">Track your environmental contributions</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Rank #{userStats.rank}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Impact Score: {userStats.impactScore}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
              <Sprout className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{userStats.treesPlanted}</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plastic Recycled</CardTitle>
              <Recycle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userStats.plasticRecycled}kg</div>
              <p className="text-xs text-muted-foreground">+8.5kg from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Offset</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{userStats.co2Offset} tons</div>
              <p className="text-xs text-muted-foreground">+0.8 tons from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{userStats.impactScore}</div>
              <Progress value={userStats.impactScore} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Wallet Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Your Wallet
            </CardTitle>
            <CardDescription>
              Manage your EARTH tokens and carbon credits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">EARTH Tokens</span>
                  <span className="font-bold text-green-600">{userStats.earthTokens}</span>
                </div>
                <Button className="w-full" variant="outline">
                  View Token History
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Carbon Credits</span>
                  <span className="font-bold text-blue-600">{userStats.carbonCredits} tons</span>
                </div>
                <Button className="w-full" variant="outline">
                  Manage Credits
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
              <CardDescription>Your environmental impact over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="trees" stroke="#16a34a" name="Trees" />
                  <Line type="monotone" dataKey="plastic" stroke="#2563eb" name="Plastic (kg)" />
                  <Line type="monotone" dataKey="carbon" stroke="#9333ea" name="CO₂ (tons)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Distribution</CardTitle>
              <CardDescription>Breakdown of your contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData.slice(-3)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="trees" fill="#16a34a" name="Trees" />
                  <Bar dataKey="plastic" fill="#2563eb" name="Plastic (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest environmental actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getActivityIcon(activity.type)}
                    <div>
                      <h4 className="font-medium">{activity.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.location}</span>
                        <Calendar className="w-4 h-4 ml-2" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">+{activity.carbonOffset} tons CO₂</div>
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Achievements</CardTitle>
            <CardDescription>Badges earned for your environmental contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-center ${
                    badge.earned
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 border border-gray-200 opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-medium">{badge.name}</div>
                  {!badge.earned && (
                    <div className="text-xs text-gray-500 mt-1">Locked</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start making a difference today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2 bg-green-600 hover:bg-green-700">
                <Sprout className="w-6 h-6" />
                Plant a Tree
              </Button>
              <Button className="h-20 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                <Recycle className="w-6 h-6" />
                Recycle Plastic
              </Button>
              <Button className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                <Target className="w-6 h-6" />
                Set Goals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}