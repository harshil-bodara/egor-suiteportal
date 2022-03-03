import React from 'react'
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import ToastComponent from '../common/Toast';
import { createMaintenance } from '../redux/actions/maintenance'

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    unitNumber: Yup.string().required("Unit number is required"),
    serviceType: Yup.string().required("Service type is required"),
    summary: Yup.string().required("Summary is required"),
    details: Yup.string().required("Details is required"),
});


const AddMaintenance = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    

    const onSubmitHandler = async (data) => {
        const result = await dispatch(createMaintenance(data));
        if (result?.payload?.success) {
            toast.success(<ToastComponent title={result?.payload?.message} color='success' />, {
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false
            })
            window.location.href = "/"
          }
          else {
              console.log("result",result)
            toast.error(<ToastComponent title={result?.payload?.error} color='danger' />, {
              autoClose: 3000,
              hideProgressBar: true,
              closeButton: false
            })
          }  
    }

    return (
        <div>
            <div className="App">
                <h4 className='text-center' style={{fontFamily:"cursive"}}>Create Maintenance</h4>
                <from>
                    <div className="card-body">
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Name</span>
                                    </div>
                                    <input
                                        type="text" className="form-control" id="basic-url" placeholder="Name" {...register("name")} required aria-describedby="basic-addon3" />
                                </div>
                                <span className="text-danger">{errors?.name?.message}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Email</span>
                                    </div>
                                    <input
                                        type="text" className="form-control" id="basic-url" placeholder="Email" {...register("email")} required aria-describedby="basic-addon3" />
                                </div>
                                <span className="text-danger">{errors?.email?.message}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Unit Number</span>
                                    </div>
                                    <input
                                        type="number" className="form-control" id="basic-url" placeholder="Unit Number" {...register("unitNumber")} required aria-describedby="basic-addon3" />
                                </div>
                                <span className="text-danger">{errors?.unitNumber?.message}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Service Type</span>
                                    </div>
                                    <input
                                        type="text" className="form-control" id="basic-url" placeholder="Service Type" {...register("serviceType")}  required aria-describedby="basic-addon3" />
                                </div>
                                <span className="text-danger">{errors?.serviceType?.message}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">summary</span>
                                    </div>
                                    <input
                                        type="text" className="form-control" id="basic-url" placeholder="Summary" {...register("summary")} required aria-describedby="basic-addon3" />
                                </div>
                                <span className="text-danger">{errors?.summary?.message}</span>
                            </div>
                        </div>
                        <div className="row my-2 mx-0">
                            <div className="col-sm-12 form-inline p-0 c-datatable-filter mb-3">
                                <div className="input-group">
                                    <textarea placeholder="Details" required aria-describedby="basic-addon3" {...register("details")} className='form-control'/>
                                </div>
                                <span className="text-danger">{errors?.details?.message}</span>
                            </div>
                        </div>
                        <div >
                            <button className="btn btn-secondary p-2">Cancel</button>
                            <button className="btn btn-primary p-2" style={{float:"right"}}  onClick={handleSubmit(onSubmitHandler)}>Create</button>
                        </div>
                    </div>
                </from>
            </div>
        </div>
    )
}

export default AddMaintenance