type Lang = 'en' | 'de' | 'be';

export interface Project {
    title: Record<Lang, string>;
    shortDescription: Record<Lang, string>;
    description: Record<Lang, string>;
    tags?: string[];
    link?: string;
    inProgress: boolean;
    goals?: Record<Lang, string[]>;
    insights?: Record<Lang, string[]>;
    slug: string;
}
