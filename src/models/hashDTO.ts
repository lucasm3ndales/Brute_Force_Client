

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
    SHA256 = 'SHA-256',
    SHA512 = 'SHA-512',
    NTLM = 'NTLM',
}