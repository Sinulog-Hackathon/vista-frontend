interface FooterLink {
  href: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { href: "#", label: "Features" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Security" },
    ],
  },
];

const socialLinks = [
  { href: "#", label: "Twitter" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-vista-primary snap-start px-4 py-12 text-white md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-2 gap-8 md:mb-12 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Vista
            </div>
            <p className="text-xs leading-relaxed text-white/70 md:text-sm">
              Next-generation real estate visualization powered by AI.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-bold md:mb-4 md:text-base">
                {section.title}
              </h3>
              <ul className="space-y-2 text-xs text-white/70 md:text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:pt-8">
          <p className="text-xs text-white/50 md:text-sm">
            © 2026 Vista. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/50 transition-colors hover:text-white md:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
