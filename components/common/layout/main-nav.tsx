"use client";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Benefits", href: "#benefits" },
  { name: "FAQ", href: "#faq" },
];

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
}
