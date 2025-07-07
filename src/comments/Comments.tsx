import "./Comments.styles.css";
import Comment, { CommentType } from "../comment/Comment";
import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import AddNewComment from "../addNewComment/AddNewComment";
import CurrentUserContext from "../contexts/CurrentUserContext";
import data from "../data.json";

const Comments = () => {
    const [comments, setComments] = useState([] as CommentType[]);
    const { currentUser } = useContext(CurrentUserContext);

    useLayoutEffect(() => {
        const getFromLocalStorage = () => {
            const localStorageData = localStorage.getItem("data");
            const dataFromLocalStorage = JSON.parse(localStorage.getItem("data") || "[]");

            if (localStorageData) {
                setComments(dataFromLocalStorage);
            } else {
                setComments(data.comments);
            }
        };

        getFromLocalStorage();
    }, []);

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(comments));
    }, [comments]);

    const updateComment = (newComment: CommentType) => {
        const newComments = comments.map((comment) => {
            if (comment.id === newComment.id) {
                return newComment;
            }

            return comment;
        });

        setComments(newComments);
    };

    const updateReply = (newReply: CommentType, commentId: string) => {
        const comment = comments.find((comment) => comment.id === commentId);

        if (!comment?.replies?.length) {
            return;
        }

        const newReplies = comment.replies.map((reply) => {
            if (reply.id === newReply.id) {
                return newReply;
            }

            return reply;
        });

        const newComment: CommentType = {
            ...comment,
            replies: newReplies,
        };

        updateComment(newComment);
    };

    const updateAfterCommentDelete = (id: string) => {
        const updateCommentBase = comments.filter((comment) => comment.id !== id);

        setComments(updateCommentBase);
    };

    const updateAfterReplyDelete = (replyId: string, commentId: string) => {
        const comment = comments.find((comment) => comment.id === commentId);

        if (!comment?.replies?.length) {
            return;
        }

        const newReplies = comment.replies.filter((reply) => reply.id !== replyId);
        const newComment: CommentType = {
            ...comment,
            replies: newReplies,
        };

        updateComment(newComment);
    };

    const addNewReplyToComment = (newReply: CommentType, commentId: string) => {
        const comment = comments.find((comment) => comment.id === commentId);

        if (!comment) return;

        const commentWithNewReply: CommentType = {
            ...comment,
            replies: [...(comment.replies || []), newReply],
        };

        updateComment(commentWithNewReply);
    };

    const addNewComment = (newComment: CommentType) => {
        setComments([...comments, newComment]);
    };

    return (
        <div className="comments">
            {comments.map((comment) => {
                return (
                    <React.Fragment key={comment.id}>
                        <Comment
                            key={comment.id}
                            comment={comment}
                            updateComment={updateComment}
                            updateAfterDelete={updateAfterCommentDelete}
                            addNewReply={(newReply) => addNewReplyToComment(newReply, comment.id)}
                        />
                        {comment.replies?.length
                            ? comment.replies.map((reply) => (
                                  <Comment
                                      key={reply.id}
                                      comment={reply}
                                      isReply={true}
                                      updateComment={(newComment) => updateReply(newComment, comment.id)}
                                      updateAfterDelete={() => updateAfterReplyDelete(reply.id, comment.id)}
                                  />
                              ))
                            : ""}
                    </React.Fragment>
                );
            })}
            {currentUser?.length ? <AddNewComment addComment={addNewComment} /> : ""}
        </div>
    );
};

export default Comments;
