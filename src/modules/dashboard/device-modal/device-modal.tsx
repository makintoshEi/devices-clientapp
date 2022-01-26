import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { DASH_CNTS, DEVICE, DEVICE_TYPE } from '../dashboard.constant'

export interface DeviceModalProps {
    isCreateFlow: boolean
    isDisabled: boolean
    onAcceptModal: any
    onShowModal: any
    deviceTypeForm: string
    setDeviceTypeForm: any
    hddCapacity: string
    setHddCapacity: any
    systemName: string
    setSystemName: any
    showModal: boolean
}
export const DeviceModal = (props: any) => {

    const { isCreateFlow, isDisabled, onAcceptModal, onShowModal,
        deviceTypeForm, setDeviceTypeForm, hddCapacity, setHddCapacity,
        systemName, setSystemName, showModal } = props

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
        <Dialog
            footer={footer}
            header={isCreateFlow ? `${DASH_CNTS.BTN.ADD} ${DEVICE}` : `${DASH_CNTS.BTN.UPDATE} ${DEVICE}`}
            onHide={onShowModal}
            style={{ width: '50vw' }}
            visible={showModal} >
            <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-4">
                    <label htmlFor={DASH_CNTS.COLUMNS[0].field}>{DASH_CNTS.COLUMNS[0].header}</label>
                    <InputText id={DASH_CNTS.COLUMNS[0].field} value={systemName} onChange={(e) => setSystemName(e.target.value)} />
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
                    <InputText id={DASH_CNTS.COLUMNS[2].field} value={hddCapacity} onChange={(e) => {
                        (DASH_CNTS.ONLY_NUMBERS.test(e.target.value) || e.target.value.length === 0) && setHddCapacity(e.target.value)
                    }} />
                </div>
            </div>
        </Dialog>
    )
}
