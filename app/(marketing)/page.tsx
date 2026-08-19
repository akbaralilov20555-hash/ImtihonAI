import { Hero } from "@/components/landing/hero";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { ProductPreview } from "@/components/landing/product-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features, CTA } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <ProductPreview />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
