import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import {
  Check,
  ChevronRight,
  Upload,
  CreditCard,
  FileText,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface ApplicationFormProps {
  propertyId?: string;
  propertyName?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const ApplicationForm = ({
  propertyId = "123",
  propertyName = "Luxury Apartment",
  onSubmit = () => {},
  onCancel = () => {},
}: ApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    ssn: "",

    // Employment Details
    employer: "",
    position: "",
    workPhone: "",
    monthlyIncome: "",
    employmentLength: "",

    // Financial Information
    creditScore: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",

    // Documents
    idDocument: null,
    proofOfIncome: null,

    // Payment
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the application
      onSubmit(formData);
    }
  };

  const handlePrevStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const handleUploadDocument = (documentType: string) => {
    // In a real app, this would open a document picker
    console.log(`Uploading ${documentType}`);
    // Mock document upload
    updateFormData(documentType, "document_placeholder.pdf");
  };

  const handlePaymentSubmit = () => {
    // In a real app, this would process the payment
    console.log("Processing payment");
    handleNextStep();
  };

  const renderStepIndicator = () => {
    return (
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
        {[1, 2, 3, 4, 5].map((step) => (
          <View key={step} className="items-center">
            <View
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? "bg-blue-500" : "bg-gray-300"}`}
            >
              {currentStep > step ? (
                <Check size={16} color="white" />
              ) : (
                <Text className="text-white font-bold">{step}</Text>
              )}
            </View>
            <Text className="text-xs mt-1 text-gray-600">
              {step === 1 && "Personal"}
              {step === 2 && "Employment"}
              {step === 3 && "Financial"}
              {step === 4 && "Documents"}
              {step === 5 && "Review"}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderPersonalInfoStep = () => {
    return (
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">Personal Information</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">First Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.firstName}
            onChangeText={(text) => updateFormData("firstName", text)}
            placeholder="Enter your first name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Last Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.lastName}
            onChangeText={(text) => updateFormData("lastName", text)}
            placeholder="Enter your last name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.email}
            onChangeText={(text) => updateFormData("email", text)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Phone</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.phone}
            onChangeText={(text) => updateFormData("phone", text)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Date of Birth</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.dob}
            onChangeText={(text) => updateFormData("dob", text)}
            placeholder="MM/DD/YYYY"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">
            Social Security Number
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.ssn}
            onChangeText={(text) => updateFormData("ssn", text)}
            placeholder="XXX-XX-XXXX"
            secureTextEntry
          />
        </View>
      </View>
    );
  };

  const renderEmploymentStep = () => {
    return (
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">Employment Details</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Current Employer</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.employer}
            onChangeText={(text) => updateFormData("employer", text)}
            placeholder="Enter your employer name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Position/Title</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.position}
            onChangeText={(text) => updateFormData("position", text)}
            placeholder="Enter your job title"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Work Phone</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.workPhone}
            onChangeText={(text) => updateFormData("workPhone", text)}
            placeholder="Enter your work phone"
            keyboardType="phone-pad"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Monthly Income ($)</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.monthlyIncome}
            onChangeText={(text) => updateFormData("monthlyIncome", text)}
            placeholder="Enter your monthly income"
            keyboardType="numeric"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Length of Employment</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.employmentLength}
            onChangeText={(text) => updateFormData("employmentLength", text)}
            placeholder="Years and months"
          />
        </View>
      </View>
    );
  };

  const renderFinancialStep = () => {
    return (
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">Financial Information</Text>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">
            Credit Score (Estimated)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.creditScore}
            onChangeText={(text) => updateFormData("creditScore", text)}
            placeholder="Enter your credit score"
            keyboardType="numeric"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Bank Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.bankName}
            onChangeText={(text) => updateFormData("bankName", text)}
            placeholder="Enter your bank name"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Account Number</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.accountNumber}
            onChangeText={(text) => updateFormData("accountNumber", text)}
            placeholder="Enter your account number"
            secureTextEntry
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Routing Number</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 bg-white"
            value={formData.routingNumber}
            onChangeText={(text) => updateFormData("routingNumber", text)}
            placeholder="Enter your routing number"
            secureTextEntry
          />
        </View>
      </View>
    );
  };

  const renderDocumentsStep = () => {
    return (
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">Document Upload</Text>

        <View className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <Text className="text-sm font-medium mb-2">Government ID</Text>
          <Text className="text-xs text-gray-500 mb-3">
            Upload a valid government-issued ID (driver's license, passport,
            etc.)
          </Text>

          {formData.idDocument ? (
            <View className="flex-row items-center bg-blue-50 p-3 rounded-md">
              <FileText size={20} color="#3b82f6" />
              <Text className="ml-2 text-blue-600 flex-1">
                ID Document Uploaded
              </Text>
              <TouchableOpacity
                onPress={() => handleUploadDocument("idDocument")}
                className="bg-blue-100 px-3 py-1 rounded-md"
              >
                <Text className="text-blue-600 text-xs">Replace</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleUploadDocument("idDocument")}
              className="flex-row items-center justify-center bg-gray-100 p-4 rounded-md border border-dashed border-gray-300"
            >
              <Upload size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-600">Upload ID Document</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <Text className="text-sm font-medium mb-2">Proof of Income</Text>
          <Text className="text-xs text-gray-500 mb-3">
            Upload recent pay stubs, W-2, or tax returns
          </Text>

          {formData.proofOfIncome ? (
            <View className="flex-row items-center bg-blue-50 p-3 rounded-md">
              <FileText size={20} color="#3b82f6" />
              <Text className="ml-2 text-blue-600 flex-1">
                Income Document Uploaded
              </Text>
              <TouchableOpacity
                onPress={() => handleUploadDocument("proofOfIncome")}
                className="bg-blue-100 px-3 py-1 rounded-md"
              >
                <Text className="text-blue-600 text-xs">Replace</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleUploadDocument("proofOfIncome")}
              className="flex-row items-center justify-center bg-gray-100 p-4 rounded-md border border-dashed border-gray-300"
            >
              <Upload size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-600">Upload Income Document</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderReviewStep = () => {
    return (
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">
          Application Review & Payment
        </Text>

        <View className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <Text className="text-sm font-medium mb-2">Property Information</Text>
          <Text className="text-base">{propertyName}</Text>
          <Text className="text-sm text-gray-500">
            Application ID: {propertyId}-APP
          </Text>
        </View>

        <View className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <Text className="text-sm font-medium mb-2">Application Fee</Text>
          <Text className="text-2xl font-bold">$50.00</Text>
          <Text className="text-xs text-gray-500 mt-1">
            Non-refundable application processing fee
          </Text>
        </View>

        <View className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <Text className="text-sm font-medium mb-2">Payment Information</Text>

          <View className="mb-4">
            <Text className="text-xs mb-1">Card Number</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2"
              value={formData.cardNumber}
              onChangeText={(text) => updateFormData("cardNumber", text)}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
            />
          </View>

          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-xs mb-1">Expiry Date</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={formData.cardExpiry}
                onChangeText={(text) => updateFormData("cardExpiry", text)}
                placeholder="MM/YY"
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-xs mb-1">CVV</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={formData.cardCvv}
                onChangeText={(text) => updateFormData("cardCvv", text)}
                placeholder="123"
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-xs mb-1">Name on Card</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2"
              value={formData.cardName}
              onChangeText={(text) => updateFormData("cardName", text)}
              placeholder="John Doe"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePaymentSubmit}
          className="bg-blue-500 p-4 rounded-md flex-row items-center justify-center mb-4"
        >
          <CreditCard size={20} color="white" />
          <Text className="ml-2 text-white font-bold">
            Pay $50 & Submit Application
          </Text>
        </TouchableOpacity>

        <Text className="text-xs text-gray-500 text-center">
          By submitting this application, you agree to our Terms of Service and
          Privacy Policy. The application fee is non-refundable.
        </Text>
      </View>
    );
  };

  const renderConfirmationStep = () => {
    return (
      <View className="p-4 items-center justify-center">
        <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
          <Check size={32} color="#10b981" />
        </View>

        <Text className="text-xl font-bold mb-2 text-center">
          Application Submitted!
        </Text>
        <Text className="text-base text-gray-600 mb-6 text-center">
          Your application for {propertyName} has been successfully submitted.
        </Text>

        <View className="bg-white p-4 rounded-lg border border-gray-200 w-full mb-6">
          <Text className="text-sm font-medium mb-2">Application Details</Text>
          <Text className="text-sm">Application ID: {propertyId}-APP</Text>
          <Text className="text-sm">
            Submitted on: {new Date().toLocaleDateString()}
          </Text>
          <Text className="text-sm">Status: Under Review</Text>
        </View>

        <Text className="text-sm text-gray-600 mb-6 text-center">
          We'll review your application and get back to you within 2-3 business
          days.
        </Text>

        <TouchableOpacity
          onPress={onCancel}
          className="bg-blue-500 p-4 rounded-md w-full items-center"
        >
          <Text className="text-white font-bold">
            Return to Property Listings
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {currentStep <= 5 && renderStepIndicator()}

      <ScrollView className="flex-1">
        {currentStep === 1 && renderPersonalInfoStep()}
        {currentStep === 2 && renderEmploymentStep()}
        {currentStep === 3 && renderFinancialStep()}
        {currentStep === 4 && renderDocumentsStep()}
        {currentStep === 5 && renderReviewStep()}
        {currentStep === 6 && renderConfirmationStep()}
      </ScrollView>

      {currentStep <= 5 && (
        <View className="flex-row p-4 border-t border-gray-200 bg-white">
          <TouchableOpacity
            onPress={handlePrevStep}
            className="flex-1 bg-gray-200 p-3 rounded-md mr-2 items-center"
          >
            <Text className="font-medium">
              {currentStep === 1 ? "Cancel" : "Back"}
            </Text>
          </TouchableOpacity>

          {currentStep < 5 && (
            <TouchableOpacity
              onPress={handleNextStep}
              className="flex-1 bg-blue-500 p-3 rounded-md ml-2 flex-row items-center justify-center"
            >
              <Text className="font-medium text-white mr-1">Next</Text>
              <ChevronRight size={16} color="white" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default ApplicationForm;
