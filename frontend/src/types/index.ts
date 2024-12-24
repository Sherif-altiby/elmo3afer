export interface RegisterProps {
    name?: string;
    email: string;
    password: string;
    image?: File;
}

export interface  User{
    currentAverage: number;
    lastAverage: number;
    email: string;
    name: string;
    password: string;
    image: string;
    rates: [];
    _id: number | string;
    answer: string;
}

export interface LinkProps {
    title: string;
    value: string;
}