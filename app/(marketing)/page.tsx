import { PageTransition } from '@/components/animations'
import AboutSection from '@/components/sections/landing-page/about-section'
import DownloadSection from '@/components/sections/landing-page/download-section'
import FaqSection from '@/components/sections/landing-page/faq-section'
import HeroSection from '@/components/sections/landing-page/hero-section'
import MapSection from '@/components/sections/landing-page/map-section'
import PriceSection from '@/components/sections/landing-page/pricing-section'
import TestimonialSection from '@/components/sections/landing-page/testimonial-section'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: "Welcome to DiaryOf",
    description: "A platform for sharing and discovering personal stories",
};
const LandingPage = () => {
    return (
        <PageTransition>
            <HeroSection />
            <DownloadSection />
            <AboutSection />
            <PriceSection />
            <TestimonialSection />
            <FaqSection />
            <MapSection />
        </PageTransition>
    )
}

export default LandingPage
