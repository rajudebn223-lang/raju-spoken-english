import { LessonCard } from "@/components/LessonCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLessons, usePhrases, useTestimonials } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const SAMPLE_LESSONS = [
  {
    title: "Introduction to Confident Speaking",
    description:
      "Build confidence to speak English in everyday situations with proven techniques.",
    level: "Beginner",
    category: "Speaking",
    rating: 4.9,
    duration: 25n,
  },
  {
    title: "Business English Essentials",
    description:
      "Master professional vocabulary and phrases for meetings, emails, and presentations.",
    level: "Intermediate",
    category: "Business",
    rating: 4.8,
    duration: 35n,
  },
  {
    title: "Fluent Conversation Skills",
    description:
      "Learn to hold natural, flowing conversations on any topic with ease and confidence.",
    level: "Advanced",
    category: "Fluency",
    rating: 4.7,
    duration: 40n,
  },
];

const SAMPLE_PHRASES: Record<string, string[]> = {
  Travel: [
    "Could you tell me how to get to the nearest metro?",
    "I'd like to check in, please. My name is Sharma.",
    "Excuse me, is this seat taken?",
    "Could you recommend a good local restaurant?",
  ],
  Business: [
    "Let's circle back on this after the meeting.",
    "I'd like to schedule a call to discuss this further.",
    "Could you elaborate on that point?",
    "We're on the same page about the deadline.",
  ],
  "Daily Life": [
    "Would you mind lowering the volume a bit?",
    "What do you usually do on weekends?",
    "I'm looking for something in my size.",
    "Could I get the bill, please?",
  ],
  Greetings: [
    "It's a pleasure to meet you!",
    "How have you been keeping?",
    "Nice to put a face to the name!",
    "I hope you've had a great day.",
  ],
};

const SAMPLE_TESTIMONIALS = [
  {
    studentName: "Priya Sharma",
    message:
      "Raju's lessons transformed my confidence at work. I now lead meetings effortlessly!",
    rating: 5n,
  },
  {
    studentName: "Arjun Mehta",
    message:
      "The practice phrases are incredibly practical. I use them every single day at my office.",
    rating: 5n,
  },
  {
    studentName: "Kavya Reddy",
    message:
      "Best English learning platform! The structured approach helped me clear my IELTS exam.",
    rating: 5n,
  },
];

const VALUE_PROPS = [
  {
    icon: BookOpen,
    label: "Expert Lessons",
    desc: "Structured curriculum by certified coaches",
  },
  {
    icon: MessageCircle,
    label: "Daily Practice",
    desc: "Fresh phrases added every day",
  },
  {
    icon: TrendingUp,
    label: "Grammar Guide",
    desc: "Clear rules with real-world examples",
  },
  {
    icon: Users,
    label: "Community",
    desc: "Learn alongside thousands of students",
  },
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3"];
const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

export function Home() {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const { data: phrases } = usePhrases();
  const { data: testimonials } = useTestimonials();

  const displayLessons = (
    lessons && lessons.length > 0 ? lessons : SAMPLE_LESSONS
  ).slice(0, 3);
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : SAMPLE_TESTIMONIALS;

  const phrasesByCategory: Record<string, string[]> = {};
  if (phrases && phrases.length > 0) {
    for (const p of phrases) {
      if (!phrasesByCategory[p.category]) phrasesByCategory[p.category] = [];
      phrasesByCategory[p.category].push(p.phrase);
    }
  }
  const finalPhrases =
    Object.keys(phrasesByCategory).length > 0
      ? phrasesByCategory
      : SAMPLE_PHRASES;
  const phraseCategories = Object.keys(finalPhrases);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.025 85), oklch(0.93 0.03 85))",
        }}
      >
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                <span className="w-6 h-px bg-primary" />
                Spoken English Expert
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-5">
                Master Spoken English
                <br />
                <span className="text-primary">with Raju</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                Build confidence and fluency with expert-guided lessons, daily
                practice phrases, and personalized coaching.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/lessons" data-ocid="hero.start_learning.button">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    Start Learning Now <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/lessons" data-ocid="hero.explore.link">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-primary hover:bg-accent gap-2"
                  >
                    Explore Lessons
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border/60">
                <div className="text-center">
                  <p className="font-display font-bold text-2xl text-foreground">
                    10K+
                  </p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="font-display font-bold text-2xl text-foreground">
                    200+
                  </p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="font-display font-bold text-2xl text-foreground">
                    4.9 ★
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src="/assets/generated/hero-instructor.dim_600x700.jpg"
                  alt="Raju, English coach holding tablet in classroom"
                  className="w-full object-cover max-h-[520px]"
                />
                <div className="absolute bottom-4 left-4 bg-card rounded-xl p-3 shadow-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-star text-star" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Trusted by 10,000+
                    </p>
                    <p className="text-xs text-muted-foreground">
                      English learners
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-card border-y border-border">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {VALUE_PROPS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
              Featured Lessons
            </h2>
            <p className="text-muted-foreground">
              Hand-picked to get you speaking confidently
            </p>
          </div>
          <Link to="/lessons" data-ocid="home.all_lessons.link">
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonsLoading
            ? SKELETON_KEYS.map((k) => (
                <div
                  key={k}
                  data-ocid="lessons.loading_state"
                  className="rounded-xl overflow-hidden"
                >
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))
            : displayLessons.map((lesson, i) => (
                <motion.div
                  key={lesson.title}
                  data-ocid={`lessons.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <LessonCard lesson={lesson} index={i} />
                </motion.div>
              ))}
        </div>
      </section>

      {/* Practice Phrases + Testimonials */}
      <section className="bg-muted/40 border-y border-border py-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                Practice Phrases
              </h2>
              <p className="text-muted-foreground text-sm mb-5">
                Real phrases for real conversations
              </p>
              <Tabs defaultValue={phraseCategories[0]} className="w-full">
                <TabsList className="bg-card border border-border mb-4 flex-wrap h-auto gap-1 p-1">
                  {phraseCategories.map((cat) => (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      data-ocid={`phrases.${cat.toLowerCase().replace(/ /g, "_")}.tab`}
                      className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {phraseCategories.map((cat) => (
                  <TabsContent key={cat} value={cat}>
                    <ul className="space-y-2.5">
                      {(finalPhrases as Record<string, string[]>)[cat]?.map(
                        (phrase, i) => (
                          <li
                            key={phrase}
                            className="bg-card rounded-lg px-4 py-3 text-sm text-foreground shadow-xs border border-border/50 flex items-start gap-2"
                          >
                            <span className="text-primary font-bold shrink-0">
                              {i + 1}.
                            </span>
                            <span>{phrase}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                Student Stories
              </h2>
              <p className="text-muted-foreground text-sm mb-5">
                Hear from our community of learners
              </p>
              <div className="space-y-4">
                {displayTestimonials.map((t, i) => (
                  <motion.div
                    key={t.studentName}
                    data-ocid={`testimonials.item.${i + 1}`}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-xl p-4 shadow-xs border border-border/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-accent text-primary text-xs font-bold">
                          {t.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {t.studentName}
                        </p>
                        <div className="flex gap-0.5">
                          {STAR_KEYS.slice(0, Number(t.rating)).map((sk) => (
                            <Star
                              key={sk}
                              className="w-3 h-3 fill-star text-star"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      &ldquo;{t.message}&rdquo;
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
