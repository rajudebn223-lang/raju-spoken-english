import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePhrases } from "@/hooks/useQueries";
import { Copy, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PHRASE_CATEGORIES = ["Travel", "Business", "Daily Life", "Greetings"];

const SAMPLE_PHRASES: Record<string, string[]> = {
  Travel: [
    "Could you tell me how to get to the nearest metro station?",
    "I'd like to check in, please. My name is Sharma.",
    "Could you recommend a good local restaurant near here?",
    "Excuse me, is this seat taken on this train?",
    "Could I get a map of the city, please?",
    "How long does it take to get to the airport from here?",
  ],
  Business: [
    "Let's circle back on this after the morning meeting.",
    "I'd like to schedule a call to discuss the proposal further.",
    "Could you elaborate on that point for the team?",
    "We need to align on the project timeline before Friday.",
    "I'll send you a follow-up email with the key action items.",
    "Could we move the deadline by two days?",
  ],
  "Daily Life": [
    "Would you mind lowering the volume a little bit?",
    "What do you usually do on weekends for fun?",
    "Could I borrow your umbrella? It's raining heavily.",
    "I'm looking for something in a medium size.",
    "Could I get the bill, please? We're in a hurry.",
    "Do you know a good mechanic in this area?",
  ],
  Greetings: [
    "It's such a pleasure to finally meet you in person!",
    "How have you been keeping since we last met?",
    "Nice to finally put a face to the name!",
    "I hope you've had a wonderful day so far.",
    "Long time no see! Where have you been hiding?",
    "Please send my regards to your family.",
  ],
};

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

export function Practice() {
  const [activeCategory, setActiveCategory] = useState(PHRASE_CATEGORIES[0]);
  const { data: phrases, isLoading } = usePhrases(activeCategory);

  const backendPhrases = phrases
    ?.filter((p) => p.category === activeCategory)
    .map((p) => p.phrase);
  const displayPhrases =
    backendPhrases && backendPhrases.length > 0
      ? backendPhrases
      : (SAMPLE_PHRASES[activeCategory] ?? []);

  const handleCopy = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    toast.success("Phrase copied to clipboard!");
  };

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Practice Phrases
          </h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Real phrases for real conversations. Practice them daily to build
          fluency.
        </p>
      </motion.div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-card border border-border mb-6 flex-wrap h-auto gap-1 p-1">
          {PHRASE_CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              data-ocid={`practice.${cat.toLowerCase().replace(/ /g, "_")}.tab`}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {PHRASE_CATEGORIES.map((cat) => (
          <TabsContent key={cat} value={cat}>
            {isLoading ? (
              <div className="space-y-3" data-ocid="practice.loading_state">
                {SKELETON_KEYS.map((k) => (
                  <Skeleton key={k} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {displayPhrases.map((phrase, i) => (
                  <motion.li
                    key={phrase}
                    data-ocid={`practice.item.${i + 1}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group bg-card rounded-xl px-5 py-4 shadow-xs border border-border/60 flex items-start gap-4 hover:shadow-card transition-shadow"
                  >
                    <span className="text-primary font-display font-bold text-lg shrink-0 w-6">
                      {i + 1}.
                    </span>
                    <p className="text-foreground flex-1 leading-relaxed">
                      {phrase}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(phrase)}
                      data-ocid={`practice.copy_button.${i + 1}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary p-1 rounded"
                      aria-label="Copy phrase"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
