import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Lessons", to: "/lessons" },
  { label: "Practice", to: "/practice" },
  { label: "Grammar", to: "/grammar" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            data-ocid="nav.link"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Raju <span className="text-primary">Speaks</span>
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Link to="/lessons" data-ocid="nav.cta.link">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Learning
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <nav
            className="md:hidden pb-4 pt-2 border-t border-border"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  currentPath === link.to
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-4">
              <Link to="/lessons" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground"
                >
                  Start Learning
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
