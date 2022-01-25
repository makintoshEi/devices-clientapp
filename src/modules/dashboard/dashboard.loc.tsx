import './dashboard.css'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { DASH_CNTS, DEVICE, DEVICE_TYPE } from './dashboard.constant'

export interface DashboardProps {
    devices: any[]
    deviceType: string
    filterDevicesByType: any
    onAddDevice: any
    onAcceptModal: any
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
        onAddDevice, onAcceptModal, onShowModal,
        showModal, sortBy, sortDevices,
        deviceTypeForm, setDeviceTypeForm, hddCapacity, setHddCapacity,
        systemName, setSystemName, isCreateFlow, isDisabled, toast } = props

    const getColumns = DASH_CNTS.COLUMNS.map(column => {
        return <Column key={column.field} field={column.field} header={column.header} />
    })

    const footer = (
        <div>
            <Button className="p-button-text" label="No" icon="pi pi-times" onClick={onShowModal} />
            <Button disabled={isDisabled}
                label={isCreateFlow ? DASH_CNTS.BTN.SAVE : DASH_CNTS.BTN.UPDATE}
                icon="pi pi-check"
                onClick={onAcceptModal} />
        </div>
    );

    return (
        <>
            <Toast ref={toast} position="top-right" />
            <div className='mb-3'>
                <label className='mr-1' htmlFor="filterBy">{DASH_CNTS.FILTERS.DEVICE.LBL}</label>
                <Dropdown name="filterBy" options={DASH_CNTS.DEVICE_TYPES}
                    onChange={(e) => filterDevicesByType(e.value)}
                    placeholder={DASH_CNTS.FILTERS.DEVICE.PLH}
                    value={deviceType} />
            </div>
            <div className='ml-3 mb-3'>
                <label className='mr-1' htmlFor="sortBy">{DASH_CNTS.FILTERS.SORT.LBL}</label>
                <Dropdown name="sortBy" options={DASH_CNTS.SORT_TYPES}
                    onChange={(e) => sortDevices(e.value)}
                    placeholder={DASH_CNTS.FILTERS.SORT.PLH}
                    value={sortBy} />
            </div>
            <div>
                <Button className="p-button-raised" id="add_device_btn"
                    label={`${DASH_CNTS.BTN.ADD} ${DEVICE}`}
                    onClick={onAddDevice} />
            </div>
            <DataTable value={devices}>
                {getColumns}
            </DataTable>

            <Dialog
                footer={footer}
                header={isCreateFlow ? `${DASH_CNTS.BTN.ADD} ${DEVICE}` : `${DASH_CNTS.BTN.UPDATE} ${DEVICE}`}
                onHide={onShowModal}
                style={{ width: '50vw' }}
                visible={showModal} >
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor={DASH_CNTS.COLUMNS[0].field}>{DASH_CNTS.COLUMNS[0].header}</label>
                        <InputText id="" value={systemName} onChange={(e) => setSystemName(e.target.value)} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor={DASH_CNTS.COLUMNS[1].field}>{DASH_CNTS.COLUMNS[1].header}</label>
                        <Dropdown id={DASH_CNTS.COLUMNS[1].field} options={DASH_CNTS.DEVICE_TYPES.filter(devTyp => devTyp.value !== DEVICE_TYPE.ALL)}
                            onChange={(e) => setDeviceTypeForm(e.value)}
                            placeholder={DASH_CNTS.FILTERS.DEVICE.PLH}
                            value={deviceTypeForm} />
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor={DASH_CNTS.COLUMNS[2].field}>{DASH_CNTS.COLUMNS[2].header}</label>
                        <InputText id="" value={hddCapacity} onChange={(e) => setHddCapacity(e.target.value)} />
                    </div>
                </div>
            </Dialog>
        </>

    )
}
