import { useEffect, useState } from 'react'
import { DashboardLoc } from './dashboard.loc'
import { getDevices } from '../../api/devices.api'
import { requestErrorHandler } from '../../util/commons.util'

export const Dashboard = () => {

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetchDevices()
    }, [])

    /**
     * Returns devices list
     */
    const fetchDevices = async () => {
        try {
            const response = await getDevices()
            requestErrorHandler(devices)
            setDevices(await response.json())
        } catch (err: any) {
            throw new Error(err)
        }
    }

    return (
        <DashboardLoc data={devices}></DashboardLoc>
    )
}
