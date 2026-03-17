import { LessonCard } from "@/components/LessonCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLessons } from "@/hooks/useQueries";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Lesson } from "../backend.d";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

const SAMPLE_LESSONS: Lesson[] = [
  {
    title: "Your First English Conversation",
    description:
      "Kick off your journey with simple, essential phrases for everyday interactions.",
    level: "Beginner",
    category: "Speaking",
    rating: 4.9,
    duration: 20n,
  },
  {
    title: "Pronunciation Fundamentals",
    description:
      "Learn the sounds of English and how to pronounce words correctly with confidence.",
    level: "Beginner",
    category: "Pronunciation",
    rating: 4.8,
    duration: 25n,
  },
  {
    title: "Present Tense Mastery",
    description:
      "Master all forms of the present tense through practical, real-world examples.",
    level: "Beginner",
    category: "Grammar",
    rating: 4.7,
    duration: 30n,
  },
  {
    title: "Office English Essentials",
    description:
      "Navigate the workplace with confidence — emails, meetings, and presentations.",
    level: "Intermediate",
    category: "Business",
    rating: 4.9,
    duration: 35n,
  },
  {
    title: "Telephone & Video Calls",
    description:
      "Sound professional on calls with key phrases and handling difficult situations.",
    level: "Intermediate",
    category: "Business",
    rating: 4.8,
    duration: 28n,
  },
  {
    title: "Storytelling in English",
    description:
      "Captivate listeners by telling stories naturally with structure and emotion.",
    level: "Intermediate",
    category: "Fluency",
    rating: 4.7,
    duration: 40n,
  },
  {
    title: "Idiomatic Expressions",
    description:
      "Sound like a native by mastering 50 common idioms used in everyday speech.",
    level: "Advanced",
    category: "Vocabulary",
    rating: 4.9,
    duration: 45n,
  },
  {
    title: "Debate & Persuasion",
    description:
      "Learn to argue your point persuasively and hold your own in any discussion.",
    level: "Advanced",
    category: "Speaking",
    rating: 4.8,
    duration: 50n,
  },
  {
    title: "Accent Reduction Techniques",
    description:
      "Refine your accent and speak more clearly using targeted practice exercises.",
    level: "Advanced",
    category: "Pronunciation",
    rating: 4.6,
    duration: 38n,
  },
];

export function Lessons() {
  const [activeLevel, setActiveLevel] = useState("All");
  const { data: lessons, isLoading } = useLessons(
    activeLevel === "All" ? null : activeLevel,
  );

  const displayLessons =
    lessons && lessons.length > 0
      ? lessons
      : SAMPLE_LESSONS.filter(
          (l) => activeLevel === "All" || l.level === activeLevel,
        );

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
          All Lessons
        </h1>
        <p className="text-muted-foreground mb-8">
          Browse our full library and find the perfect lesson for your level.
        </p>
      </motion.div>

      <Tabs value={activeLevel} onValueChange={setActiveLevel} className="mb-8">
        <TabsList className="bg-card border border-border">
          {LEVELS.map((level) => (
            <TabsTrigger
              key={level}
              value={level}
              data-ocid={`lessons.${level.toLowerCase()}.tab`}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {level}
            </TabsTrigger>
          ))}
        </TabsList>

        {LEVELS.map((level) => (
          <TabsContent key={level} value={level}>
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {SKELETON_KEYS.map((k) => (
                  <div
                    key={k}
                    data-ocid="lessons.loading_state"
                    className="rounded-xl overflow-hidden"
                  >
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayLessons.length === 0 ? (
              <div
                data-ocid="lessons.empty_state"
                className="text-center py-16 text-muted-foreground"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No lessons found for this level yet.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {displayLessons.map((lesson, i) => (
                  <motion.div
                    key={lesson.title}
                    data-ocid={`lessons.item.${i + 1}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <LessonCard lesson={lesson} index={i} />
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
