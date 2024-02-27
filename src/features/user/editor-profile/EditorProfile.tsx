import * as S from './EditorProfile.css';

interface PropsType {
    isOnline: boolean;
    profileImageUrl?: string;
    editorName: string;
}

const EditorProfile = ({
    isOnline,
    profileImageUrl,
    editorName,
}: PropsType) => {
    const profileAlt = `${editorName}의 프로필 사진`;

    return (
        <div className={S.profileImageWrapper}>
            <img
                src={profileImageUrl}
                alt={profileAlt}
                className={S.profileImage}
            />
            <div className={S.profileImageInnerBorder} />
            <div className={S.profileImageOuterBorder({ isOnline })} />
        </div>
    );
};

export default EditorProfile;
