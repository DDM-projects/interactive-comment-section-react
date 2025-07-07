import "./AddNewComment.styles.css";
import Button from "../button/Button";
import { CommentType } from "../comment/Comment";
import { nanoid } from "nanoid";
import { FormEvent, useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

interface NewCommentProps {
    addComment: (comment: CommentType) => void;
}

const AddNewComment = (props: NewCommentProps) => {
    const [content, setContent] = useState<string>("");
    const { currentUser } = useContext(CurrentUserContext);

    const handleAddNewComment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newComment: CommentType = {
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
            alert("Comment content cannot be empty");
            return;
        }

        props.addComment(newComment);
        setContent("");
    };

    return (
        <section className="new-comment">
            <div className="new-comment__photo">
                <img src={currentUser[0].image.png} alt="" className="new-comment__photo-user" />
            </div>
            <form name="newCommentForm" className="new-comment__form">
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    id="newCommentTextarea"
                    name="newCommentTextarea"
                    className="new-comment__textarea"
                    placeholder="Add a comment..."
                    maxLength={400}
                ></textarea>
                <Button buttonFunction={handleAddNewComment} category="form-action" className="new-comment__button">
                    Send
                </Button>
            </form>
        </section>
    );
};

export default AddNewComment;
