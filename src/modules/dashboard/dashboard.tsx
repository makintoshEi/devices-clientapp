import { useEffect, useState } from 'react'
import { Device } from '../../models/device.model'
import { DashboardLoc, DashboardProps } from './dashboard.loc'
import { getDevices } from '../../api/devices.api'
import { requestErrorHandler } from '../../util/commons.util'
import { DEVICE_TYPE, SORT_TYPE } from './dashboard.constant'
import { sortByName, sortByNumber } from '../../util/commons.util'

export const Dashboard = () => {
    const newDevices: Device[] = []
    const [devices, setDevices] = useState(newDevices)
    const [deviceType, setDeviceType] = useState('')
    const [isFilteredByDevice, setIsFilteredByDevice] = useState(false)
    const [sortBy, setSortBy] = useState('')
    const [showModal, setShowModal] = useState(false)

    // form
    const [deviceTypeForm, setDeviceTypeForm] = useState('')
    const [systemName, setSystemName] = useState('')
    const [hddCapacity, setHddCapacity] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

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
     * Enables or disables action on modal
     */
    useEffect(() => {
        (deviceTypeForm && systemName && hddCapacity) ? setIsDisabled(false) : setIsDisabled(true)
    }, [deviceTypeForm, systemName, hddCapacity])

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
     * Sort devices
     * @param property 
     */
    const sortDevices = (property: string) => {
        setSortBy(property)
        setDevices(property === SORT_TYPE.HDD_CAPACITY ?
            devices.sort((a, b) => sortByNumber(a, b, property)) :
            devices.sort((a, b) => sortByName(a, b, property)))
    }

    const onAcceptModal = () => {

    }

    /**
     * Shows or hide modal
     */
    const onShowModal = () => {
        console.log('showing modal')
        setShowModal(curVal => !curVal)
    }

    const props: DashboardProps = {
        devices,
        deviceType,
        filterDevicesByType,
        showModal,
        onAcceptModal,
        onShowModal,
        sortBy,
        sortDevices,
        deviceTypeForm,
        setDeviceTypeForm,
        systemName,
        setSystemName,
        hddCapacity,
        setHddCapacity,
        isDisabled
    }

    return (
        <DashboardLoc {...props}></DashboardLoc>
    )
}
