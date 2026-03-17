import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";
import type { Lesson } from "../backend.d";

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

const CARD_GRADIENTS = [
  "from-teal-400 to-teal-600",
  "from-sky-400 to-blue-600",
  "from-violet-400 to-purple-600",
  "from-orange-400 to-amber-600",
  "from-emerald-400 to-teal-600",
  "from-pink-400 to-rose-600",
];

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

export function LessonCard({ lesson, index }: LessonCardProps) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const levelColor =
    LEVEL_COLORS[lesson.level] ?? "bg-muted text-muted-foreground";

  return (
    <article className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div
        className={`h-40 bg-gradient-to-br ${gradient} relative flex items-center justify-center`}
      >
        <span className="text-white/20 font-display font-bold text-5xl select-none">
          {lesson.category.charAt(0).toUpperCase()}
        </span>
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${levelColor}`}
          >
            {lesson.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-foreground text-base mb-1 line-clamp-2">
          {lesson.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {lesson.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-star text-star" />
            <span className="font-medium text-foreground">
              {lesson.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{Number(lesson.duration)} min</span>
          </div>
          <Badge variant="outline" className="text-xs py-0 px-2">
            {lesson.category}
          </Badge>
        </div>
      </div>
    </article>
  );
}
