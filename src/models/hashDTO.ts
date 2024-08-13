

export interface HashDTO {
    hash: string,
    algorithm: Algorithm | null,
}

export interface PasswordDTO {
    password: string,
}

export enum Algorithm {
    MD5 = 'MD5',
    SHA1 = 'SHA-1',
}