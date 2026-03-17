import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Phrase {
    category: string;
    phrase: string;
}
export interface Lesson {
    title: string;
    duration: bigint;
    description: string;
    level: string;
    category: string;
    rating: number;
}
export interface GrammarTip {
    title: string;
    content: string;
    category: string;
}
export interface Testimonial {
    studentName: string;
    message: string;
    rating: bigint;
}
export interface backendInterface {
    getAllGrammarTipsByCategory(): Promise<Array<GrammarTip>>;
    getAllLessonsByRating(): Promise<Array<Lesson>>;
    getAllPhrasesByCategory(): Promise<Array<Phrase>>;
    getGrammarTips(category: string | null): Promise<Array<GrammarTip>>;
    getLessons(category: string | null): Promise<Array<Lesson>>;
    getPhrases(category: string | null): Promise<Array<Phrase>>;
    getTestimonials(): Promise<Array<Testimonial>>;
}
