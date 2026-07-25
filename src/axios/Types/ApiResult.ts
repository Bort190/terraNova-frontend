export type LaravelResource<T> = {
    data: T;
};

export type LaravelPaginated<T> = {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    }
};

export type SuccessResult<T> = {
    status: true;
    data: T;
};

export type ValidationFailResult = {
    status: false;
    type: "validation";
    messages: {
        [field: string]: string[];
    };
};

export type ServerFailResult = {
    status: false;
    type: "server";
    message: string;
};

export type FailResult = ValidationFailResult | ServerFailResult;

export type ApiResult<T> = SuccessResult<T> | FailResult;