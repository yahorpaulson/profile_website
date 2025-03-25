export interface Project {
    title: string
    shortDescription: string;
    description: string
    tags?: string[]
    link?: string,
    inProgress: boolean,
    goals?: string[],
    insights?: string[],
    slug: string
}