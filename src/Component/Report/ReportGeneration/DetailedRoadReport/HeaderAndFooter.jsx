import './HeaderAndFooter.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DetailedReportIcons } from "../../../../assets/IconArray";

const HeaderAndFooter = ({ children, loading }) => {
    const navigate = useNavigate()
    const targetRef = useRef();

    const printAction = () => {
        window.print();
        navigate("/report")
    };

    return (
        <>
            <div className="not_display_in_print h-screen w-screen flex items-center justify-center">
                <div
                    className="flex flex-col justify-center items-center border-2 border-grey-300 rounded-lg"
                    style={{
                        height: "max(50%, 30rem)",
                        width: "min(90%, 40rem)",
                    }}
                >
                    <div className="downloadLogo h-[60%] flex flex-col justify-center items-center">
                        <img
                            className="h-[60%]"
                            src={DetailedReportIcons.DownloadIcon}
                            alt="Print Report"
                        />
                        <button
                            className="w-content h-content print-preview-button text-white bg-primary border-solid-2 rounded-lg font-semibold p-3"
                            onClick={printAction}
                            disabled={loading}
                        >
                            {loading
                                ? "Report is getting Generated..."
                                : "Print Preview of Report"}
                        </button>
                    </div>
                </div>
            </div>

            <table className="print-component" ref={targetRef}>
                <thead>
                    <tr>
                        <th>
                            <div>
                                <br />
                                <br />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="body_of_report w-full text-justify">
                            {children}
                        </td>
                    </tr>
                </tbody>
                <tfoot className="table-footer">
                    <tr>
                        <td>{'Rasta AI'}</td>
                        {/* <td>{"AI Unika"}</td> */}
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default HeaderAndFooter;
