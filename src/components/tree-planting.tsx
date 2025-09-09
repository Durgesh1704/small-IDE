"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Camera, 
  Upload,
  Search,
  Filter,
  Leaf,
  Award,
  TrendingUp
} from "lucide-react";

interface TreeLocation {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  treesPlanted: number;
  availableSpace: number;
  description: string;
  species: string[];
}

export default function TreePlanting() {
  const [selectedLocation, setSelectedLocation] = useState<TreeLocation | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'plant' | 'my-trees'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  const treeLocations: TreeLocation[] = [
    {
      id: 1,
      name: "Central Park Oak Grove",
      location: { lat: 40.7829, lng: -73.9654 },
      treesPlanted: 150,
      availableSpace: 50,
      description: "Beautiful oak grove in the heart of Central Park",
      species: ["Oak", "Maple", "Birch"]
    },
    {
      id: 2,
      name: "Brooklyn Riverside",
      location: { lat: 40.6892, lng: -73.9442 },
      treesPlanted: 85,
      availableSpace: 75,
      description: "Riverside planting area with stunning views",
      species: ["Willow", "Cherry", "Pine"]
    },
    {
      id: 3,
      name: "Queens Forest Preserve",
      location: { lat: 40.7282, lng: -73.7949 },
      treesPlanted: 120,
      availableSpace: 30,
      description: "Protected forest area for native species",
      species: ["Oak", "Hickory", "Cedar"]
    },
    {
      id: 4,
      name: "Staten Island Greenbelt",
      location: { lat: 40.5795, lng: -74.1502 },
      treesPlanted: 200,
      availableSpace: 100,
      description: "Expansive greenbelt perfect for reforestation",
      species: ["Pine", "Spruce", "Fir"]
    }
  ];

  const myTrees = [
    {
      id: 1,
      species: "Oak",
      location: "Central Park Oak Grove",
      plantedDate: "2024-01-15",
      status: "GROWING",
      height: "2.5ft",
      carbonOffset: 0.5
    },
    {
      id: 2,
      species: "Cherry",
      location: "Brooklyn Riverside",
      plantedDate: "2024-01-10",
      status: "GROWING",
      height: "1.8ft",
      carbonOffset: 0.3
    },
    {
      id: 3,
      species: "Pine",
      location: "Queens Forest Preserve",
      plantedDate: "2024-01-05",
      status: "VERIFIED",
      height: "3.2ft",
      carbonOffset: 0.8
    }
  ];

  const filteredLocations = treeLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      GROWING: "default",
      VERIFIED: "default",
      PENDING: "secondary"
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const handlePlantTree = () => {
    // This would typically open a modal or navigate to a planting form
    alert("Plant tree functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tree Planting</h1>
            <p className="text-gray-600 mt-1">Plant trees and track their growth</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <Leaf className="w-4 h-4 mr-1" />
              {treeLocations.reduce((sum, loc) => sum + loc.treesPlanted, 0)} Trees Planted
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              2.5 tons CO₂ Offset
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg">
          <Button
            variant={activeTab === 'map' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('map')}
            className="flex-1"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Find Locations
          </Button>
          <Button
            variant={activeTab === 'plant' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('plant')}
            className="flex-1"
          >
            <Sprout className="w-4 h-4 mr-2" />
            Plant Tree
          </Button>
          <Button
            variant={activeTab === 'my-trees' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('my-trees')}
            className="flex-1"
          >
            <Award className="w-4 h-4 mr-2" />
            My Trees
          </Button>
        </div>

        {/* Map View */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Planting Locations</CardTitle>
                  <CardDescription>Click on a location to view details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Map Placeholder */}
                    <div className="bg-gradient-to-br from-green-100 to-blue-100 h-96 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</h3>
                        <p className="text-gray-600">Map integration would be implemented here</p>
                        <div className="mt-4 flex gap-2">
                          {treeLocations.map((location) => (
                            <button
                              key={location.id}
                              onClick={() => setSelectedLocation(location)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedLocation?.id === location.id
                                  ? 'bg-green-600 text-white'
                                  : 'bg-white text-gray-700 border'
                              }`}
                            >
                              {location.name.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {/* Search and Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search Locations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Species
                  </Button>
                </CardContent>
              </Card>

              {/* Selected Location Details */}
              {selectedLocation && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                    <CardDescription>{selectedLocation.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Trees Planted:</span>
                        <div className="font-semibold">{selectedLocation.treesPlanted}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Available Space:</span>
                        <div className="font-semibold">{selectedLocation.availableSpace}</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Available Species:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedLocation.species.map((species) => (
                          <Badge key={species} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handlePlantTree}
                    >
                      <Sprout className="w-4 h-4 mr-2" />
                      Plant Tree Here
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Location List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <Card 
                    key={location.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedLocation?.id === location.id ? 'ring-2 ring-green-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium">{location.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{location.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">{location.treesPlanted} trees</span>
                        <Badge variant="outline">{location.availableSpace} spaces left</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Plant Tree Form */}
        {activeTab === 'plant' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Plant a New Tree</CardTitle>
                <CardDescription>Fill out the form to plant a tree</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <select 
                    id="location" 
                    className="w-full p-2 border rounded-md"
                    defaultValue=""
                  >
                    <option value="">Select a location</option>
                    {treeLocations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="species">Tree Species</Label>
                  <select 
                    id="species" 
                    className="w-full p-2 border rounded-md"
                    defaultValue=""
                  >
                    <option value="">Select species</option>
                    <option value="oak">Oak</option>
                    <option value="maple">Maple</option>
                    <option value="pine">Pine</option>
                    <option value="cherry">Cherry</option>
                    <option value="willow">Willow</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Number of Trees</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="1" 
                    max="10" 
                    defaultValue="1"
                    placeholder="Enter number of trees"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Upload Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any additional information about your tree planting..."
                    rows={3}
                  />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Sprout className="w-4 h-4 mr-2" />
                  Plant Tree
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Planting Guidelines</CardTitle>
                <CardDescription>Important information for tree planting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Choose the Right Location</h4>
                      <p className="text-sm text-gray-600">Select a location with proper soil conditions and sunlight.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Select Native Species</h4>
                      <p className="text-sm text-gray-600">Choose tree species that are native to the area for better survival.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Document Your Planting</h4>
                      <p className="text-sm text-gray-600">Take photos and provide accurate location data for verification.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Maintain Your Tree</h4>
                      <p className="text-sm text-gray-600">Regular watering and care ensure healthy growth.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Carbon Impact</h4>
                  <p className="text-sm text-green-700">
                    Each tree you plant will offset approximately 0.5 tons of CO₂ over its lifetime. 
                    You'll receive carbon credits once your tree is verified.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Trees */}
        {activeTab === 'my-trees' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Trees</CardTitle>
                  <Sprout className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{myTrees.length}</div>
                  <p className="text-xs text-muted-foreground">+2 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CO₂ Offset</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {myTrees.reduce((sum, tree) => sum + tree.carbonOffset, 0)} tons
                  </div>
                  <p className="text-xs text-muted-foreground">Lifetime impact</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verified Trees</CardTitle>
                  <Award className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {myTrees.filter(tree => tree.status === 'VERIFIED').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Pending verification</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>My Planted Trees</CardTitle>
                <CardDescription>Track the growth and status of your trees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myTrees.map((tree) => (
                    <div key={tree.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Sprout className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{tree.species} Tree</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{tree.location}</span>
                            <Calendar className="w-4 h-4 ml-2" />
                            <span>{tree.plantedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{tree.height}</div>
                        <div className="text-sm text-gray-600">+{tree.carbonOffset} tons CO₂</div>
                        {getStatusBadge(tree.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}