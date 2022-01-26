import { useEffect, useRef, useState } from 'react'
import { Device } from '../../models/device.model'
import { DashboardLoc, DashboardProps } from './dashboard.loc'
import { confirmDialog } from 'primereact/confirmdialog'
import { createDevice, deleteDevice, getDevices, updateDevice } from '../../api/devices.api'
import { requestErrorHandler } from '../../util/commons.util'
import { DEVICE_TYPE, DIALOG, MSG, SORT_TYPE } from './dashboard.constant'
import { sortByName, sortByNumber } from '../../util/commons.util'

export const Dashboard = () => {
    const newDevices: Device[] = []
    const deviceIdType: any = ''

    // dashboard
    const [devices, setDevices] = useState(newDevices)
    const [deviceType, setDeviceType] = useState('')
    const [isFilteredByDevice, setIsFilteredByDevice] = useState(false)
    const [sortBy, setSortBy] = useState('')
    const [showModal, setShowModal] = useState(false)

    // form
    const [deviceId, setDeviceId] = useState(deviceIdType)
    const [deviceTypeForm, setDeviceTypeForm] = useState('')
    const [systemName, setSystemName] = useState('')
    const [hddCapacity, setHddCapacity] = useState('')
    const [isCreateFlow, setIsCreateFlow] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)

    // toast
    const toast = useRef<any>(null)

    useEffect(() => {
        requestDevices()
    }, [])

    /**
     * When is filtered by device
     */
    useEffect(() => {
        if (isFilteredByDevice && devices?.length > 0) {
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
        } catch (err) {
            showError()
            console.error(err)
        }
    }

    /**
     * Filters devices by type
     * @param type 
     */
    const filterDevicesByType = async (type: string) => {
        setDeviceType(type)
        setIsFilteredByDevice(true)
        setSortBy('')
        await requestDevices()
    }

    /**
     * Sort devices
     * @param property 
     */
    const sortDevices = (property: string) => {
        if (!devices) {
            showInfo(MSG.NO_DATA)
            return
        }
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
     * On click edit device
     */
    const onEditDevice = (device: Device) => {
        setIsCreateFlow(false)
        onShowModal()
        setDeviceId(device.id)
        setSystemName(device.system_name)
        setDeviceTypeForm(device.type)
        setHddCapacity(device.hdd_capacity)
    }

    /**
     * On click delete device
     */
    const onDeleteDevice = (device: Device) => {
        confirmDialog({
            message: `${DIALOG.MSG} ${device.system_name} ?`,
            header: DIALOG.HDR,
            icon: DIALOG.ICN,
            accept: () => requestDeleteDevice(device.id),
            reject: () => { }
        });
    }

    const requestDeleteDevice = async (id: any) => {
        try {
            const response = await deleteDevice(id)
            requestErrorHandler(response)
            requestDevices()
            showInfo(MSG.DELETED)
        } catch (err) {
            showError()
            console.log(err)
        }
    }

    /**
     * On accept modal
     */
    const onAcceptModal = async () => {
        try {
            const device: Device = {
                id: deviceId,
                hdd_capacity: hddCapacity,
                system_name: systemName,
                type: deviceTypeForm
            }
            onShowModal()
            if (isCreateFlow) {
                const response = await createDevice(device)
                requestErrorHandler(response)
                showSuccess(MSG.SAVED)
            } else {
                const response = await updateDevice(device)
                requestErrorHandler(response)
                showSuccess(MSG.UPDATED)
            }
            await requestDevices()
        } catch (err) {
            showError()
            console.error(err)
        }
    }

    /**
     * Success message
     * @param msg
     */
    const showSuccess = (msg: string) => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: msg,
            life: 4000
        });
    }

    /**
     * Info message
     * @param msg 
     */
    const showInfo = (msg: string) => {
        toast.current.show({
            severity: 'info',
            summary: 'Info',
            detail: msg
        });
    }

    /**
     * Error message
     * @param msg 
     */
    const showError = () => {
        toast.current.show({
            severity: MSG.ERROR.SEV,
            summary: MSG.ERROR.TTL,
            detail: MSG.ERROR.DES
        });
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
        onDeleteDevice,
        onEditDevice,
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
