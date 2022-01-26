import './dashboard.css'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { DeviceModal, DeviceModalProps } from './device-modal'
import { Device } from '../../models/device.model'
import { DASH_CNTS, DEVICE } from './dashboard.constant'

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
            <div className="card">
                <div className="p-fluid formgrid grid">
                    <div className='field col-12 md:col-4'>
                        <label className='mr-1' htmlFor="filterBy">{DASH_CNTS.FILTERS.DEVICE.LBL}</label>
                        <Dropdown name="filterBy" options={DASH_CNTS.DEVICE_TYPES}
                            onChange={(e) => filterDevicesByType(e.value)}
                            placeholder={DASH_CNTS.FILTERS.DEVICE.PLH}
                            value={deviceType} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label className='mr-1' htmlFor="sortBy">{DASH_CNTS.FILTERS.SORT.LBL}</label>
                        <Dropdown name="sortBy" options={DASH_CNTS.SORT_TYPES}
                            onChange={(e) => sortDevices(e.value)}
                            placeholder={DASH_CNTS.FILTERS.SORT.PLH}
                            value={sortBy} />
                    </div>
                    <div className="field col-1 md:col-3 mt-4">
                        <Button className="p-button-raised" id="add_device_btn"
                            label={`${DASH_CNTS.BTN.ADD} ${DEVICE}`}
                            onClick={onAddDevice} />
                    </div>
                </div>
            </div>
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
