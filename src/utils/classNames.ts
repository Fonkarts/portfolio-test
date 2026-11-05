type ClassValue = string | false | null | undefined

/** Concatène des classes CSS en ignorant les valeurs falsy (utile pour les modificateurs BEM). */
export function cx(...classes: ClassValue[]): string {
    return classes.filter(Boolean).join(' ')
}
