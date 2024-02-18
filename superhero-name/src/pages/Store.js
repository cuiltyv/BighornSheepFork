import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from 'react';

function Store() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
            <div className="Store">
                <h1>Tienda</h1>
                <p>Compra a Batmam</p>
                <img
                    src="../images/batman.jpg"
                    alt="Batman"
                    height="300" />
                <Button variant="primary" size="lg" onClick={handleShow}>
                    Compra ahora
                </Button>

                <p>Compra a Superman</p>
                <img src="../images/superman.png" alt="Superman" height="300" />
                <Button variant="primary" size="lg" onClick={handleShow}>
                    Compra ahora
                </Button>




            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Compra Exitosa!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Felicidades!!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Store;