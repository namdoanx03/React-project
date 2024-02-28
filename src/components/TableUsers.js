import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from "lodash"

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0); 
    const[ totalPages, setTotalPages] = useState(0)

    const [isShowModalAdddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEdit,setIsShowModalEdit] = useState(false)
    const [dataUserEdit, setDataUserEdit] =  useState('')

    const handleClose = () => {
      setIsShowModalAddNew(false)
      setIsShowModalEdit(false)
    }
    const handleUpdateTable = (user) => {
        setListUsers([user,...listUsers])
    } 
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name
        setListUsers(cloneListUsers)
    }

    useEffect(() => {
        //call api
        getUsers(1)
    }, [])
    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if (res && res.data) {
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    }

    
    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEdit(true)
    }

    return (
        <>
        <div className='my-3 add-new'>
            <span><b>List Users:</b></span>
            <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}
            >Add New User</button>
          </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3'
                                        onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew
          show={isShowModalAdddNew}
          handleClose={handleClose}
          handleUpdateTable = {handleUpdateTable}
        />
        <ModalEditUser
            show={isShowModalEdit}
            dataUserEdit={dataUserEdit}
            handleClose={handleClose}
            handleEditUserFromModal={handleEditUserFromModal}
                       
        />
        </>
    )
}

export default TableUsers