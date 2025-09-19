"use client"
import React, { useState } from 'react';
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "/components/ui/label";

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  image: string;
  amenities: string[];
  description: string;
  starRating: number;
}

const BookingClone: React.FC = () => {
  const [searchDestination, setSearchDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [priceRange, setPriceRange] = useState('all');
  const [starFilter, setStarFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const hotels: Hotel[] = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Downtown Manhattan, New York",
      rating: 9.2,
      reviewCount: 1847,
      price: 299,
      originalPrice: 399,
      image: "undefined/400x250?prompt=Luxury hotel exterior with grand entrance, marble columns, and elegant facade in downtown Manhattan&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn",
      amenities: ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar"],
      description: "Luxurious 5-star hotel in the heart of Manhattan with stunning city views.",
      starRating: 5
    },
    {
      id: 2,
      name: "Seaside Resort & Spa",
      location: "Miami Beach, Florida",
      rating: 8.9,
      reviewCount: 923,
      price: 189,
      originalPrice: 249,
      image: "undefined/400x250?prompt=Beachfront resort with palm trees, white sand beach, and turquoise ocean view in Miami Beach&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn",
      amenities: ["Beach Access", "Pool", "Spa", "Restaurant", "Water Sports"],
      description: "Tropical paradise with direct beach access and world-class amenities.",
      starRating: 4
    },
    {
      id: 3,
      name: "Mountain Lodge Retreat",
      location: "Aspen, Colorado",
      rating: 9.0,
      reviewCount: 654,
      price: 245,
      image: "undefined/400x250?prompt=Rustic mountain lodge with snow-capped peaks, wooden architecture, and cozy fireplace atmosphere in Aspen&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn",
      amenities: ["Ski Access", "Fireplace", "Mountain Views", "Restaurant", "Spa"],
      description: "Cozy mountain retreat perfect for skiing and outdoor adventures.",
      starRating: 4
    },
    {
      id: 4,
      name: "City Center Business Hotel",
      location: "Financial District, San Francisco",
      rating: 8.5,
      reviewCount: 1234,
      price: 179,
      originalPrice: 229,
      image: "undefined/400x250?prompt=Modern business hotel with glass facade, contemporary lobby, and city skyline views in San Francisco financial district&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn",
      amenities: ["Free WiFi", "Business Center", "Gym", "Restaurant", "Meeting Rooms"],
      description: "Modern business hotel with convenient location and professional amenities.",
      starRating: 4
    },
    {
      id: 5,
      name: "Historic Boutique Inn",
      location: "French Quarter, New Orleans",
      rating: 8.7,
      reviewCount: 789,
      price: 159,
      image: "undefined/400x250?prompt=Historic boutique hotel with wrought iron balconies, brick facade, and charming courtyard in New Orleans French Quarter&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn",
      amenities: ["Historic Charm", "Courtyard", "Restaurant", "Bar", "Free WiFi"],
      description: "Charming historic inn in the heart of the vibrant French Quarter.",
      starRating: 3
    },
    {
      id: 6,
      name: "Desert Oasis Resort",
      location: "Scottsdale, Arizona",
      rating: 9.1,
      reviewCount: 567,
      price: 219,
      image: "undefined/400x250?prompt=Luxury desert resort with infinity pool, palm trees, and mountain backdrop in Arizona desert landscape&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn",
      amenities: ["Pool", "Spa", "Golf Course", "Desert Views", "Restaurant", "Tennis"],
      description: "Luxurious desert resort with stunning landscapes and premium amenities.",
      starRating: 5
    }
  ];

  const filteredHotels = hotels.filter(hotel => {
    if (priceRange !== 'all') {
      if (priceRange === 'budget' && hotel.price > 150) return false;
      if (priceRange === 'mid' && (hotel.price < 150 || hotel.price > 250)) return false;
      if (priceRange === 'luxury' && hotel.price < 250) return false;
    }
    if (starFilter !== 'all') {
      if (starFilter === '3' && hotel.starRating !== 3) return false;
      if (starFilter === '4' && hotel.starRating !== 4) return false;
      if (starFilter === '5' && hotel.starRating !== 5) return false;
    }
    return true;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
    ));
  };

  if (selectedHotel) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
              onClick={() => setSelectedHotel(null)}
            >
              ← Back to Results
            </Button>
            <h1 className="text-3xl font-bold">{selectedHotel.name}</h1>
            <p className="text-primary-foreground/80">{selectedHotel.location}</p>
          </div>
        </header>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img 
                src={selectedHotel.image} 
                alt="Detailed view of luxury hotel showing elegant interior design with premium furnishings and sophisticated ambiance"
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>About this property</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{selectedHotel.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedHotel.starRating)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                        {selectedHotel.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({selectedHotel.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedHotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Reserve your stay</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${selectedHotel.price}</span>
                    <span className="text-sm text-muted-foreground">per night</span>
                  </div>
                  
                  {selectedHotel.originalPrice && (
                    <div className="text-sm text-muted-foreground">
                      <span className="line-through">${selectedHotel.originalPrice}</span>
                      <span className="text-green-600 ml-2">
                        Save ${selectedHotel.originalPrice - selectedHotel.price}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="checkin">Check-in</Label>
                      <Input 
                        id="checkin"
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="checkout">Check-out</Label>
                      <Input 
                        id="checkout"
                        type="date" 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="guests-detail">Guests</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger id="guests-detail">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Reserve Now
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Free cancellation until 24 hours before check-in
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Find your perfect stay</h1>
          
          {/* Search Form */}
          <Card className="bg-background text-foreground">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Where are you going?"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="checkin-search">Check-in</Label>
                  <Input
                    id="checkin-search"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="checkout-search">Check-out</Label>
                  <Input
                    id="checkout-search"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="guests-search">Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger id="guests-search">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="mt-4 w-full md:w-auto">
                Search Hotels
              </Button>
            </CardContent>
          </Card>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filter by:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="price-filter">Price Range</Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger id="price-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All prices</SelectItem>
                      <SelectItem value="budget">Budget (under $150)</SelectItem>
                      <SelectItem value="mid">Mid-range ($150-$250)</SelectItem>
                      <SelectItem value="luxury">Luxury ($250+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="star-filter">Star Rating</Label>
                  <Select value={starFilter} onValueChange={setStarFilter}>
                    <SelectTrigger id="star-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ratings</SelectItem>
                      <SelectItem value="3">3 stars</SelectItem>
                      <SelectItem value="4">4 stars</SelectItem>
                      <SelectItem value="5">5 stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotel Results */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {sortedHotels.length} properties found
              </h2>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price (low to high)</SelectItem>
                  <SelectItem value="price-high">Price (high to low)</SelectItem>
                  <SelectItem value="rating">Guest rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {/* Hotel Card 1 */}
              {sortedHotels.length > 0 && (
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => setSelectedHotel(sortedHotels[0])}>
                  <div className="flex flex-col md:flex-row">
                    <img 
                      src="undefined/300x200?prompt=Luxury hotel exterior with grand entrance, marble columns, and elegant facade in downtown Manhattan&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn"
                      alt="Grand Palace Hotel exterior showing luxurious entrance with marble columns and elegant architecture"
                      className="w-full md:w-80 h-48 object-cover"
                    />
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{sortedHotels[0].name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(sortedHotels[0].starRating)}
                          </div>
                          <p className="text-muted-foreground mb-2">{sortedHotels[0].location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                              {sortedHotels[0].rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({sortedHotels[0].reviewCount} reviews)
                            </span>
                          </div>
                          <div className="text-right">
                            {sortedHotels[0].originalPrice && (
                              <span className="text-sm text-muted-foreground line-through block">
                                ${sortedHotels[0].originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold">${sortedHotels[0].price}</span>
                            <span className="text-sm text-muted-foreground block">per night</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sortedHotels[0].amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        View Details
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Hotel Card 2 */}
              {sortedHotels.length > 1 && (
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => setSelectedHotel(sortedHotels[1])}>
                  <div className="flex flex-col md:flex-row">
                    <img 
                      src="undefined/300x200?prompt=Beachfront resort with palm trees, white sand beach, and turquoise ocean view in Miami Beach&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn"
                      alt="Seaside Resort & Spa showing tropical beachfront with palm trees and crystal clear ocean waters"
                      className="w-full md:w-80 h-48 object-cover"
                    />
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{sortedHotels[1].name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(sortedHotels[1].starRating)}
                          </div>
                          <p className="text-muted-foreground mb-2">{sortedHotels[1].location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                              {sortedHotels[1].rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({sortedHotels[1].reviewCount} reviews)
                            </span>
                          </div>
                          <div className="text-right">
                            {sortedHotels[1].originalPrice && (
                              <span className="text-sm text-muted-foreground line-through block">
                                ${sortedHotels[1].originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold">${sortedHotels[1].price}</span>
                            <span className="text-sm text-muted-foreground block">per night</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sortedHotels[1].amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        View Details
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Hotel Card 3 */}
              {sortedHotels.length > 2 && (
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => setSelectedHotel(sortedHotels[2])}>
                  <div className="flex flex-col md:flex-row">
                    <img 
                      src="undefined/300x200?prompt=Rustic mountain lodge with snow-capped peaks, wooden architecture, and cozy fireplace atmosphere in Aspen&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn"
                      alt="Mountain Lodge Retreat featuring rustic wooden architecture with snow-covered peaks and cozy mountain ambiance"
                      className="w-full md:w-80 h-48 object-cover"
                    />
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{sortedHotels[2].name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(sortedHotels[2].starRating)}
                          </div>
                          <p className="text-muted-foreground mb-2">{sortedHotels[2].location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                              {sortedHotels[2].rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({sortedHotels[2].reviewCount} reviews)
                            </span>
                          </div>
                          <div className="text-right">
                            {sortedHotels[2].originalPrice && (
                              <span className="text-sm text-muted-foreground line-through block">
                                ${sortedHotels[2].originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold">${sortedHotels[2].price}</span>
                            <span className="text-sm text-muted-foreground block">per night</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sortedHotels[2].amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        View Details
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Hotel Card 4 */}
              {sortedHotels.length > 3 && (
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => setSelectedHotel(sortedHotels[3])}>
                  <div className="flex flex-col md:flex-row">
                    <img 
                      src="undefined/300x200?prompt=Modern business hotel with glass facade, contemporary lobby, and city skyline views in San Francisco financial district&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn"
                      alt="City Center Business Hotel showcasing modern glass architecture with contemporary design and urban skyline backdrop"
                      className="w-full md:w-80 h-48 object-cover"
                    />
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{sortedHotels[3].name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(sortedHotels[3].starRating)}
                          </div>
                          <p className="text-muted-foreground mb-2">{sortedHotels[3].location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                              {sortedHotels[3].rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({sortedHotels[3].reviewCount} reviews)
                            </span>
                          </div>
                          <div className="text-right">
                            {sortedHotels[3].originalPrice && (
                              <span className="text-sm text-muted-foreground line-through block">
                                ${sortedHotels[3].originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold">${sortedHotels[3].price}</span>
                            <span className="text-sm text-muted-foreground block">per night</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sortedHotels[3].amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        View Details
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Hotel Card 5 */}
              {sortedHotels.length > 4 && (
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => setSelectedHotel(sortedHotels[4])}>
                  <div className="flex flex-col md:flex-row">
                    <img 
                      src="undefined/300x200?prompt=Historic boutique hotel with wrought iron balconies, brick facade, and charming courtyard in New Orleans French Quarter&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn"
                      alt="Historic Boutique Inn displaying classic French Quarter architecture with ornate wrought iron balconies and vintage charm"
                      className="w-full md:w-80 h-48 object-cover"
                    />
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{sortedHotels[4].name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(sortedHotels[4].starRating)}
                          </div>
                          <p className="text-muted-foreground mb-2">{sortedHotels[4].location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                              {sortedHotels[4].rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({sortedHotels[4].reviewCount} reviews)
                            </span>
                          </div>
                          <div className="text-right">
                            {sortedHotels[4].originalPrice && (
                              <span className="text-sm text-muted-foreground line-through block">
                                ${sortedHotels[4].originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold">${sortedHotels[4].price}</span>
                            <span className="text-sm text-muted-foreground block">per night</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sortedHotels[4].amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        View Details
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Hotel Card 6 */}
              {sortedHotels.length > 5 && (
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => setSelectedHotel(sortedHotels[5])}>
                  <div className="flex flex-col md:flex-row">
                    <img 
                      src="undefined/300x200?prompt=Luxury desert resort with infinity pool, palm trees, and mountain backdrop in Arizona desert landscape&id=1119eb1f-ca53-49f1-8839-945a66b8d85a&customer_id=cus_SJP9N0JqqPvQNn"
                      alt="Desert Oasis Resort featuring luxury infinity pool with dramatic desert mountain views and palm tree oasis setting"
                      className="w-full md:w-80 h-48 object-cover"
                    />
                    <CardContent className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{sortedHotels[5].name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(sortedHotels[5].starRating)}
                          </div>
                          <p className="text-muted-foreground mb-2">{sortedHotels[5].location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                              {sortedHotels[5].rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({sortedHotels[5].reviewCount} reviews)
                            </span>
                          </div>
                          <div className="text-right">
                            {sortedHotels[5].originalPrice && (
                              <span className="text-sm text-muted-foreground line-through block">
                                ${sortedHotels[5].originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold">${sortedHotels[5].price}</span>
                            <span className="text-sm text-muted-foreground block">per night</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sortedHotels[5].amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        View Details
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              )}

              {sortedHotels.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No hotels match your current filters</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setPriceRange('all');
                      setStarFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingClone;
