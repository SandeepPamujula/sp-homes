import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Home,
  DollarSign,
  FileText,
  MessageSquare,
  Settings,
  Bell,
} from "lucide-react-native";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  // Mock data for dashboard
  const propertyData = {
    address: "123 Smart Home Ave, San Francisco, CA 94105",
    rent: 2500,
    dueDate: "2023-06-01",
    leaseEnd: "2024-05-31",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  };

  const maintenanceRequests = [
    {
      id: 1,
      title: "Leaking Faucet",
      status: "In Progress",
      date: "2023-05-15",
    },
    { id: 2, title: "AC Repair", status: "Scheduled", date: "2023-05-20" },
  ];

  const paymentHistory = [
    { id: 1, amount: 2500, date: "2023-05-01", status: "Paid" },
    { id: 2, amount: 2500, date: "2023-04-01", status: "Paid" },
    { id: 3, amount: 2500, date: "2023-03-01", status: "Paid" },
  ];

  const notifications = [
    {
      id: 1,
      message: "Your maintenance request has been updated",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Rent payment reminder: Due in 5 days",
      time: "1 day ago",
    },
    { id: 3, message: "New community announcement", time: "3 days ago" },
  ];

  const renderHomeTab = () => (
    <View className="space-y-6">
      <View className="bg-white rounded-xl overflow-hidden shadow-md">
        <Image
          source={{ uri: propertyData.image }}
          className="w-full h-48"
          contentFit="cover"
        />
        <View className="p-4 space-y-2">
          <Text className="text-lg font-bold">Current Rental</Text>
          <Text className="text-gray-700">{propertyData.address}</Text>
          <View className="flex-row justify-between mt-2">
            <View>
              <Text className="text-gray-500">Monthly Rent</Text>
              <Text className="text-lg font-semibold">
                ${propertyData.rent}
              </Text>
            </View>
            <View>
              <Text className="text-gray-500">Next Payment</Text>
              <Text className="text-lg font-semibold">June 1, 2023</Text>
            </View>
          </View>
          <View className="mt-4">
            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-lg items-center"
              onPress={() => console.log("Pay rent")}
            >
              <Text className="text-white font-semibold">Pay Rent</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-xl p-4 shadow-md">
        <Text className="text-lg font-bold mb-3">Quick Actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="items-center space-y-1 w-1/4"
            onPress={() => console.log("Submit maintenance request")}
          >
            <View className="bg-blue-100 p-3 rounded-full">
              <FileText size={24} color="#3b82f6" />
            </View>
            <Text className="text-xs text-center">Maintenance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center space-y-1 w-1/4"
            onPress={() => console.log("View ledger")}
          >
            <View className="bg-green-100 p-3 rounded-full">
              <DollarSign size={24} color="#10b981" />
            </View>
            <Text className="text-xs text-center">Ledger</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center space-y-1 w-1/4"
            onPress={() => console.log("Contact support")}
          >
            <View className="bg-purple-100 p-3 rounded-full">
              <MessageSquare size={24} color="#8b5cf6" />
            </View>
            <Text className="text-xs text-center">Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center space-y-1 w-1/4"
            onPress={() => console.log("Open settings")}
          >
            <View className="bg-gray-100 p-3 rounded-full">
              <Settings size={24} color="#6b7280" />
            </View>
            <Text className="text-xs text-center">Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-xl p-4 shadow-md">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold">Recent Notifications</Text>
          <TouchableOpacity>
            <Text className="text-blue-500">See All</Text>
          </TouchableOpacity>
        </View>

        {notifications.map((notification) => (
          <View key={notification.id} className="py-3 border-b border-gray-100">
            <Text className="font-medium">{notification.message}</Text>
            <Text className="text-gray-500 text-sm">{notification.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPaymentsTab = () => (
    <View className="space-y-6">
      <View className="bg-white rounded-xl p-4 shadow-md">
        <Text className="text-lg font-bold mb-3">Payment Summary</Text>
        <View className="flex-row justify-between items-center bg-blue-50 p-4 rounded-lg mb-4">
          <View>
            <Text className="text-gray-600">Next Payment</Text>
            <Text className="text-xl font-bold">${propertyData.rent}</Text>
            <Text className="text-gray-500">Due on June 1, 2023</Text>
          </View>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={() => console.log("Pay now")}
          >
            <Text className="text-white font-semibold">Pay Now</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold mb-3">Payment History</Text>
        {paymentHistory.map((payment) => (
          <View
            key={payment.id}
            className="flex-row justify-between py-3 border-b border-gray-100"
          >
            <View>
              <Text className="font-medium">${payment.amount}</Text>
              <Text className="text-gray-500">{payment.date}</Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full self-center">
              <Text className="text-green-700">{payment.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMaintenanceTab = () => (
    <View className="space-y-6">
      <View className="bg-white rounded-xl p-4 shadow-md">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Maintenance Requests</Text>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={() => console.log("New request")}
          >
            <Text className="text-white font-semibold">New Request</Text>
          </TouchableOpacity>
        </View>

        {maintenanceRequests.length > 0 ? (
          maintenanceRequests.map((request) => (
            <TouchableOpacity
              key={request.id}
              className="bg-gray-50 p-4 rounded-lg mb-3"
              onPress={() => console.log(`View request ${request.id}`)}
            >
              <View className="flex-row justify-between">
                <Text className="font-bold">{request.title}</Text>
                <View
                  className={`px-2 py-1 rounded-full ${request.status === "In Progress" ? "bg-yellow-100" : "bg-blue-100"}`}
                >
                  <Text
                    className={`${request.status === "In Progress" ? "text-yellow-700" : "text-blue-700"} text-xs`}
                  >
                    {request.status}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 mt-1">
                Submitted: {request.date}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center py-8">
            <Text className="text-gray-500">No maintenance requests</Text>
          </View>
        )}
      </View>

      <View className="bg-white rounded-xl p-4 shadow-md">
        <Text className="text-lg font-bold mb-3">Common Issues</Text>
        <TouchableOpacity className="py-3 border-b border-gray-100">
          <Text className="font-medium">Plumbing Issues</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3 border-b border-gray-100">
          <Text className="font-medium">Electrical Problems</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3 border-b border-gray-100">
          <Text className="font-medium">HVAC Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3">
          <Text className="font-medium">Appliance Repair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <View className="px-4 py-3 bg-white shadow-sm">
          <Text className="text-2xl font-bold">Tenant Dashboard</Text>
        </View>

        <ScrollView className="flex-1 px-4 pt-4 pb-20">
          {activeTab === "home" && renderHomeTab()}
          {activeTab === "payments" && renderPaymentsTab()}
          {activeTab === "maintenance" && renderMaintenanceTab()}
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex-row justify-around">
          <TouchableOpacity
            className={`items-center px-3 py-2 ${activeTab === "home" ? "bg-blue-50 rounded-lg" : ""}`}
            onPress={() => setActiveTab("home")}
          >
            <Home
              size={24}
              color={activeTab === "home" ? "#3b82f6" : "#6b7280"}
            />
            <Text
              className={
                activeTab === "home" ? "text-blue-500" : "text-gray-500"
              }
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`items-center px-3 py-2 ${activeTab === "payments" ? "bg-blue-50 rounded-lg" : ""}`}
            onPress={() => setActiveTab("payments")}
          >
            <DollarSign
              size={24}
              color={activeTab === "payments" ? "#3b82f6" : "#6b7280"}
            />
            <Text
              className={
                activeTab === "payments" ? "text-blue-500" : "text-gray-500"
              }
            >
              Payments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`items-center px-3 py-2 ${activeTab === "maintenance" ? "bg-blue-50 rounded-lg" : ""}`}
            onPress={() => setActiveTab("maintenance")}
          >
            <FileText
              size={24}
              color={activeTab === "maintenance" ? "#3b82f6" : "#6b7280"}
            />
            <Text
              className={
                activeTab === "maintenance" ? "text-blue-500" : "text-gray-500"
              }
            >
              Maintenance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`items-center px-3 py-2 ${activeTab === "profile" ? "bg-blue-50 rounded-lg" : ""}`}
            onPress={() => setActiveTab("profile")}
          >
            <Settings
              size={24}
              color={activeTab === "profile" ? "#3b82f6" : "#6b7280"}
            />
            <Text
              className={
                activeTab === "profile" ? "text-blue-500" : "text-gray-500"
              }
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
