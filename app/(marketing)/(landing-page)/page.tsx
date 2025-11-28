// app/(marketing)/page.tsx
import { PageTransition } from '@/components/animations'
import MoveToTop from '@/components/move-to-top'
import AboutSection from '@/components/pages/(marketing)/(landing)/about-section'
import DownloadSection from '@/components/pages/(marketing)/(landing)/download-section'
import HeroSection from '@/components/pages/(marketing)/(landing)/hero-section'
import MapSection from '@/components/pages/(marketing)/(landing)/map-section'
import PriceSection from '@/components/pages/(marketing)/(landing)/pricing-section'
const LandingPage = () => {
    return (
        <PageTransition>
            <MoveToTop />
            <HeroSection />
            <AboutSection />
            <DownloadSection />
            <PriceSection />
            <MapSection />
        </PageTransition>
    )
}

export default LandingPage
