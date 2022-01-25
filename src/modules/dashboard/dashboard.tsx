import { useEffect, useRef, useState } from 'react'
import { Device } from '../../models/device.model'
import { DashboardLoc, DashboardProps } from './dashboard.loc'
import { createDevice, getDevices } from '../../api/devices.api'
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
    const [isCreateFlow, setIsCreateFlow] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)

    // toast
    const toast = useRef<any>(null)

    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Device saved !',
            life: 3000
        });
    }

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

    /**
     * On click add device button
     */
    const onAddDevice = () => {
        setIsCreateFlow(true)
        onShowModal()
    }

    /**
     * On accept modal
     */
    const onAcceptModal = async () => {
        try {
            const device: Device = {
                hdd_capacity: hddCapacity,
                system_name: systemName,
                type: deviceTypeForm
            }
            onShowModal()
            if (isCreateFlow) {
                const response = createDevice(device)
                requestErrorHandler(response)
                showSuccess()
            }

            await requestDevices()
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Shows or hide modal
     */
    const onShowModal = () => {
        setShowModal(curVal => !curVal)
        cleanForm()
    }

    /**
     * Clean form values
     */
    const cleanForm = () => {
        setSystemName("")
        setDeviceTypeForm("")
        setHddCapacity("")
    }

    const props: DashboardProps = {
        devices,
        deviceType,
        filterDevicesByType,
        showModal,
        onAddDevice,
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
        isCreateFlow,
        isDisabled,
        toast,
    }

    return (
        <DashboardLoc {...props}></DashboardLoc>
    )
}
