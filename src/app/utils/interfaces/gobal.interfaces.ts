export interface IUsers {
    id?: number;
    idRol?: number;
    user?: string;
    pwd?: string;
    nameUser?: string;
    email?: string;
    state?: boolean;
    resultStatus?: string;
}

export interface IUsersL {
    id?: number;
    idRol?: number;
    user?: string;
    pwd?: string;
    nameUser?: string;
    email?: string;
    admin?: boolean;
    state?: boolean;
    resultStatus?: string;
}

export interface IRoles {
    id?: number;
    nameRol?: string;
    admin?: boolean;
    state?: boolean;
    resultStatus?: string;
}

export interface ILines {
    id?: number;
    nameLine?: string;
    state?: boolean;
    resultStatus?: string;
}

export interface IProducts {
    id?: number;
    idLine?: number;
    nameProd?: string;
    descProd?: string;
    price?: number;
    stock?: number;
    minimum?: number;
    urlPicture?: string
    state?: boolean;
    resultStatus?: string;
}

export interface IProductsDTO {
    name?: string;
    description?: string;
    price?: number;
    picture?: string
    quantity?: number;
    dateSale?: Date;
    state?: boolean;
    resultStatus?: string;
}

export interface ISales {
    id?: number;
    idUser?: number;
    idProduct?: number;
    quantity?: number;
    dateSale?: Date;
    state?: boolean;
    resultStatus?: string;
}

export interface IWishes {
    id?: number;
    idUser?: number;
    idProduct?: number;
    state?: boolean;
    resultStatus?: string;
}