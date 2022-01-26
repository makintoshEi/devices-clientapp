import './dashboard.css'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Filters, FiltersProps } from './filters/filters'
import { DeviceModal, DeviceModalProps } from './device-modal'
import { Device } from '../../models/device.model'
import { DASH_CNTS } from './dashboard.constant'

export interface DashboardProps {
    devices: any[]
    deviceType: string
    filterDevicesByType: any
    onAddDevice: any
    onAcceptModal: any
    onDeleteDevice: any
    onEditDevice: any
    onShowModal: any
    showModal: boolean
    sortBy: string
    sortDevices: any

    deviceTypeForm: string
    setDeviceTypeForm: any
    hddCapacity: string
    setHddCapacity: any
    systemName: string
    setSystemName: any

    isCreateFlow: boolean
    isDisabled: boolean

    toast: any
}

export const DashboardLoc = (props: DashboardProps) => {

    const {
        devices, deviceType, filterDevicesByType,
        onAddDevice, onAcceptModal, onDeleteDevice, onEditDevice,
        onShowModal, showModal, sortBy, sortDevices,
        deviceTypeForm, setDeviceTypeForm, hddCapacity, setHddCapacity,
        systemName, setSystemName, isCreateFlow, isDisabled, toast } = props

    const hddCapacityTemplate = (device: Device) => {
        return `${device.hdd_capacity} GB`
    }

    const actionsTemplate = (device: Device) => {
        return (
            <>
                <Button icon="pi pi-pencil"
                    className="p-button-rounded p-button-outlined mr-2"
                    onClick={() => onEditDevice(device)} />
                <Button icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-outlined"
                    onClick={() => onDeleteDevice(device)} />
            </>
        )
    }

    const filtersProps: FiltersProps = {
        deviceType,
        filterDevicesByType,
        onAddDevice,
        sortBy,
        sortDevices
    }

    const deviceModalProps: DeviceModalProps = {
        isCreateFlow,
        isDisabled,
        onAcceptModal,
        onShowModal,
        deviceTypeForm,
        setDeviceTypeForm,
        hddCapacity,
        setHddCapacity,
        systemName,
        setSystemName,
        showModal
    }

    return (
        <div className="m-6">
            <Toast ref={toast} position="top-right" />
            <Filters {...filtersProps} />
            <DataTable value={devices} scrollable scrollHeight="500px">
                <Column field={DASH_CNTS.COLUMNS[0].field} header={DASH_CNTS.COLUMNS[0].header}></Column>
                <Column field={DASH_CNTS.COLUMNS[1].field} header={DASH_CNTS.COLUMNS[1].header}></Column>
                <Column field={DASH_CNTS.COLUMNS[2].field} header={DASH_CNTS.COLUMNS[2].header}
                    body={hddCapacityTemplate}></Column>
                <Column header={DASH_CNTS.COLUMNS[3].header}
                    body={actionsTemplate}></Column>
            </DataTable>

            <DeviceModal {...deviceModalProps} />
        </div>

    )
}
