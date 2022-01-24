import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { DASH_CNTS } from './dashboard.constant'

interface DashboardProps {
    data: any[]
}

export const DashboardLoc = (props: DashboardProps) => {
    const { data } = props

    const getColumns = DASH_CNTS.COLUMNS.map(column => {
        return <Column key={column.field} field={column.field} header={column.header} />
    })

    return (
        <DataTable value={data}>
            {getColumns}
        </DataTable>
    )
}
