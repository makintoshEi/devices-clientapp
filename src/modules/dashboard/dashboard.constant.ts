export const DASH_CNTS = {
    COLUMNS: [
        { field: 'system_name', header: 'System name' },
        { field: 'type', header: 'Device type' },
        { field: 'hdd_capacity', header: 'HDD capacity' },
        { field: 'actions', header: 'Actions' }
    ],
    DEVICE_TYPES: [
        {
            label: 'All',
            value: 'all'
        },
        {
            label: 'Windows Workstation',
            value: 'WINDOWS_WORKSTATION'
        },
        {
            label: 'MAC',
            value: 'MAC'
        },
        {
            label: 'Windows Server',
            value: 'WINDOWS_SERVER'
        },
    ],
    FILTERS: {
        DEVICE: {
            PLH: 'Select a device',
            LBL: 'Device type'
        }
    }
}
