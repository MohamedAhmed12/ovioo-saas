export interface PlanInterface {
    id: string;
    title: string;
    description: string;
    services: string[];
    background_color?: string;
    daily_fees: number;
    monthly_fees: number;
    is_full_time: number;
    is_most_popular: number;
}
