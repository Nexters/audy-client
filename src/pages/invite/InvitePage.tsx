import { useLayoutEffect } from 'react';

import { useLoaderData, useNavigate } from 'react-router-dom';

import { STATUS_CODE } from '@/constants/status';
import EditorLimitModal from '@/features/user/editor-limit-modal';
import InvalidInviteModal from '@/features/user/invalid-invite-modal';
import { useModal } from '@/hooks/useModal';

const InvitePage = () => {
    const navigate = useNavigate();
    const code =
        useLoaderData() as (typeof STATUS_CODE)[keyof typeof STATUS_CODE];

    const { openModal } = useModal();

    useLayoutEffect(() => {
        navigate('/', { replace: true });
        switch (code) {
            case STATUS_CODE.FAILED_DECRYPT: {
                openModal(<InvalidInviteModal />);
                break;
            }
            case STATUS_CODE.NOT_VALID_KEY: {
                openModal(<InvalidInviteModal />);
                break;
            }
            case STATUS_CODE.EXCEED_EDITOR_LIMIT: {
                openModal(<EditorLimitModal />);
                break;
            }
        }
    }, [code, navigate, openModal]);

    return <></>;
};

export default InvitePage;
