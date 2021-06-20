interface IResponse {
    statusCode: number,
    status: string,
    message: any
}

export const responseMessage = {
    message: (statusCode: number = 200, message: any = "success"): IResponse => {
        return {
            statusCode, status: statusCode === 200 ? "Success" : "Error", message
        }
    }
}