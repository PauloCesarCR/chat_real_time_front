import Cookies from 'js-cookie';

interface CookieOptions {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
}

// Definir um cookie
export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
    Cookies.set(name, value, options);
};

// Obter o valor de um cookie
export const getCookie = (name: string): string | undefined => {
    return Cookies.get(name);
};

// Excluir um cookie
export const removeCookie = (name: string): void => {
    Cookies.remove(name);
}