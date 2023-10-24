export interface Asset {
    id: string;
    src: string;
    alt: string;
    type: string;
}

export interface s3PathInterface {
    ETag: string;
    ServerSideEncryption: string;
    VersionId: string;
    Location: string;
    Key: string;
    Bucket: string;
}
