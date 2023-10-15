export interface Asset {
    src: string,
    alt: string
    type: string
}

export interface AssetList {
    title?: string,
    assets: Asset[]
}