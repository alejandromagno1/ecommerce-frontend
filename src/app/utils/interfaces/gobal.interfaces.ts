export interface IAgencies {
    id?: number;
    name?: string;
    state?: boolean;
    resultStatus?: string;
}

export interface IRoles {
    id?: number;
    name?: string;
    state?: boolean;
    resultStatus?: string;
}

export interface IUsers {
    id?: number;
    user?: string;
    pass?: string;
    name?: string;
    mail?: string;
    idRol?: number;
    idAgency?: number;
    data?: boolean;
    enabled?: boolean;
    state?: boolean;
    resultStatus?: string;
}

export interface IQuestions {
    id?: number;
    idType?: number;
    seq?: number;
    question?: string;
    enabled?: boolean;
    state?: boolean;
    resultStatus?: string;
}

export interface IAnswers {
    id?: number;
    idQuestion?: number;
    seq?: number;
    answer?: string;
    state?: boolean;
    resultStatus?: string;
}

export interface IUserVotes {
    id?: number;
    idUser?: number;
    idQuestion?: number;
    idAnswer?: number;
    resultStatus?: string;
}

export interface IOnLine {
    id?: number;
    idUser?: number;
    resultStatus?: string;
}

export interface IEnabledVotes {
    totalUsr?: number;
    totalOnline?: number;
    totalVotes?: number;
    resultStatus?: string;
}

export interface ICountVotes {
    answer?: string;
    totalVotes?: number;
    resultStatus?: string;
}

export interface IUsersVotes {
    name?: string;
    agency?: string;
    resultStatus?: string;
}