import pointDetailsStyles from './PointDetails.module.css';

const ChainageBox = ({ children }) => (
    <div
        className={`${pointDetailsStyles.chainageBox}`}
    >
        {children}
    </div>
);

export const ItemCol2 = (props) => {
    const { col2 } = props;
    return (
        <>
            {/* Content for Column 2 */}
            <div
                className='cursor-pointer'
            >
                {col2 !==
                undefined ? (
                    <>
                        <p
                        >
                            {
                                col2
                            }
                        </p>
                    </>
                ) : (
                    <p>
                        No data
                        available
                    </p>
                )}
            </div>
        </>
    )
}

export const ItemCol3 = (props) => {
    const { row, col2, col3, splitChainage } = props;
    return (
        <>
            {/*  Column 3 */}
            {row === 4 ? (
                <div className='w-full h-full'>
                    {col3 !==
                    undefined ? (
                        <>
                            <p
                                className="flex flex-wrap h-full justify-start items-center w-full break-all cursor-pointer text-wrap"
                                style={{textWrap: 'auto'}}
                            >
                                {
                                    col3
                                }
                            </p>
                        </>
                    ) : (
                        <p>
                            No data
                            available
                        </p>
                    )}
                </div>
            ) : row === 2 ? (
                <div
                    className='cursor-pointer'
                >
                    {col2 ===
                    "Current Chainage" ? (
                        <div
                            className='flex items-center justify-center w-full'
                        >
                            <ChainageBox>
                                {splitChainage[0] &&
                                splitChainage[0]
                                    .length ===
                                    2
                                    ? splitChainage[0]
                                    : "00"}
                            </ChainageBox>
                            /{" "}
                            <ChainageBox>
                                {splitChainage[1] &&
                                splitChainage[1]
                                    .length ===
                                    3
                                    ? splitChainage[1]
                                    : "000"}
                            </ChainageBox>
                        </div>
                    ) : (
                        col3
                    )}
                </div>
            ) : (
                <p
                    className='cursor-pointer'
                    style={{textWrap: 'auto'}}
                >
                    {col3}
                </p>
            )}
        </>
    )
}