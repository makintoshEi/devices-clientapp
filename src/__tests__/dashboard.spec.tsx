import { Dashboard } from '../modules/dashboard/dashboard'
import { act, render, screen, waitFor } from '@testing-library/react'
import { getDevices } from '../api/devices.api'
import userEvent from '@testing-library/user-event'

jest.mock('../api/devices.api')
describe('<Dashboard /> suite', () => {

    it('Should render Dashboard with no options available', async () => {
        await waitFor(() => {
            render(<Dashboard />)
        })
        expect(screen.getByText(/No available options/)).toBeTruthy()
        expect(screen.getByText(/Please contact the administrator/)).toHaveTextContent('Please contact the administrator')
    })

    it('Should render Dashboard with records on table', async () => {
        getDevices.mockReturnValue({
            status: 200,
            json: () => new Promise((resolve) => resolve([
                {
                    "id": "e8okoP2l5",
                    "system_name": "DESKTOP-SMART",
                    "type": "WINDOWS_WORKSTATION",
                    "hdd_capacity": "10"
                },
                {
                    "id": "Th3ngERn9",
                    "system_name": "MAC-LEADER",
                    "type": "MAC",
                    "hdd_capacity": "2048"
                },
                {
                    "id": "Q1JdBnE12",
                    "system_name": "ARMANDO-SERVER",
                    "type": "WINDOWS_SERVER",
                    "hdd_capacity": "256"
                },
                {
                    "id": "e7ocoQ2n3",
                    "system_name": "MIGUEL-PC",
                    "type": "WINDOWS_WORKSTATION",
                    "hdd_capacity": "500"
                }
            ]))
        })
        await waitFor(() => {
            render(<Dashboard />)
        })
        screen.debug()
        expect(screen.getByText(/ARMANDO/)).toHaveTextContent('ARMANDO-SERVER')
    })
})
