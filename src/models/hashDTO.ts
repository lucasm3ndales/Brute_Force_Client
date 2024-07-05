

export interface HashDTO {
    hash: string,
    algorithm: Algorithm,
}

export enum Algorithm {
    MD5 = 'MD5',
    SHA1 = 'SHA1',
}