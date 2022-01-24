import { XHR_STATUS } from '../constants/commons.constants'

/**
 * Request error handler
 * @param response 
 * @returns 
 */
export const requestErrorHandler = (response: any) => {
    if (!response || response.fault) {
        throw new Error(`Server Error`)
    }
    if (!response.status) {
        return
    }
    if (![XHR_STATUS.SUCCESS, XHR_STATUS.CREATED, XHR_STATUS.VALIDATION, XHR_STATUS.NOT_FOUNDED].some(errorCode => errorCode === response?.status)) {
        throw new Error(`${response.status}`)
    }
}
