import { useEffect, useState } from 'react'
import { Device } from '../../models/device.model'
import { DashboardLoc, DashboardProps } from './dashboard.loc'
import { getDevices } from '../../api/devices.api'
import { requestErrorHandler } from '../../util/commons.util'
import { DEVICE_TYPE, SORT_TYPE } from './dashboard.constant'
import { sortByName } from '../../util/commons.util'

export const Dashboard = () => {
    const newDevices: Device[] = []
    const [devices, setDevices] = useState(newDevices)
    const [deviceType, setDeviceType] = useState('')
    const [isFilteredByDevice, setIsFilteredByDevice] = useState(false)
    const [sortBy, setSortBy] = useState('')

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

    /**
     * 
     * @param property 
     */
    const sortDevices = (property: string) => {
        setSortBy(property)
        setDevices(property === SORT_TYPE.HDD_CAPACITY ?
            devices.sort((a, b) => +a.hdd_capacity - +b.hdd_capacity) :
            devices.sort((a, b) => sortByName(a, b, property)))
    }

    const props: DashboardProps = {
        devices,
        deviceType,
        filterDevicesByType,
        sortBy,
        sortDevices
    }

    return (
        <DashboardLoc {...props}></DashboardLoc>
    )
}
