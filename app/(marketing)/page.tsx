import AnimatePageWrapper from '@/components/wrapper/animate-page-wrapper'
import Footer from '@/components/sections/footer'
import Navbar from '@/components/sections/navbar'
import AboutSection from '@/components/sections/landing-page/about-us'
import BannerSection from '@/components/sections/landing-page/banner-section'
import PriceSection from '@/components/sections/landing-page/price-section'
import MapLazy from '@/components/sections/landing-page/map-lazy'

const LandingPage = () => {
    return (
        <AnimatePageWrapper>
            <Navbar />
            <BannerSection />
            <AboutSection />
            <PriceSection />
            <MapLazy />
            <Footer />
        </AnimatePageWrapper>
    )
}

export default LandingPage
