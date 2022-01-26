import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { DASH_CNTS, DEVICE } from '../dashboard.constant'

export interface FiltersProps {
    deviceType: string
    filterDevicesByType: any
    onAddDevice: any
    sortBy: string
    sortDevices: any
}

export const Filters = (props: FiltersProps) => {

    const { deviceType, filterDevicesByType, onAddDevice, sortBy, sortDevices } = props

    return (
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
    )

}
