import "./Modal.styles.css";
import Button from "../button/Button";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { useRef } from "react";

interface ModalProps {
    closeModal: () => void;
    updateAfterDelete?: () => void;
}

const ModalDelete = (props: ModalProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(ref, () => {
        props.closeModal();
    });

    return (
        <>
            <div className="cover"></div>

            <section className="modal-delete" ref={ref}>
                <h1 className="modal-delete__header">Delete comment</h1>
                <div className="modal-delete__text">
                    Are you sure you want to delete this comment? This will remove the comment and can't be undone.
                </div>
                <div className="modal-delete__buttons">
                    <Button buttonFunction={props.closeModal} category="delete-no" className="modal-delete__button-no">
                        No, cancel
                    </Button>
                    <Button
                        buttonFunction={() => props.updateAfterDelete?.()}
                        category="delete-yes"
                        className="modal-delete__button-yes"
                    >
                        Yes, delete
                    </Button>
                </div>
            </section>
        </>
    );
};

export default ModalDelete;
