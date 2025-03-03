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
            <ClientContact phoneNumber="123456789" email="admin@gmail.com" />
        );
        let clientContactProps = tree.root.findByProps({
            phoneNumber: '123456789',
            email: 'admin@gmail.com'
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
});
