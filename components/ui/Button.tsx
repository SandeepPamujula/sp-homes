import React from "react";
import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-blue-600 active:bg-blue-700",
        destructive: "bg-red-600 active:bg-red-700",
        outline: "border border-gray-300 active:bg-gray-100",
        secondary: "bg-gray-200 active:bg-gray-300",
        ghost: "active:bg-gray-100",
        link: "underline-offset-4 active:underline",
      },
      size: {
        default: "h-12 px-4",
        sm: "h-9 px-3",
        lg: "h-14 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const textVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-white",
      destructive: "text-white",
      outline: "text-gray-900",
      secondary: "text-gray-900",
      ghost: "text-gray-900",
      link: "text-blue-600",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({
  children,
  className,
  textClassName,
  variant,
  size,
  disabled = false,
  loading = false,
  onPress,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, size, className }),
        disabled && "opacity-50",
        loading && "opacity-70",
      )}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" ||
            variant === "secondary" ||
            variant === "ghost" ||
            variant === "link"
              ? "#000"
              : "#fff"
          }
          className="mr-2"
        />
      )}
      {!loading && leftIcon && <View className="mr-2">{leftIcon}</View>}
      {typeof children === "string" ? (
        <Text className={cn(textVariants({ variant, size }), textClassName)}>
          {children}
        </Text>
      ) : (
        children
      )}
      {!loading && rightIcon && <View className="ml-2">{rightIcon}</View>}
    </Pressable>
  );
};

export { Button, buttonVariants };
