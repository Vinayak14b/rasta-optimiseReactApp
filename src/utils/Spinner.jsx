import "../CSS/spinner.css";

export const Spinner = ({ height }) => {
    return (
        <>
            <div
                className={`flex justify-center items-center h-${
                    height ? height : "screen"
                }`}
            >
                <span className="loader"></span>
            </div>
        </>
    );
};
