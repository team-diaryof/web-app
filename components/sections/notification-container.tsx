"use client";

import { useNotificationStore } from "@/store/in-app-notification";
import type { Notification as InAppNotification } from "@/store/in-app-notification";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import { XIcon } from "lucide-react";

const colorMap: Record<InAppNotification["type"], string> = {
    success: "bg-green-50",
    error: "bg-red-50",
    warning: "bg-yellow-50",
    info: "bg-blue-50",
};

function NotificationItem({ notification, onClose }: { notification: InAppNotification; onClose: (id: string) => void }) {
    const x = useMotionValue(0);
    const colorClass = colorMap[notification.type] ?? "";

    return (
        <motion.div
            layout="position"
            drag="x"
            dragConstraints={{ left: 0, right: 1000 }}
            dragMomentum={false}
            dragElastic={0.2}
            whileDrag={{ scale: 0.98 }}
            style={{ x }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            onDragEnd={(e, info) => {
                const threshold = 50;
                const fastSwipe = info.velocity.x > 500;
                if (info.offset.x > threshold || fastSwipe) {
                    onClose(notification.id);
                } else {
                    animate(x, 0, { type: "spring", stiffness: 600, damping: 40 });
                }
            }}
            className={`flex items-start gap-3 bg-gray-50 p-4 px-6 border border-gray-100 w-fit rounded-full ${colorClass}`}
        >
            <p className="flex-1 text-sm font-medium">{notification.message}</p>
            <button
                onClick={() => onClose(notification.id)}
                className="shrink-0 hover:opacity-70 transition-opacity"
                aria-label="Close notification"
            >
                <XIcon size={20} />
            </button>
        </motion.div>
    );
}

export default function NotificationContainer() {
    const { notifications, removeNotification } = useNotificationStore();

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
            {/* Prevent re-animating existing items on list changes */}
            <AnimatePresence initial={false}>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClose={removeNotification}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}