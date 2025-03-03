import React from 'react';
import { act, create } from 'react-test-renderer';

import Avatar from '..';
import DefaultAvatarIcon from '../../../assets/default-avatar.svg';

global.URL.createObjectURL = jest
    .fn()
    .mockReturnValue('blob:d3958f5c-0777-0845-9dcf-2cb28783acaf');

jest.mock('src/services/image', () => ({
    uploadImage: jest.fn().mockResolvedValue('default-path'),
    getFileContentType: jest.fn().mockResolvedValue('image/png')
}));

describe('Avatar', () => {
    it('Avatar renders without crashing', () => {
        const tree = create(<Avatar />);
        expect(tree).toBeTruthy();
    });

    it('Avatar  renders default avatar when no path is provided', () => {
        const tree = create(<Avatar />);
        const avatar = tree.root.findByProps({
            id: 'defaultAvatar'
        }).props;
        expect(avatar.src).toBe(DefaultAvatarIcon);
    });

    it('Avatar renders an image when path is provided', async () => {
        const tree = await act(() => create(<Avatar path="default-path" />));
        const avatar = tree.root.findByProps({
            imageId: 'default-path'
        }).props;
        expect(avatar.imageId).toBe('default-path');
    });

    it('Avatar onNewAvatarUpload callback is called when a new avatar is uploaded', async () => {
        const mockOnNewAvatarUpload = jest.fn();
        const tree = create(
            <Avatar editable onNewAvatarUpload={mockOnNewAvatarUpload} />
        );
        const handleSelectedFileChanged = tree.root.findByProps({
            id: 'handleSelectedFileChanged'
        }).props;

        await act(async () => {
            handleSelectedFileChanged.onChange({
                currentTarget: {
                    files: [new File([''], 'image.png')]
                }
            });
        });
        expect(mockOnNewAvatarUpload).toHaveBeenCalled();
    });

    it('Avatar Edit overlay is displayed when the component is editable', () => {
        const tree = create(<Avatar editable={true} />);
        const avatar = tree.root.findByProps({
            id: 'editOverlay'
        }).props;
        expect(avatar).toBeTruthy();
    });

    it('Avatar Edit overlay is not displayed when the component is not editable', () => {
        const tree = create(<Avatar editable={false} />);
        let avatar;
        try {
            avatar = tree.root.findByProps({
                id: 'editOverlay'
            }).props;
        } catch (error) {}

        expect(avatar).toBeUndefined();
    });
});
