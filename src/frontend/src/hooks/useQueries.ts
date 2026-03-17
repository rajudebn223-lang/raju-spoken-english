import { useQuery } from "@tanstack/react-query";
import type { GrammarTip, Lesson, Phrase, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

export function useLessons(category?: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Lesson[]>({
    queryKey: ["lessons", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLessons(category ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePhrases(category?: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Phrase[]>({
    queryKey: ["phrases", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPhrases(category ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGrammarTips(category?: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<GrammarTip[]>({
    queryKey: ["grammarTips", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGrammarTips(category ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}
