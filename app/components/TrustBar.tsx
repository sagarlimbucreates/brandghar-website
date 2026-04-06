"use client";

const items = [
  "Meta Ads",
  "SEO",
  "Social Media",
  "Content Strategy",
  "Brand Identity",
  "Analytics",
  "Growth Marketing",
  "Web Design",
];

export default function TrustBar() {
  const repeated = [...items, ...items];

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 bg-black py-5 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-10 text-lg md:text-xl font-sans font-semibold text-white uppercase tracking-[0.12em]"
          >
            {item}
            <span className="ml-8 text-accent">&bull;</span>
          </span>
        ))}
      </div>
    </section>
  );
}
