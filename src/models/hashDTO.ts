

export interface HashDTO {
    hash: string,
    algorithm: Algorithm | null,
}

export enum Algorithm {
    MD5 = 'MD5',
    SHA1 = 'SHA1',
    HPC = 'HPC',
    FEAL4 = 'FEAL-4',
    TEA = 'TEA',
    RC5 = 'RC5',
    DES = 'DES'
}