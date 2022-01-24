import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import { DASH_CNTS } from './dashboard.constant'

export interface DashboardProps {
    devices: any[]
    deviceType: string
    filterDevicesByType: any
    sortBy: string
    sortDevices: any
}

export const DashboardLoc = (props: DashboardProps) => {

    const { devices, deviceType, filterDevicesByType, sortBy, sortDevices } = props

    const getColumns = DASH_CNTS.COLUMNS.map(column => {
        return <Column key={column.field} field={column.field} header={column.header} />
    })

    return (
        <>
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
            <DataTable value={devices}>
                {getColumns}
            </DataTable>
        </>

    )
}
