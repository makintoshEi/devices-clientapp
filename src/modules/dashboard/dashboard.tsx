import { useEffect, useState } from 'react'
import { Device } from '../../models/device.model'
import { DashboardLoc } from './dashboard.loc'
import { getDevices } from '../../api/devices.api'
import { requestErrorHandler } from '../../util/commons.util'
import { DEVICE_TYPE } from './dashboard.constant'

export const Dashboard = () => {
    const newDevices: Device[] = []
    const [devices, setDevices] = useState(newDevices)
    const [filteredDevices, setFilteredDevices] = useState(newDevices)
    const [deviceType, setDeviceType] = useState('')

    useEffect(() => {
        fetchDevices()
    }, [])

    /**
     * Returns devices list
     */
    const fetchDevices = async () => {
        try {
            const response = await getDevices()
            requestErrorHandler(response)
            const devices = await response.json()
            setDevices(devices)
            setFilteredDevices(devices)
        } catch (err: any) {
            throw new Error(err)
        }
    }

    /**
     * Filters devices by type
     * @param type 
     */
    const filterDevicesByType = (type: string) => {
        setDeviceType(type)
        if (type === DEVICE_TYPE.ALL) {
            setFilteredDevices(devices)
            return
        }
        setFilteredDevices(devices.filter(device => device.type === type))
    }

    return (
        <DashboardLoc devices={filteredDevices} deviceType={deviceType} filterDevices={filterDevicesByType}></DashboardLoc>
    )
}
