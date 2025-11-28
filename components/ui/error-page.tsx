// components/ui/error-page.tsx
"use client";

import {
  FileQuestion,
  Server,
  Lock,
  ShieldBan,
  WifiOff,
  Construction,
  CreditCard,
  Hourglass,
  AlertCircle,
} from "lucide-react";
import Button from "./button";
import AnimatePageWrapper from "../animations/animate-page-wrapper";

interface UnifiedErrorPageProps {
  notFound?: boolean;
  serverError?: boolean;
  unauthorized?: boolean;
  forbidden?: boolean;
  paymentRequired?: boolean;
  tooManyRequests?: boolean;
  maintenance?: boolean;
  offline?: boolean;
  badRequest?: boolean;

  title?: string;
  message?: string;
  actionLabel?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

const ERROR_CONFIG = {
  maintenance: {
    label: "Maintenance",
    title: "Under Maintenance",
    message: "We are upgrading our systems. Please check back soon.",
    icon: Construction,
  },
  offline: {
    label: "Network",
    title: "No Internet",
    message: "Check your connection and try again.",
    icon: WifiOff,
  },
  notFound: {
    label: "404",
    title: "Page Not Found",
    message: "The page you’re looking for doesn’t exist.",
    icon: FileQuestion,
  },
  unauthorized: {
    label: "401",
    title: "Unauthorized",
    message: "You must be logged in to continue.",
    icon: Lock,
  },
  forbidden: {
    label: "403",
    title: "Access Denied",
    message: "You do not have permission to view this page.",
    icon: ShieldBan,
  },
  paymentRequired: {
    label: "Payment",
    title: "Subscription Required",
    message: "Update your billing information to proceed.",
    icon: CreditCard,
  },
  serverError: {
    label: "500",
    title: "Server Error",
    message: "An unexpected server error occurred.",
    icon: Server,
  },
  tooManyRequests: {
    label: "429",
    title: "Too Many Requests",
    message: "You're doing that too often. Try again later.",
    icon: Hourglass,
  },
  badRequest: {
    label: "400",
    title: "Bad Request",
    message: "The server couldn't understand your request.",
    icon: AlertCircle,
  },
  default: {
    label: "Error",
    title: "Something Went Wrong",
    message: "An unexpected error occurred.",
    icon: AlertCircle,
  },
};

export default function UnifiedErrorPage(props: UnifiedErrorPageProps) {
  const type =
    (props.maintenance && "maintenance") ||
    (props.offline && "offline") ||
    (props.paymentRequired && "paymentRequired") ||
    (props.unauthorized && "unauthorized") ||
    (props.forbidden && "forbidden") ||
    (props.notFound && "notFound") ||
    (props.serverError && "serverError") ||
    (props.tooManyRequests && "tooManyRequests") ||
    (props.badRequest && "badRequest") ||
    "default";

  const config = ERROR_CONFIG[type];
  const Icon = config.icon;

  return (
    <AnimatePageWrapper className="w-full  flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-full scale-110" />
            <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-500">
              <Icon size={32} strokeWidth={1.5} />
            </span>
          </div>
        </div>

        {/* Labels */}
        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
          {config.label}
        </p>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
          {props.title || config.title}
        </h1>

        <p className="text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
          {props.message || config.message}
        </p>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          {props.onActionClick ? (
            <button
              onClick={props.onActionClick}
              className="inline-flex h-11 px-8 items-center justify-center rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {props.actionLabel || "Try Again"}
            </button>
          ) : (
            <Button
              href={props.actionLink || "/"}
              className="min-w-[140px] h-11 shadow-sm justify-center"
            >
              {props.actionLabel || "Return Home"}
            </Button>
          )}
        </div>

      </div>
    </AnimatePageWrapper>
  );
}
