import AnimatePageWrapper from '@/components/animations/animate-page-wrapper'
import Navbar from '@/components/layout/navbar'
import AboutSection from '@/components/sections/landing-page/about-us'
import FirstSection from '@/components/sections/landing-page/first-section'
import PriceSection from '@/components/sections/landing-page/price-section'

const LandingPage = () => {
    return (
        <AnimatePageWrapper>
            <Navbar />
            <FirstSection />
            <AboutSection />
            <PriceSection />
        </AnimatePageWrapper>
    )
}

export default LandingPage
