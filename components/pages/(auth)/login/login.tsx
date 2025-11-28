
"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import googleImage from "@/public/google.png";
import { authServices } from "@/services/auth";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState<"idle" | "loading">("idle");
	const { setAuth } = useAuthStore();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setStatus("loading");

		const response = await authServices.login(email, password);

		if (response.success === false) {
			setStatus("idle");
			toast.error(response.message || "Login failed. Please try again.");
			return;
		}
		const { token, user } = response.data!;

		// Set cookie for middleware
		setAuth(token, user);

		toast.success("Welcome back! Redirecting to dashboard...");

		setTimeout(() => {
			setStatus("idle");
			router.push("/dashboard");
		}, 1000);
	};

	const handleGoogleSignIn = () => {
		// Implement Google OAuth flow
		window.location.href = "/api/v1/auth/google";
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<Input
					type="email"
					label="Email Address"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					disabled={status === "loading"}
				/>

				<Input
					type="password"
					label="Password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					disabled={status === "loading"}
				/>

				<Button
					variant="primary"
					className="disabled:cursor-not-allowed w-full h-12 justify-center mt-6 cursor-pointer"
					disabled={status === "loading"}
				>
					<AnimatePresence mode="wait">
						<motion.span
							key={status}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="block"
						>
							{status === "loading" ? <Loading dark size="sm" /> : "Login"}
						</motion.span>
					</AnimatePresence>
				</Button>
			</form>

			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 bg-white text-gray-500">Or continue with</span>
				</div>
			</div>

			<Button
				variant="secondary"
				className="w-full flex items-center h-12 justify-center gap-3"
				onClick={handleGoogleSignIn}
				disabled={status === "loading"}
			>
				<Image src={googleImage} className="size-8" alt="google-image" />
				Sign in with Google
			</Button>
		</>
	);
}
