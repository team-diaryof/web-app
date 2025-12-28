

"use client"
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper"

const TermsAndConditionPage = () => {
  return (
    <AnimatePageWrapper className="py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 font-serif">Terms & Conditions</h1>
          <p className="text-zinc-500 text-lg">Last updated: November 28, 2025</p>
        </header>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">1. Introduction</h2>
            <p className="text-zinc-600 leading-relaxed">
              Welcome to DiaryOf. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. 
              If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">2. Privacy & Data</h2>
            <p className="text-zinc-600 leading-relaxed">
              Your privacy is paramount. We do not sell your personal data. Your diary entries are private and encrypted. 
              We only use data to improve the functionality of the app, such as syncing across devices or providing AI-driven insights 
              (if enabled by you).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">3. User Accounts</h2>
            <p className="text-zinc-600 leading-relaxed">
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">4. Content Ownership</h2>
            <p className="text-zinc-600 leading-relaxed">
              You retain all rights to the content you post on DiaryOf. By using our service, you grant us the right and license to 
              host, store, and display your content solely for the purpose of providing the service to you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">5. Termination</h2>
            <p className="text-zinc-600 leading-relaxed">
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-zinc-100 mt-16">
          <p className="text-sm text-zinc-400">
            Questions? Contact us at <a href="mailto:teamdiaryof@gmail.com" className="text-zinc-900 underline">teamdiaryof@gmail.com</a>
          </p>
        </div>
      </div>
    </AnimatePageWrapper>
  )
}

export default TermsAndConditionPage