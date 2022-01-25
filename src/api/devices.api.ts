import { del, get, post, put } from '../util/HttpClient'
import { ENDPOINT } from '../constants/endpoints'
import { Device } from '../models/device.model'

const createDevice = async (device: Device) => {
    return await post(ENDPOINT.DEVICE, device)
}

const deleteDevice = async (deviceId: string) => {
    return await del(`${ENDPOINT.DEVICE}/${deviceId}`)
}

const getDevices = async () => {
    return await get(ENDPOINT.DEVICE)
}

const getDevice = async (deviceId: string) => {
    return await get(`${ENDPOINT.DEVICE}/${deviceId}`)
}


const updateDevice = async (device: Device) => {
    return await put(`${ENDPOINT.DEVICE}/${device.id}`, device)
}

export { createDevice, deleteDevice, getDevices, getDevice, updateDevice }
