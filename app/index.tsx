import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { Search, Sliders, Home, Wifi } from "lucide-react-native";
import { Button } from "@/components/ui/Button";

// Mock data for property listings
const MOCK_PROPERTIES = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Main St, San Francisco, CA",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    isSmartHome: true,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
  },
  {
    id: "2",
    title: "Cozy Suburban House",
    address: "456 Oak Ave, San Jose, CA",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    isSmartHome: false,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
  },
  {
    id: "3",
    title: "Luxury Condo with View",
    address: "789 Park Blvd, Oakland, CA",
    price: 3800,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    isSmartHome: true,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80",
  },
];

const PropertyCard = ({
  property,
}: {
  property: (typeof MOCK_PROPERTIES)[0];
}) => {
  return (
    <Pressable className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-200">
      <View className="relative">
        <Image
          source={{ uri: property.image }}
          className="w-full h-48"
          contentFit="cover"
        />
        {property.isSmartHome && (
          <View className="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
            <Wifi size={16} color="white" />
          </View>
        )}
      </View>
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-900">
          {property.title}
        </Text>
        <Text className="text-sm text-gray-500 mb-2">{property.address}</Text>
        <Text className="text-xl font-bold text-blue-600 mb-2">
          ${property.price}/mo
        </Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">{property.bedrooms} beds</Text>
          <Text className="text-gray-700">{property.bathrooms} baths</Text>
          <Text className="text-gray-700">{property.sqft} sqft</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white pt-12 pb-4 px-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 mb-4">SP-Homes</Text>
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Search size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-900"
            placeholder="Search by city, zip code, or address"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable onPress={() => setShowFilters(!showFilters)}>
            <Sliders size={20} color="#6b7280" />
          </Pressable>
        </View>

        {showFilters && (
          <View className="mt-4 p-4 bg-gray-100 rounded-lg">
            <Text className="font-bold text-gray-900 mb-2">Filters</Text>
            <View className="flex-row flex-wrap gap-2 mb-2">
              <Button variant="outline" size="sm">
                1+ Bed
              </Button>
              <Button variant="outline" size="sm">
                2+ Bed
              </Button>
              <Button variant="outline" size="sm">
                3+ Bed
              </Button>
            </View>
            <View className="flex-row flex-wrap gap-2 mb-2">
              <Button variant="outline" size="sm">
                1+ Bath
              </Button>
              <Button variant="outline" size="sm">
                2+ Bath
              </Button>
            </View>
            <View className="flex-row flex-wrap gap-2 mb-2">
              <Button variant="outline" size="sm">
                $1000-2000
              </Button>
              <Button variant="outline" size="sm">
                $2000-3000
              </Button>
              <Button variant="outline" size="sm">
                $3000+
              </Button>
            </View>
            <View className="flex-row flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Wifi size={16} color="#4b5563" />}
              >
                Smart Home
              </Button>
            </View>
          </View>
        )}
      </View>

      <FlatList
        data={MOCK_PROPERTIES}
        renderItem={({ item }) => <PropertyCard property={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
      />
    </View>
  );
}
