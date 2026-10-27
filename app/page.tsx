import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Manifesto from "@/components/home/Manifesto";
import ServicesStack from "@/components/home/ServicesStack";
import Process from "@/components/home/Process";
import Showcase from "@/components/home/Showcase";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";
import JsonLd from "@/components/JsonLd";
import { faqLd } from "@/lib/seo";
import { dictionaries } from "@/lib/dictionaries";

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(dictionaries.mx.faq.items)} />
      <Hero />
      <Marquee />
      <Manifesto />
      <ServicesStack />
      <Process />
      <Showcase />
      <Faq />
      <Cta />
    </>
  );
}
