import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Bed,
  Bath,
  Home,
  Wifi,
  MapPin,
  Star,
  Share2,
} from "lucide-react-native";
import { BlurView } from "expo-blur";
import ApplicationForm from "../../components/ApplicationForm";

const PropertyDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock property data - in a real app, this would be fetched based on the ID
  const property = {
    id: id || "1",
    title: "Modern Smart Home in Downtown",
    address: "123 Main Street, San Francisco, CA 94105",
    price: 2800,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    isSmartHome: true,
    description:
      "This beautiful modern home features an open floor plan, high ceilings, and smart home technology throughout. Enjoy the convenience of a smart lock, thermostat, and lighting system.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    ],
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Covered Parking",
      "In-unit Laundry",
      "Central Air",
      "Pet Friendly",
    ],
    smartFeatures: [
      "Smart Lock",
      "Smart Thermostat",
      "Smart Lighting",
      "Voice Assistant",
      "Security Cameras",
    ],
    rating: 4.8,
    reviews: 24,
  };

  const handleApplyNow = () => {
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
  };

  if (showApplicationForm) {
    return (
      <ApplicationForm propertyId={property.id} onClose={handleCloseForm} />
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Image Carousel */}
      <View className="relative h-72">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className="h-full"
        >
          {property.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              className="w-screen h-full"
              contentFit="cover"
            />
          ))}
        </ScrollView>

        {/* Back button */}
        <TouchableOpacity
          className="absolute top-12 left-4 z-10 p-2 rounded-full bg-black/20"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity className="absolute top-12 right-4 z-10 p-2 rounded-full bg-black/20">
          <Share2 size={24} color="white" />
        </TouchableOpacity>

        {/* Image pagination dots */}
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-2">
          {property.images.map((_, index) => (
            <View key={index} className="h-2 w-2 rounded-full bg-white/70" />
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 bg-white">
        {/* Property Header */}
        <View className="p-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-800">
              {property.title}
            </Text>
            <View className="flex-row items-center">
              <Star size={16} color="#FFD700" />
              <Text className="ml-1 text-gray-700">
                {property.rating} ({property.reviews})
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mt-1">
            <MapPin size={16} color="#6B7280" />
            <Text className="ml-1 text-gray-500">{property.address}</Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <View className="flex-row items-center">
              <Bed size={20} color="#4B5563" />
              <Text className="ml-2 text-gray-700">
                {property.bedrooms} Beds
              </Text>
            </View>
            <View className="flex-row items-center">
              <Bath size={20} color="#4B5563" />
              <Text className="ml-2 text-gray-700">
                {property.bathrooms} Baths
              </Text>
            </View>
            <View className="flex-row items-center">
              <Home size={20} color="#4B5563" />
              <Text className="ml-2 text-gray-700">{property.sqft} sqft</Text>
            </View>
          </View>

          {property.isSmartHome && (
            <View className="flex-row items-center mt-2 bg-blue-50 p-2 rounded-md">
              <Wifi size={18} color="#3B82F6" />
              <Text className="ml-2 text-blue-600 font-medium">Smart Home</Text>
            </View>
          )}

          <View className="mt-4 pb-2 border-b border-gray-200">
            <Text className="text-2xl font-bold text-gray-800">
              ${property.price}
              <Text className="text-lg font-normal text-gray-600">/month</Text>
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row border-b border-gray-200">
          {["details", "amenities", "floor plan", "smart features"].map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                className={`flex-1 py-3 px-2 ${activeTab === tab ? "border-b-2 border-blue-500" : ""}`}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  className={`text-center font-medium ${activeTab === tab ? "text-blue-500" : "text-gray-600"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        {/* Tab Content */}
        <View className="p-4">
          {activeTab === "details" && (
            <View>
              <Text className="text-lg font-semibold mb-2">Description</Text>
              <Text className="text-gray-700 leading-6">
                {property.description}
              </Text>
            </View>
          )}

          {activeTab === "amenities" && (
            <View>
              <Text className="text-lg font-semibold mb-2">Amenities</Text>
              <View className="flex-row flex-wrap">
                {property.amenities.map((amenity, index) => (
                  <View
                    key={index}
                    className="w-1/2 mb-3 flex-row items-center"
                  >
                    <View className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                    <Text className="text-gray-700">{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === "floor plan" && (
            <View className="items-center">
              <Text className="text-lg font-semibold mb-4">Floor Plan</Text>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1580221465976-1c9ea1b9f422?w=800&q=80",
                }}
                className="w-full h-64 rounded-lg"
                contentFit="contain"
              />
              <Text className="mt-4 text-gray-500 text-center">
                Tap to enlarge floor plan
              </Text>
            </View>
          )}

          {activeTab === "smart features" && (
            <View>
              <Text className="text-lg font-semibold mb-2">
                Smart Home Features
              </Text>
              {property.isSmartHome ? (
                <View className="flex-row flex-wrap">
                  {property.smartFeatures.map((feature, index) => (
                    <View
                      key={index}
                      className="w-1/2 mb-3 flex-row items-center"
                    >
                      <Wifi size={16} color="#3B82F6" className="mr-2" />
                      <Text className="text-gray-700">{feature}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-gray-500">
                  This property does not have smart home features.
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Additional space at bottom for the fixed button */}
        <View className="h-24" />
      </ScrollView>

      {/* Fixed Apply Now Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg items-center"
          onPress={handleApplyNow}
        >
          <Text className="text-white font-bold text-lg">Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyDetail;
