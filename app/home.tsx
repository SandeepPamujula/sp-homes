import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Search, Sliders, Home, MapPin, Star } from "lucide-react-native";
import PropertyCard from "../components/PropertyCard";

interface Property {
  id: string;
  image: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  isSmartHome: boolean;
  rating: number;
}

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    bedrooms: 0,
    bathrooms: 0,
    minPrice: 0,
    maxPrice: 10000,
    smartHomeOnly: false,
  });

  // Mock data for property listings
  const properties: Property[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
      price: 2500,
      address: "123 Main St, San Francisco, CA",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      isSmartHome: true,
      rating: 4.8,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80",
      price: 1800,
      address: "456 Oak Ave, Los Angeles, CA",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 1200,
      isSmartHome: false,
      rating: 4.5,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&q=80",
      price: 3200,
      address: "789 Pine Rd, Seattle, WA",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      isSmartHome: true,
      rating: 4.9,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&q=80",
      price: 2200,
      address: "321 Maple Dr, Austin, TX",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      isSmartHome: false,
      rating: 4.3,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=500&q=80",
      price: 4000,
      address: "555 Cedar Ln, New York, NY",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3000,
      isSmartHome: true,
      rating: 4.7,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&q=80",
      price: 1500,
      address: "888 Birch Blvd, Denver, CO",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 900,
      isSmartHome: false,
      rating: 4.2,
    },
  ];

  const handlePropertyPress = (id: string) => {
    router.push(`/property/${id}`);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const updateFilter = (key: keyof typeof filters, value: number | boolean) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredProperties = properties.filter((property) => {
    // Filter by search query (address)
    if (
      searchQuery &&
      !property.address.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by bedrooms
    if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) {
      return false;
    }

    // Filter by bathrooms
    if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) {
      return false;
    }

    // Filter by price range
    if (
      property.price < filters.minPrice ||
      property.price > filters.maxPrice
    ) {
      return false;
    }

    // Filter by smart home
    if (filters.smartHomeOnly && !property.isSmartHome) {
      return false;
    }

    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        <View className="p-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                Find Your
              </Text>
              <Text className="text-2xl font-bold text-blue-600">
                Dream Home
              </Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              onPress={() => router.push("/profile")}
            >
              <Image
                source="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                className="w-8 h-8 rounded-full"
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-100 rounded-full p-3 mb-4">
            <Search size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Search by location or zipcode"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={toggleFilters}>
              <Sliders size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          {/* Filters */}
          {showFilters && (
            <View className="bg-gray-50 p-4 rounded-lg mb-4">
              <Text className="text-lg font-semibold mb-3 text-gray-800">
                Filters
              </Text>

              {/* Bedrooms Filter */}
              <View className="mb-3">
                <Text className="text-gray-600 mb-2">Bedrooms</Text>
                <View className="flex-row">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <TouchableOpacity
                      key={`bed-${num}`}
                      className={`mr-2 px-3 py-1 rounded-full ${filters.bedrooms === num ? "bg-blue-500" : "bg-gray-200"}`}
                      onPress={() => updateFilter("bedrooms", num)}
                    >
                      <Text
                        className={`${filters.bedrooms === num ? "text-white" : "text-gray-800"}`}
                      >
                        {num === 0 ? "Any" : num}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Bathrooms Filter */}
              <View className="mb-3">
                <Text className="text-gray-600 mb-2">Bathrooms</Text>
                <View className="flex-row">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <TouchableOpacity
                      key={`bath-${num}`}
                      className={`mr-2 px-3 py-1 rounded-full ${filters.bathrooms === num ? "bg-blue-500" : "bg-gray-200"}`}
                      onPress={() => updateFilter("bathrooms", num)}
                    >
                      <Text
                        className={`${filters.bathrooms === num ? "text-white" : "text-gray-800"}`}
                      >
                        {num === 0 ? "Any" : num}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Range Filter */}
              <View className="mb-3">
                <Text className="text-gray-600 mb-2">Price Range</Text>
                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className={`px-3 py-1 rounded-full bg-gray-200`}
                    onPress={() =>
                      updateFilter(
                        "minPrice",
                        filters.minPrice === 0 ? 1000 : 0,
                      )
                    }
                  >
                    <Text className="text-gray-800">${filters.minPrice}</Text>
                  </TouchableOpacity>
                  <Text className="text-gray-600">to</Text>
                  <TouchableOpacity
                    className={`px-3 py-1 rounded-full bg-gray-200`}
                    onPress={() =>
                      updateFilter(
                        "maxPrice",
                        filters.maxPrice === 10000 ? 5000 : 10000,
                      )
                    }
                  >
                    <Text className="text-gray-800">${filters.maxPrice}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Smart Home Filter */}
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() =>
                  updateFilter("smartHomeOnly", !filters.smartHomeOnly)
                }
              >
                <View
                  className={`w-5 h-5 rounded mr-2 ${filters.smartHomeOnly ? "bg-blue-500" : "bg-gray-300"}`}
                />
                <Text className="text-gray-700">Smart Home Only</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Featured Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Featured Properties
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-500">See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {properties
                .filter((p) => p.rating >= 4.5)
                .map((property) => (
                  <TouchableOpacity
                    key={`featured-${property.id}`}
                    className="mr-4 w-300 bg-white rounded-xl overflow-hidden shadow-sm"
                    onPress={() => handlePropertyPress(property.id)}
                  >
                    <Image
                      source={property.image}
                      className="w-300 h-150 rounded-t-xl"
                      contentFit="cover"
                    />
                    <View className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex-row items-center">
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <Text className="text-xs font-semibold ml-1">
                        {property.rating}
                      </Text>
                    </View>
                    {property.isSmartHome && (
                      <View className="absolute top-2 left-2 bg-blue-500 px-2 py-1 rounded-full">
                        <Text className="text-xs text-white">Smart Home</Text>
                      </View>
                    )}
                    <View className="p-3">
                      <Text className="text-xl font-bold text-gray-800">
                        ${property.price}/mo
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <MapPin size={14} color="#6b7280" />
                        <Text
                          className="text-gray-600 text-sm ml-1"
                          numberOfLines={1}
                        >
                          {property.address}
                        </Text>
                      </View>
                      <View className="flex-row mt-2">
                        <View className="flex-row items-center mr-3">
                          <Home size={14} color="#6b7280" />
                          <Text className="text-gray-600 text-sm ml-1">
                            {property.bedrooms} bd
                          </Text>
                        </View>
                        <View className="flex-row items-center mr-3">
                          <Text className="text-gray-600 text-sm">
                            {property.bathrooms} ba
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Text className="text-gray-600 text-sm">
                            {property.sqft} sqft
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* Property Listings */}
          <View>
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              All Properties
            </Text>

            {filteredProperties.length === 0 ? (
              <View className="items-center justify-center py-8">
                <Text className="text-gray-500">
                  No properties match your search criteria
                </Text>
              </View>
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {filteredProperties.map((property) => (
                  <View key={property.id} className="mb-4 w-[48%]">
                    <PropertyCard
                      id={property.id}
                      image={property.image}
                      price={property.price}
                      address={property.address}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      sqft={property.sqft}
                      isSmartHome={property.isSmartHome}
                      onPress={() => handlePropertyPress(property.id)}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
