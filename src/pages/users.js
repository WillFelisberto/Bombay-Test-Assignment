import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Button, Typography, Tour, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { createUser, deleteUser, editUser, requestUser } from '@/store/users/actions';
import styles from '@/styles/default.module.css';
import { toast } from 'react-toastify';
import ReusableTable from '@/components/ReusableTable/ReusableTable';
import { getArrayById } from '@/utils';
import UsersModal from '@/components/UsersModal/UsersModal';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';
import Spinner from '@/components/Spinner/Spinner';
import Head from 'next/head';

const { Title } = Typography;

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [valuesToEdit, setValuesToEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const refAdd = useRef(null);
  const refEdit = useRef(null);
  const refDel = useRef(null);
  const [showTour, setShowTour] = useState(false);

  const steps = [
    {
      title: 'Welcome to the Users tab',
      description: "It's your first time on this page, would you like a little tour to understand how everything works?",
    },
    {
      title: 'Register a new user',
      description: '"Add New" is a button that allows users to create a new user entry on the platform. By clicking "Add New", users can fill in a form with relevant information about the user, such as user first name, last name, email and address.',
      target: () => refAdd.current,
    },
    {
      title: 'Edit an existing user',
      description: '"Edit" is a feature that enables users to modify an existing user entry on the platform. When users click on "Edit", they can access a form pre-filled with the existing information of the user, allowing them to make changes or updates as needed. This feature allows users to edit details such as user first name, last name, email, address and other relevant information.',
      target: () => refEdit.current,
    },
    {
      title: 'Delete an existing user',
      description: '"Delete" is a function that allows users to remove a user entry from the platform. By selecting the "Delete" option, users can permanently delete the user entry and all associated information from the platforms database. This irreversible action removes the game entry from the platform, including any user-generated content or associated data',
      target: () => refDel.current,
    },
  ];

  useEffect(() => {
    dispatch(requestUser());
  }, [dispatch]);

  const columnsData = useMemo(() => {
    if (users && users.data && users.data.length > 0)
      return users.data.map(el => {
        return {
          key: el.id,
          name: `${el.first_name} ${el.last_name}`,
          created_at: el.created_at,
          email: el.email,
          address: `${el.user_data.street}, ${el.user_data.city}, ${el.user_data.state} - ${el.user_data.country}`
        }
      });
  }, [users]);


  const onCreate = useCallback((values) => {
    var dataToSave = {
      "created_at": new Date().toISOString(),
      "first_name": values.first_name,
      "last_name": values.last_name,
      "email": values.email,
      "user_data": {
        "city": values.city,
        "street": values.street,
        "country": values.country,
        "state": values.state,
        "zipCode": values.zipCode
      }
    };
    dispatch(createUser(dataToSave))
    toast.success('User created successfully.');
    setIsModalOpen(false);
  }, [dispatch]);

  const onEdit = useCallback((values, id) => {
    //You have to pass created_at because of json-server
    var dataToSave = {
      "created_at": new Date().toISOString(),
      "first_name": values.first_name,
      "last_name": values.last_name,
      "email": values.email,
      "user_data": {
        "city": values.city,
        "street": values.street,
        "country": values.country,
        "state": values.state,
        "zipCode": values.zipCode
      }
    };

    dispatch(editUser(dataToSave, id))
    toast.success('User changed successfully!');
    setIsModalOpen(false);
  }, [dispatch]);


  const handleDelete = useCallback((data) => {
    dispatch(deleteUser(data))
  }, [dispatch]);

  const handleEdit = useCallback((id) => {
    const data = getArrayById(users.data, id)
    setValuesToEdit(data);
    setIsModalOpen(true);
    setEditMode(true)
  }, [users.data]);

  useEffect(() => {
    const visitedSections = localStorage.getItem('visitedSections');
    const parsedVisitedSections = JSON.parse(visitedSections) || {};
    if (!parsedVisitedSections.hasVisitedUsers) {
      setShowTour(true);
      parsedVisitedSections.hasVisitedUsers = true;
    }
    localStorage.setItem('visitedSections', JSON.stringify(parsedVisitedSections));
  }, []);


  return (
    <>
      <Head>
        <title>Games</title>
      </Head>
      <Title level={2}>Users</Title>
      {users.loading && !users.loaded && !users.error ? (
        <Spinner />
      ) : users.loaded && !users.error ? (
        <>
          {showTour && (
            <Col  >
              <Tour style={{ width: '100%' }} open={true} onClose={() => setShowTour(false)} steps={steps} />
            </Col>
          )}
          <UsersModal
            open={isModalOpen}
            onCreate={onCreate}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            onEdit={onEdit}
            isEditMode={editMode}
            valuesToEdit={valuesToEdit}
          />
          <div className={styles.addNewButtom} >
            <Button ref={refAdd} type="default" icon={<PlusOutlined />} onClick={() => {
              setValuesToEdit('')
              setIsModalOpen(true)
              setEditMode(false)
            }} size='large' >Add New</Button>
          </div>

          <ReusableTable
            refDel={refDel}
            refEdit={refEdit}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={columnsData}
            type={'users'}
          />
        </>
      ) : (
        <ErrorComponent message={users.message} />
      )
      }

    </>
  );
}
