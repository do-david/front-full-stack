export interface IRemoteDataInit {
    status: 'init';
}

export interface IRemoteDataLoading {
    status: 'loading';
}

export interface IRemoteDataLoaded<T> {
    status: 'loaded';
    payload: T;
}

export interface IRemoteDataError {
    status: 'error';
    error?: Error;
    message?: string;
}

export type RemoteData<T> = 
    | IRemoteDataInit
    | IRemoteDataLoading
    | IRemoteDataLoaded<T>
    | IRemoteDataError;