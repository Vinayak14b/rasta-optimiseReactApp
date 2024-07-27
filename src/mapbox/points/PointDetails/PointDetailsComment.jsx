import { pointDetailIcons } from "../../../assets/IconArray";
import { useState } from "react";

const orangeThemeColor = "#fe6100";
const grayThemeColor = "#d1d5db";

export const scrollToComments = () => {
    setTimeout(() => {
        document.getElementById("commentForm").scrollIntoView({
            behavior: "smooth",
        });
    }, 200);
};

export const CommentContainer = ({ children }) => {
    return (
        <div
            id="comments"
            className="flex flex-col justify-center items-center w-[90%] my-2"
        >
            {children}
        </div>
    );
};

export const CommentTitle = ({ showComment, setShowComment }) => {
    return (
        <div className="flex justify-start items-center w-full my-2">
            <div
                className="flex p-2 rounded-lg cursor-pointer items-center text-xs font-bold font-inter"
                onClick={() => {
                    setShowComment((prev) => !prev);
                    scrollToComments();
                }}
                style={{
                    border: `1px solid ${
                        showComment ? orangeThemeColor : grayThemeColor
                    }`,
                }}
            >
                <img
                    src={pointDetailIcons.pointcomment}
                    alt="Message Icon"
                    className="w-6 h-6 ml-1"
                />
                <span className="pl-3 text-sm font-bold">Comments</span>
            </div>
        </div>
    );
};

export const CommentForm = ({
    commentInput,
    setCommentInput,
    handleButtonClick,
    setShowComment,
}) => {
    const [inputActive, setInputActive] = useState();
    return (
        <div
            id="commentForm"
            className="flex flex-col my-2 w-full rounded-lg border p-2"
            style={{
                borderColor: `${
                    inputActive ? orangeThemeColor : grayThemeColor
                }`,
            }}
        >
            <textarea
                className="w-full border-b text-sm border-gray-300 p-3 font-inter"
                rows={2}
                placeholder="Enter your comment here..."
                id="commentTextArea"
                value={commentInput}
                onFocus={() => {
                    setInputActive(true);
                }}
                onBlur={() => {
                    setInputActive(false);
                }}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        handleButtonClick();
                    }
                }}
                style={{
                    outline: "none",
                }}
            ></textarea>
            <div className="w-full flex justify-end items-center mt-2">
                <button
                    className="px-4 cursor-pointer py-2 text-sm font-semibold text-gray-500 border border-gray-400 rounded-lg mr-2"
                    onClick={() => {
                        setCommentInput("");
                        setShowComment(false);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="px-4 cursor-pointer py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg mr-2"
                    onClick={() => {
                        handleButtonClick();
                    }}
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export const CommentBox = ({ children }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full mt-2 p-1">
            {children}
        </div>
    );
};

export const CommentItem = ({ comment }) => {
    return (
        <div
            className="flex flex-col justify-center items-center border-b border-gray-300 mb-2 w-full"
            key={comment._id}
        >
            <div className="flex flex-col justify-center items-left w-full mb-2">
                <p className="font-bold text-sm text-left">
                    {comment?.user_details}
                </p>
                <p className="font-medium text-xs text-left text-gray-700">
                    {comment?.office_level}
                </p>
            </div>
            <div className="flex w-full gap-x-3 justify-start items-center font-bold text-gray-700">
                { /*<p>&#8226;</p>*/}
                <p
                    className={`text-justify font-bold text-xs break-words`}
                    style={{
                        whiteSpace: 'pre-line',
                    }}
                >
                    {comment?.comment}
                </p>
            </div>
        </div>
    );
};
