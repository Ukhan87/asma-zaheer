import { AnalyticsSection } from "@/components/AnalyticsSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InquiryForm } from "@/components/InquiryForm";
import { Navbar } from "@/components/Navbar";
import { PricingPackages } from "@/components/PricingPackages";
import { VideoGrid } from "@/components/VideoGrid";
import portfolio from "@/data/portfolio.json";
import stats from "@/data/stats.json";
import type { CreatorStats, PortfolioData } from "@/lib/types";

const creator = stats as CreatorStats;
const work = portfolio as PortfolioData;

export default function Home() {
  return (
    <>
      <Navbar name={creator.name} />
      <main>
        <Hero stats={creator} />
        <VideoGrid videos={work.videos} />
        <AnalyticsSection stats={creator} />
        <PricingPackages />
        <InquiryForm />
      </main>
      <Footer stats={creator} />
    </>
  );
}
