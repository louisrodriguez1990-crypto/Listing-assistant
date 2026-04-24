import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import ProblemSection from '@/components/landing/ProblemSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import PricingSection from '@/components/landing/PricingSection'
import Footer from '@/components/landing/Footer'
import RevealOnScroll from '@/components/landing/RevealOnScroll'

export default function LandingPage() {
  return (
    <>
      <RevealOnScroll />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
