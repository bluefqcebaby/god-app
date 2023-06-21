import { AxiosError, AxiosResponse } from 'axios'

export const handleRequest = async <T>(
  promise: Promise<AxiosResponse<T>>,
): Promise<[AxiosResponse<T>, null] | [null, AxiosError]> => {
  try {
    const response = await promise
    return [response, null]
  } catch (e) {
    const err = e as AxiosError
    return [null, err]
  }
}
