import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGrammarTips } from "@/hooks/useQueries";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const GRAMMAR_CATEGORIES = ["Tenses", "Articles", "Prepositions", "Vocabulary"];
const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3"];

const SAMPLE_TIPS: Record<string, { title: string; content: string }[]> = {
  Tenses: [
    {
      title: "Simple Present vs. Present Continuous",
      content:
        "Use Simple Present for habits and facts: 'I drink tea every morning.' Use Present Continuous for actions happening right now: 'I am drinking tea.' The key difference is permanence vs. temporary action.",
    },
    {
      title: "Past Perfect: Setting the Scene",
      content:
        "Use Past Perfect to show an action completed before another past action: 'She had already left when I arrived.' It sets a timeline in past narratives and adds clarity to complex stories.",
    },
    {
      title: "Will vs. Going To",
      content:
        "'Will' is for spontaneous decisions: 'I'll help you with that!' 'Going to' is for planned intentions: 'I'm going to study tonight.' Master this and your future tense sounds completely natural.",
    },
  ],
  Articles: [
    {
      title: "When to Use 'A' vs. 'An'",
      content:
        "Use 'a' before consonant sounds: 'a university' (sounds like 'yoo'). Use 'an' before vowel sounds: 'an hour' (the 'h' is silent). It's about the sound, not the letter — a common mistake to avoid.",
    },
    {
      title: "The Definite Article 'The'",
      content:
        "Use 'the' for specific things both speaker and listener know: 'Please close the door.' Use it for unique things: 'the sun', 'the president.' Skip it for general concepts: 'I love music' (not 'the music').",
    },
    {
      title: "Zero Article Rule",
      content:
        "Don't use any article before plural or uncountable nouns used in a general sense: 'Dogs are loyal.' 'Water is essential.' But say 'The dogs in my yard are friendly' when referring to specific ones.",
    },
  ],
  Prepositions: [
    {
      title: "In, On, At — Time",
      content:
        "Use 'in' for months, years, seasons: 'in July', 'in 2024'. Use 'on' for days and dates: 'on Monday', 'on July 4th'. Use 'at' for specific times: 'at 3 PM', 'at noon'. This trio covers 80% of time prepositions.",
    },
    {
      title: "In, On, At — Place",
      content:
        "'In' for enclosed spaces: 'in the room', 'in India'. 'On' for surfaces: 'on the table', 'on the street'. 'At' for specific points: 'at the door', 'at school'. Think: enclosed → on surface → specific point.",
    },
    {
      title: "Common Prepositional Phrases",
      content:
        "Learn these by heart: 'interested in', 'good at', 'responsible for', 'afraid of', 'depend on', 'result in'. Prepositions don't follow strict logic — they're best learned as fixed phrases with context.",
    },
  ],
  Vocabulary: [
    {
      title: "Formal vs. Informal Word Choices",
      content:
        "Informal: 'get' → Formal: 'obtain'. Informal: 'find out' → Formal: 'discover'. Informal: 'help' → Formal: 'assist'. Knowing both registers lets you adapt to any situation — office, interview, or casual conversation.",
    },
    {
      title: "Collocations: Words That Go Together",
      content:
        "'Make' goes with: a decision, a mistake, a suggestion, progress. 'Do' goes with: homework, business, damage, good. Using the wrong verb is the most common fluency barrier for intermediate speakers.",
    },
    {
      title: "Expanding with Synonyms",
      content:
        "Don't always use 'very'. Try: very tired → exhausted, very happy → thrilled, very surprised → astonished. Varied vocabulary makes your English memorable and sophisticated. Aim to learn one new word in context each day.",
    },
  ],
};

export function Grammar() {
  const [activeCategory, setActiveCategory] = useState(GRAMMAR_CATEGORIES[0]);
  const { data: tips, isLoading } = useGrammarTips(activeCategory);

  const displayTips =
    tips && tips.length > 0
      ? tips
      : (SAMPLE_TIPS[activeCategory] ?? []).map((t) => ({
          ...t,
          category: activeCategory,
        }));

  return (
    <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Grammar Guide
          </h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Clear rules with real-world examples to make English grammar click.
        </p>
      </motion.div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-card border border-border mb-6">
          {GRAMMAR_CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              data-ocid={`grammar.${cat.toLowerCase()}.tab`}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {GRAMMAR_CATEGORIES.map((cat) => (
          <TabsContent key={cat} value={cat}>
            {isLoading ? (
              <div className="space-y-4" data-ocid="grammar.loading_state">
                {SKELETON_KEYS.map((k) => (
                  <div key={k} className="rounded-xl overflow-hidden">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {displayTips.map((tip, i) => (
                  <motion.div
                    key={tip.title}
                    data-ocid={`grammar.item.${i + 1}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-card rounded-xl p-6 shadow-xs border border-border/60 hover:shadow-card transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-xs">
                          {i + 1}
                        </span>
                      </span>
                      <h3 className="font-display font-semibold text-foreground text-lg">
                        {tip.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed ml-10">
                      {tip.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
