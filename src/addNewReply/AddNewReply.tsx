import "./AddNewReply.styles.css";
import Button from "../button/Button";
import { FormEvent, useRef, useState, useContext } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { CommentType } from "../comment/Comment";
import { nanoid } from "nanoid";
import CurrentUserContext from "../contexts/CurrentUserContext";

interface AddNewReplyProps {
    closeReplyForm: () => void;
    addReply: (reply: CommentType) => void;
}

const AddNewReply = (props: AddNewReplyProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, () => props.closeReplyForm());

    const [content, setContent] = useState<string>("");
    const { currentUser } = useContext(CurrentUserContext);

    const handleAddNewReply = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newReply: CommentType = {
            id: nanoid(),
            content: content,
            createdAt: new Date().toLocaleString(),
            score: 0,
            user: {
                image: {
                    png: `https://robohash.org/${currentUser[0].username}.png`,
                },
                username: currentUser[0].username,
            },
            votedBy: [],
            edited: false,
        };

        if (!content || content.trim() === "") {
            alert("Reply content cannot be empty");
            return;
        }

        props.addReply(newReply);
        setContent("");
    };

    return (
        <>
            <div className="reply" ref={ref}>
                <div className="reply__photo">
                    <img
                        src={`https://robohash.org/${currentUser[0].username}.png`}
                        alt=""
                        className="reply__photo-user"
                    />
                </div>
                <form name="replyForm" className="reply__form">
                    <textarea
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        className="reply__textarea"
                        placeholder="Add a comment..."
                        maxLength={400}
                    ></textarea>
                    <Button buttonFunction={handleAddNewReply} category="form-action" className="reply__button">
                        Reply
                    </Button>
                </form>
            </div>
        </>
    );
};

export default AddNewReply;
