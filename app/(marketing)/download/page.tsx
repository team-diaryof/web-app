import Button from "@/components/ui/button";

export default function DownloadPage() {
  const apkUrl = process.env.NEXT_PUBLIC_ANDROID_APK_URL || "https://github.com/Saquib1973/hydrate-app/releases/download/v1.0.0/hydrated-1.0.0.apk";
  const iosUrl = process.env.NEXT_PUBLIC_APP_STORE_URL; // intentionally left undefined since not published

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-3xl font-bold">Download DiaryOf</h1>
      <p className="max-w-prose text-gray-600">
        The app is currently distributed outside official stores. You can download the Android APK directly below.
      </p>

      <div className="flex flex-col items-center gap-6 w-full">
        <Button href={apkUrl} size="lg" className="w-full sm:w-auto">
          Download Android APK
        </Button>
        {!iosUrl && (
          <div className="text-xs text-gray-500">
            iOS version is not yet available.
          </div>
        )}
      </div>

    </main>
  );
}
