export default function LoadingOtp() {
    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold h-8 w-[60%] bg-gray-100 rounded animate-pulse mx-auto"></h2>
                    <p className="mt-2  w-full h-3 text-sm bg-gray-200 rounded animate-pulse"></p>
                </div>

                <div className="mt-8 space-y-6">
                    {/* OTP Input Skeleton */}
                    <div className="flex justify-center gap-3">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="size-14 rounded-full border border-gray-200 bg-gray-100 animate-pulse"
                            />
                        ))}
                    </div>

                    {/* Button Skeleton */}
                    <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />

                    {/* Text Skeleton */}
                    <div className="text-center space-y-2">
                        <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}