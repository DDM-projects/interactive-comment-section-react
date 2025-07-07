import { useState, useRef, useContext } from "react";
import "./Comment.styles.css";
import deleteIcon from "../assets/icon-delete.svg";
import replyIcon from "../assets/icon-reply.svg";
import editIcon from "../assets/icon-edit.svg";
import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
import ModalDelete from "../modal/ModalDelete";
import Button from "../button/Button";
import AddNewReply from "../addNewReply/AddNewReply";
import useOnClickOutside from "../hooks/useOnClickOutside";
import CurrentUserContext from "../contexts/CurrentUserContext";

export interface CommentType {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    user: {
        image: {
            png: string;
        };
        username: string;
    };
    votedBy: string[];
    edited: boolean;
    replies?: CommentType[];
    replyingTo?: string;
}

interface CommentProps {
    comment: CommentType;
    isReply?: boolean;
    updateComment: (newComment: CommentType) => void;
    updateAfterDelete: (id: string) => void;
    addNewReply?: (newReply: CommentType, id: string) => void;
}

const Comment = (props: CommentProps) => {
    const comment = props.comment;
    const isReply = props.isReply;
    const score = comment.score;
    const id = comment.id;

    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, () => setIsCommentEdited(false));

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
    const [isCommentEdited, setIsCommentEdited] = useState(false);
    const [commentContent, setCommentContent] = useState(comment.content);
    const { currentUser } = useContext(CurrentUserContext);

    const checkConditionsForScoresBtn =
        currentUser?.length && comment.user.username !== currentUser[0].username ? true : false;
    const checkConditionsForDeleteAndEditBtn =
        currentUser?.length && comment.user.username === currentUser[0].username ? true : false;
    const checkConditionsForReplyBtn = currentUser?.length && !isReply ? true : false;

    const changeScore = (score: number) => {
        if (comment.votedBy.includes(currentUser[0].id)) {
            return;
        }

        const newComment: CommentType = {
            ...comment,
            score: score,
            votedBy: [...comment.votedBy, currentUser[0].id],
        };

        props.updateComment(newComment);
    };

    const changeContent = (commentContent: string) => {
        if (commentContent === comment.content || commentContent.trim() === "") {
            return;
        }

        const newComment: CommentType = {
            ...comment,
            content: commentContent,
            edited: true,
        };

        setIsCommentEdited(false);
        props.updateComment(newComment);
    };

    const handleNewReply = (newReply: CommentType) => {
        props.addNewReply?.(newReply, comment.id);
        closeReplyForm();
    };

    const deleteElement = (id: string) => {
        closeDeleteModal();
        props.updateAfterDelete(id);
    };

    const openDeleteModal = () => {
        setIsDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalVisible(false);
    };

    const openReplyForm = () => {
        setIsReplyFormVisible(true);
    };

    const closeReplyForm = () => {
        setIsReplyFormVisible(false);
    };

    const openEditForm = () => {
        setIsCommentEdited(true);
    };

    return (
        <>
            {isDeleteModalVisible && (
                <ModalDelete closeModal={closeDeleteModal} updateAfterDelete={() => deleteElement(id)} />
            )}
            <div className={isReply ? "reply" : "comment"} ref={ref}>
                <aside className="comment__scores">
                    {checkConditionsForScoresBtn && (
                        <Button
                            buttonFunction={() => changeScore(score + 1)}
                            category="score"
                            className="comment__scores-plus"
                        >
                            <img src={plusIcon} alt="" className="comment__icon" />
                        </Button>
                    )}
                    <div className="comment__score">
                        <p>{comment.score}</p>
                    </div>
                    {checkConditionsForScoresBtn && (
                        <Button
                            buttonFunction={() => changeScore(score - 1)}
                            category="score"
                            className="comment__scores-minus"
                        >
                            <img src={minusIcon} alt="" className="comment__icon" />
                        </Button>
                    )}
                </aside>
                <main className="comment__main">
                    <header className="comment__header">
                        <div className="comment__title">
                            <div className="comment__photo">
                                <img src={comment.user.image.png} alt="" className="comment__photo-user" />
                            </div>
                            <div className="comment__name">
                                <p>{comment.user.username}</p>
                            </div>
                            <div className="comment__date">
                                <p>{comment.createdAt}</p>
                            </div>
                            {comment.edited && (
                                <div className="comment__edited-info">
                                    <p>Edited</p>
                                </div>
                            )}
                        </div>
                        <div className="comment__buttons">
                            {(checkConditionsForDeleteAndEditBtn || currentUser[0]?.id === "0") && (
                                <Button
                                    buttonFunction={openDeleteModal}
                                    category="comment-action"
                                    className="comment__button-delete"
                                >
                                    <img src={deleteIcon} alt="" className="comment__delete-icon" />
                                    <p className="comment__delete-text">Delete</p>
                                </Button>
                            )}
                            {checkConditionsForReplyBtn && (
                                <Button
                                    buttonFunction={openReplyForm}
                                    category="comment-action"
                                    className="comment__button-reply"
                                >
                                    <img src={replyIcon} alt="" className="comment__reply-icon" />
                                    <p className="comment__reply-text">Reply</p>
                                </Button>
                            )}

                            {checkConditionsForDeleteAndEditBtn && (
                                <Button
                                    buttonFunction={openEditForm}
                                    category="comment-action"
                                    className="comment__button-edit"
                                >
                                    <img src={editIcon} alt="" className="comment__edit-icon" />
                                    <p className="comment__edit-text">Edit</p>
                                </Button>
                            )}
                        </div>
                    </header>
                    <div className="comment__content">
                        {isCommentEdited ? (
                            <>
                                <textarea
                                    className="comment__textarea"
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    maxLength={400}
                                >
                                    {comment.content}
                                </textarea>
                                <div className="comment__div">
                                    <Button
                                        buttonFunction={() => changeContent(commentContent)}
                                        category="form-action"
                                        className="comment__button-update"
                                    >
                                        Update
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>{comment.content}</p>
                        )}
                    </div>
                </main>
            </div>

            {isReplyFormVisible && !props.isReply ? (
                <AddNewReply closeReplyForm={closeReplyForm} addReply={handleNewReply} />
            ) : (
                ""
            )}
        </>
    );
};
export default Comment;
