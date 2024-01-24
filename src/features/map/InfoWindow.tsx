interface PropsType {
    name: string;
    address: string;
    // isPinned: boolean;
}

export default function InfoWindow({
    name,
    address,
    // isPinned,
}: PropsType) {
    // TODO: isPinned에 따라서 버튼 스타일 변경

    return /* html */ `
        <div style="${layoutStyle}">
            <div style="${windowStyle}">
                <div>
                    <p style="${nameStyle} ${textStyle}">${name}</p>
                    <p style="${addressStyle} ${textStyle}">${address}</p>
                </div>
                <button style="${buttonStyle}"></button>
        
            </div>
        </div>
    `;
}

const layoutStyle = `
    background-color: transparent;
    padding: 0 0 50px 0;
    width: 338px;
`;

const windowStyle = `
    align-items: center;
    background-color: white;
    border: 1px solid #6B7280;
    border-radius: 14px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 18px 32px 16px 32px; 
    width: 100%;
`;

const textStyle = `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 230px;
`;

const nameStyle = `
    color: #111827;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 4px 0;
`;

const addressStyle = `
    color: #9CA3AF;
    font-size: 15px;
    margin: 0px;
`;

const buttonStyle = `
    background-color: white;
    border: 1px solid #E5E7EB;
    border-radius: 10px;
    padding: 16px;
`;
