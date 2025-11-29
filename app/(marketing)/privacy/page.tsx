"use client"
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper"

const PrivacyAndSecurityPage = () => {
  return (
    <AnimatePageWrapper className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 font-serif">Privacy & Security</h1>
          <p className="text-zinc-500 text-lg">Your trust and safety are our top priorities.</p>
        </header>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Your Data, Your Control</h2>
            <p className="text-zinc-600 leading-relaxed">
              All diary entries are encrypted end-to-end. Only you have access to your private thoughts. We never sell or share your data with third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Encryption & Security</h2>
            <p className="text-zinc-600 leading-relaxed">
              We use industry-standard encryption for all data, both in transit and at rest. Cloud sync is protected by your personal encryption key.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Export & Portability</h2>
            <p className="text-zinc-600 leading-relaxed">
              You can export your journal at any time in PDF or JSON format. Your memories are always yours to keep.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">Account Protection</h2>
            <p className="text-zinc-600 leading-relaxed">
              We recommend using strong passwords and enabling two-factor authentication for maximum security.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-zinc-100 mt-16">
          <p className="text-sm text-zinc-400">
            Questions about privacy or security? Contact us at <a href="mailto:teamdiaryof@gmail.com" className="text-zinc-900 underline">teamdiaryof@gmail.com</a>
          </p>
        </div>
      </div>
    </AnimatePageWrapper>
  )
}

export default PrivacyAndSecurityPage