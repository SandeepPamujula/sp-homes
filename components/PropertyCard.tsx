import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Home, Wifi } from "lucide-react-native";

interface PropertyCardProps {
  id: string;
  image: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  isSmartHome: boolean;
  address?: string;
}

const PropertyCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=75",
  price = 1500,
  bedrooms = 2,
  bathrooms = 2,
  squareFootage = 1200,
  isSmartHome = true,
  address = "123 Main St, Anytown, USA",
}: PropertyCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/property/${id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white rounded-lg overflow-hidden shadow-md w-[180px] h-[250px] m-2"
    >
      <Image
        source={{ uri: image }}
        className="w-full h-[120px]"
        contentFit="cover"
      />

      <View className="p-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-gray-800">${price}/mo</Text>
          {isSmartHome && (
            <View className="bg-blue-100 p-1 rounded-full">
              <Wifi size={16} color="#3b82f6" />
            </View>
          )}
        </View>

        <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
          {address}
        </Text>

        <View className="flex-row justify-between mt-2">
          <View className="flex-row items-center">
            <Home size={14} color="#6b7280" />
            <Text className="text-xs text-gray-600 ml-1">{bedrooms} bd</Text>
          </View>
          <Text className="text-xs text-gray-600">{bathrooms} ba</Text>
          <Text className="text-xs text-gray-600">{squareFootage} sqft</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyCard;
