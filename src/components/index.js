import React, { useEffect,useState } from 'react';
import { Col, Button, Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMaintenance } from '../redux/actions/maintenance';
import CloseMaintenance from '../common/CloseMaintenance';
import dateFormate from 'dateformat';

const Home = () => {
    const dispatch = useDispatch();
    const maintenance = useSelector((state) => state.maintenance);
    
    const [show, setShow] = useState(false);
    const [selectMaintenance, setSelectMaintenance] = useState({})

    useEffect(() => {
        dispatch(fetchMaintenance())
    }, [])

    const toggle = (item) => {
      setShow(!show);
      setSelectMaintenance(item)
    }
  
    return (
        <div>  <Col className="card section_filter_list_wrap">
            <header className="card-header">
                <div className="d-inline" style={{float:"right"}}>
                    <Link to="/add-maintenance">
                        <Button className="btn btn-success">Create Maintenance</Button>
                    </Link>
                </div>
            </header>
            <div className="section_list_table container">
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>UnitNumber</th>
                            <th>ServiceType</th>
                            <th>Summary</th>
                            <th>Details</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            maintenance?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span>{item?.name}</span>
                                        </td>
                                        <td>
                                            <span>{item?.email}</span>
                                        </td>
                                        <td>
                                            <span>{item.unitNumber}</span>
                                        </td>
                                        <td>
                                            <span>{item?.serviceType}</span>
                                        </td>
                                        <td>
                                            <span>{item?.summary}</span>
                                        </td>
                                        <td>
                                            <span>{item?.details}</span>
                                        </td>
                                        <td>
                                            <span>{dateFormate(item?.createdAt,"yyyy mmmm dS, h:MM:ss TT")}</span>
                                        </td>
                                        <td>
                                            {
                                                item?.status ? 
                                                    <Button className='btn btn-success' onClick={() => toggle(item)}>Active</Button>
                                                :
                                                <Button className='btn btn-danger' disabled>Close</Button>  
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <CloseMaintenance show={show} toggle={toggle} setshow={setShow} selectMaintenance={selectMaintenance} />
        </Col>
        </div>
    )
}

export default Home