import React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { useDispatch } from "react-redux";
import { XCircle, } from 'react-feather'
import { toast } from 'react-toastify'
import ToastComponent from '../common/Toast';
import { fetchMaintenance, updateMaintenance } from '../redux/actions/maintenance';
// import { fetchSection, deleteSection } from "../redux/action";


const CloseMaintenance = ({ show, toggle, setshow, selectMaintenance }) => {
    const dispatch = useDispatch();

    const closemaintenance = async () => {
        const result = await dispatch(updateMaintenance(selectMaintenance?._id));
        if (result?.payload?.success) {
            toast.success(<ToastComponent title={result.payload?.message} color='success' />, {
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false
            })
            await dispatch(fetchMaintenance());
            setshow(false)
        } else {
            toast.error(<ToastComponent title={result?.errors} color='danger' />, {
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false
            })
        }
    };

    return (
        <Modal isOpen={show} fade={false} toggle={toggle} centered>
            <ModalBody>
                <XCircle size={50} color={'#e55353'} className="remove_icon" />
                <h5 className='text-center mt-4'>Are you sure close Maintenance?</h5>
                <div className='all-center mt-4'>
                    <Button outline className="me-4 btn btn-danger" onClick={() => setshow(false)}>No</Button>
                    <Button color="primary" onClick={closemaintenance}>Yes</Button>
                </div>
            </ModalBody>
        </Modal>
    )
};

export default CloseMaintenance;