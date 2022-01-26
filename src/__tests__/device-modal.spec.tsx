import { DeviceModal, DeviceModalProps } from '../modules/dashboard/device-modal/device-modal'
import { render, screen } from '@testing-library/react'

describe('<DeviceModal> suite', () => {

    it('Should render Update device as header', () => {
        const props: DeviceModalProps = {
            isCreateFlow: false,
            isDisabled: true,
            onAcceptModal: jest.fn(),
            onShowModal: jest.fn(),
            deviceTypeForm: 'all',
            setDeviceTypeForm: jest.fn(),
            hddCapacity: '',
            setHddCapacity: jest.fn(),
            systemName: '',
            setSystemName: jest.fn(),
            showModal: true
        }
        render(<DeviceModal {...props} />)
        expect(screen.getByText(/Update device/)).toBeTruthy()
    })
})
