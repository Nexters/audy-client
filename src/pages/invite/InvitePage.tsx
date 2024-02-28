import { useLayoutEffect } from 'react';

import { useLoaderData, useNavigate } from 'react-router-dom';

import { STATUS_CODE } from '@/constants/status';
import MemberLimitModal from '@/features/course/invail-link-modal';
import InvalidLinkModal from '@/features/course/member-limit-modal';
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
                openModal(<InvalidLinkModal />);
                break;
            }
            case STATUS_CODE.NOT_VALID_KEY: {
                openModal(<InvalidLinkModal />);
                break;
            }
            case STATUS_CODE.EXCEED_EDITOR_LIMIT: {
                openModal(<MemberLimitModal />);
                break;
            }
        }
    }, [code, navigate, openModal]);

    return <></>;
};

export default InvitePage;
