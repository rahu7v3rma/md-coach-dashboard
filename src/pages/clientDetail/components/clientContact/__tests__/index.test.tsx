import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';

import ClientContact from '..';
import Envelop from 'src/assets/envelop.svg';
import Phone from 'src/assets/phone.svg';

describe('ClientContact', () => {
    it('ClientContact Snapshot', () => {
        const tree = create(<ClientContact />);
        expect(tree).toMatchSnapshot();
    });

    it('renders ClientContact component with all props', () => {
        const tree = create(
            <ClientContact
                phoneNumber="123456789"
                email="admin@gmail.com"
                age="10"
                type="admin"
            />
        );
        let clientContactProps = tree.root.findByProps({
            phoneNumber: '123456789',
            email: 'admin@gmail.com',
            age: '10',
            type: 'admin'
        }).props;

        expect(clientContactProps).toBeTruthy();
    });

    it('renders ClientContact component with missing props', () => {
        const tree = create(<ClientContact />);
        expect(tree).toBeTruthy();
    });

    it('ClientContact phone and email icons are displayed', () => {
        const tree = create(<ClientContact />);
        const phoneIcon = tree.root.findByProps({ id: 'phoneIcon' }).props;
        const emailIcon = tree.root.findByProps({ id: 'emailIcon' }).props;
        expect(phoneIcon.src).toEqual(Phone);
        expect(emailIcon.src).toEqual(Envelop);
    });

    it('ClientContact age and type buttons are displayed', () => {
        const tree = create(<ClientContact />);
        const ageButton = tree.root.findByProps({ id: 'ageButton' }).props;
        const typeButton = tree.root.findByProps({ id: 'typeButton' }).props;
        expect(ageButton).toBeTruthy();
        expect(typeButton).toBeTruthy();
    });

    it('ClentContact age and type buttons have correct styling', async () => {
        const { getByTestId } = render(<ClientContact />);
        const ageButton = getByTestId('ageButton');
        const typeButton = getByTestId('typeButton');
        expect(ageButton).toHaveStyle(
            `padding: 8px 12px;color: #271A51;border-color: #ffffff;background-color: #ffffff;border-radius: 10px;font-size: 14px;`
        );
        expect(typeButton).toHaveStyle(
            `padding: 8px 20px;color: #271A51;border-color: #ffffff;background-color: #ffffff;border-radius: 10px;font-size: 14px;`
        );
    });
});
