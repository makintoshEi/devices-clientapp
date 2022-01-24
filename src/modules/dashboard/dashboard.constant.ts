export const DEVICE_TYPE = {
    ALL: 'all',
    MAC: 'MAC',
    WIN_WORKSTATION: 'WINDOWS_WORKSTATION',
    WIN_SERVER: 'WINDOWS_SERVER'
}

export const SORT_TYPE = {
    SYSTEM_NAME: 'system_name',
    HDD_CAPACITY: 'hdd_capacity'
}

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
            value: DEVICE_TYPE.ALL
        },
        {
            label: 'Windows Workstation',
            value: DEVICE_TYPE.WIN_WORKSTATION
        },
        {
            label: 'MAC',
            value: DEVICE_TYPE.MAC
        },
        {
            label: 'Windows Server',
            value: DEVICE_TYPE.WIN_SERVER
        },
    ],
    SORT_TYPES: [
        {
            label: 'HDD capacity',
            value: SORT_TYPE.HDD_CAPACITY
        },
        {
            label: 'System name',
            value: SORT_TYPE.SYSTEM_NAME
        }
    ],
    FILTERS: {
        DEVICE: {
            PLH: 'Select a device type',
            LBL: 'Device type: '
        },
        SORT: {
            PLH: 'Select a property',
            LBL: 'Sort by: '
        }
    }
}
