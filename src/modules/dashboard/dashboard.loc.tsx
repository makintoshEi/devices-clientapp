import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import { DASH_CNTS } from './dashboard.constant'

interface DashboardProps {
    devices: any[]
    deviceType: string
    filterDevices: any
}

export const DashboardLoc = (props: DashboardProps) => {

    const { devices, deviceType, filterDevices } = props

    const getColumns = DASH_CNTS.COLUMNS.map(column => {
        return <Column key={column.field} field={column.field} header={column.header} />
    })

    return (
        <>
            <div className='mb-3'>
                <label className='mr-1' htmlFor="filterBy">{DASH_CNTS.FILTERS.DEVICE.LBL}</label>
                <Dropdown name="filterBy" options={DASH_CNTS.DEVICE_TYPES}
                    onChange={(e) => filterDevices(e.value)}
                    placeholder={DASH_CNTS.FILTERS.DEVICE.PLH}
                    value={deviceType} />
            </div>
            <DataTable value={devices}>
                {getColumns}
            </DataTable>
        </>

    )
}
