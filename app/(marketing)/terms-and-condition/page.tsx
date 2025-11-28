
const TermsAndConditionPage = () => {
  return (
    <div className="py-16 px-6 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-zinc-900 font-serif">Terms & Conditions</h1>
          <p className="text-zinc-500">Last updated: November 28, 2025</p>
        </header>

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

        <div className="pt-8 border-t border-zinc-100">
          <p className="text-sm text-zinc-400">
            Questions? Contact us at <a href="mailto:teamdiaryof@gmail.com" className="text-zinc-900 underline">teamdiaryof@gmail.com</a>
          </p>
        </div>

      </div>
    </div>
  )
}

export default TermsAndConditionPage