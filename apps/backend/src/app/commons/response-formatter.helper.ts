export class ResponseFormatterHelper<T> {
    static succes<T>(data: T, message = 'Successful Operation') {
        return {
            status: 'success',
            message,
            data,
        }
    }

    static update<T>(oldData: T, newData: T, message = 'Successful update'){
        return {
            status: 'success',
            message,
            data: [
                {
                    object: 'OLD',
                    data: oldData
                },
                {
                    object: 'NEW',
                    data: newData
                }
            ]
        }
    }

    static error(message = 'An error occured', error?: any) {
        return {
            status: 'error',
            message,
            error: error ?? null,
        };
    }
}