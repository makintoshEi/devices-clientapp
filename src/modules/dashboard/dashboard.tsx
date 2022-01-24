import { useEffect, useState } from 'react'
import { Device } from '../../models/device.model'
import { DashboardLoc, DashboardProps } from './dashboard.loc'
import { getDevices } from '../../api/devices.api'
import { requestErrorHandler } from '../../util/commons.util'
import { DEVICE_TYPE } from './dashboard.constant'

export const Dashboard = () => {
    const newDevices: Device[] = []
    const [devices, setDevices] = useState(newDevices)
    const [deviceType, setDeviceType] = useState('')
    const [isFilteredByDevice, setIsFilteredByDevice] = useState(false)

    useEffect(() => {
        requestDevices()
    }, [])

    /**
     * When is filtered by device
     */
    useEffect(() => {
        if (isFilteredByDevice && devices.length > 0) {
            if (deviceType === DEVICE_TYPE.ALL) {
                return
            }
            setDevices(devices.filter(device => device.type === deviceType))
            setIsFilteredByDevice(false)
        }
    }, [devices])

    /**
     * Fetch devices from endpoint
     */
    const requestDevices = async () => {
        setDevices(await fetchDevices())
    }

    /**
     * Returns devices list
     */
    const fetchDevices = async () => {
        try {
            const response = await getDevices()
            requestErrorHandler(response)
            return await response.json()
        } catch (err: any) {
            throw new Error(err)
        }
    }

    /**
     * Filters devices by type
     * @param type 
     */
    const filterDevicesByType = async (type: string) => {
        setDeviceType(type)
        setIsFilteredByDevice(true)
        await requestDevices()
    }

    const props: DashboardProps = {
        devices,
        deviceType,
        filterDevicesByType
    }

    return (
        <DashboardLoc {...props}></DashboardLoc>
    )
}
