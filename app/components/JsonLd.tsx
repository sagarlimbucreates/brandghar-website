export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Brandghar",
    url: "https://thebrandghar.com",
    logo: "https://thebrandghar.com/medias/logo-cropped.png",
    description:
      "Results-driven digital marketing agency helping Nepali and global brands grow through Meta Ads, SEO, content, and strategy.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    sameAs: [
      "https://www.instagram.com/thebrandghar",
      "https://www.facebook.com/thebrandghar",
      "https://www.tiktok.com/@thebrandghar",
      "https://www.linkedin.com/company/thebrandghar",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://thebrandghar.com${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://thebrandghar.com${url}`,
    provider: {
      "@type": "Organization",
      name: "Brandghar",
      url: "https://thebrandghar.com",
    },
    areaServed: { "@type": "Country", name: "Nepal" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string;
  author?: string | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `https://thebrandghar.com${url}`,
    ...(image ? { image } : {}),
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": author ? "Person" : "Organization",
      name: author || "Brandghar",
    },
    publisher: {
      "@type": "Organization",
      name: "Brandghar",
      logo: {
        "@type": "ImageObject",
        url: "https://thebrandghar.com/medias/logo-cropped.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
