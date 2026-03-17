import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! You'll get weekly tips.");
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Raju <span className="text-primary">Speaks</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Master spoken English with expert guidance, daily practice, and
              real-world phrases.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">
              Learn
            </h4>
            <ul className="space-y-2">
              {[
                { label: "All Lessons", to: "/lessons" },
                { label: "Practice Phrases", to: "/practice" },
                { label: "Grammar Guide", to: "/grammar" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-ocid={`footer.${l.label.toLowerCase().replace(/ /g, "_")}.link`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">
              Levels
            </h4>
            <ul className="space-y-2">
              {["Beginner", "Intermediate", "Advanced"].map((l) => (
                <li key={l}>
                  <Link
                    to="/lessons"
                    data-ocid={`footer.${l.toLowerCase()}.link`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">
              Weekly Tips
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get English tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="footer.email.input"
                className="text-sm h-9 flex-1"
              />
              <Button
                type="submit"
                size="sm"
                className="h-9 bg-primary text-primary-foreground px-3"
                data-ocid="footer.subscribe.button"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Raju Speaks. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
