import InvitePageTypes from '../types';

declare namespace InviteCard {
    type Props = InvitePageTypes.Invite;
    type State = {
        copied: boolean
    };
}

export default InviteCard;