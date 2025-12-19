export interface PlanFeature {
    text: string
    included: boolean
}

export interface Plan {
    name: string
    price: string
    period: string
    description: string
    buttonText: string
    highlight: boolean
    badge?: string
    features: PlanFeature[]
}