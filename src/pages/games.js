import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Button, Typography, Tour, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { createGame, deleteGame, editGame, requestGames } from '@/store/games/actions';
import styles from '@/styles/default.module.css';
import { toast } from 'react-toastify';
import ReusableTable from '@/components/ReusableTable/ReusableTable';
import { getArrayById } from '@/utils';
import GamesModal from '@/components/GamesModal/GamesModal';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';
import Spinner from '@/components/Spinner/Spinner';

const { Title } = Typography;

export default function Games() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valuesToEdit, setValuesToEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const refAdd = useRef(null);
  const refEdit = useRef(null);
  const refDel = useRef(null);
  const [showTour, setShowTour] = useState(false);

  const steps = [
    {
      title: 'Welcome to the Games tab',
      description: "It's your first time on this page, would you like a little tour to understand how everything works?",
    },
    {
      title: 'Register a new game',
      description: '"Add New" is a button that allows users to create a new game entry on the platform. By clicking "Add New", users can fill in a form with relevant information about the game, such as game name, description, and category.',
      target: () => refAdd.current,
    },
    {
      title: 'Edit an existing game',
      description: '"Edit" is a feature that enables users to modify an existing game entry on the platform. When users click on "Edit", they can access a form pre-filled with the existing information of the game, allowing them to make changes or updates as needed. This feature allows users to edit details such as game name, description, category, and other relevant information.',
      target: () => refEdit.current,
    },
    {
      title: 'Delete an existing game',
      description: '"Delete" is a function that allows users to remove a game entry from the platform. By selecting the "Delete" option, users can permanently delete the game entry and all associated information from the platforms database. This irreversible action removes the game entry from the platform, including any user-generated content or associated data',
      target: () => refDel.current,
    },
  ];


  useEffect(() => {
    dispatch(requestGames());
  }, [dispatch]);

  const columnsData = useMemo(() => {
    if (games.data.length > 0)
      return games.data.map(el => {
        return {
          key: el.id,
          name: el.name,
          created_at: el.created_at,
          category: el.category
        }
      });
  }, [games.data]);


  const onCreate = useCallback((values) => {
    var dataToSave = {
      "created_at": new Date().toISOString(),
      "name": values.name,
      "category": values.category,
      "game_config": {
        "language": values.language,
        "sound": values.sound === undefined ? false : values.sound
      }
    }
    dispatch(createGame(dataToSave))
    toast.success('Game created successfully.');
    setIsModalOpen(false);
  }, [dispatch]);

  const onEdit = useCallback((values, id) => {
    var dataToSave = {
      "name": values.name,
      "created_at": new Date().toISOString(),
      "category": values.category,
      "game_config": {
        "language": values.language,
        "sound": values.sound === undefined ? false : values.sound
      }
    }
    dispatch(editGame(dataToSave, id))
    toast.success('Game changed!');
    setIsModalOpen(false);
  }, [dispatch]);


  const handleDelete = useCallback((data) => {
    dispatch(deleteGame(data))
  }, [dispatch]);

  const handleEdit = useCallback((id) => {
    const data = getArrayById(games.data, id)
    setValuesToEdit(data);
    setIsModalOpen(true);
    setEditMode(true)
  }, [games.data]);

  useEffect(() => {
    const visitedSections = localStorage.getItem('visitedSections');
    const parsedVisitedSections = JSON.parse(visitedSections) || {};
    if (!parsedVisitedSections.hasVisitedGames) {
      setShowTour(true);
      parsedVisitedSections.hasVisitedGames = true;
    }
    localStorage.setItem('visitedSections', JSON.stringify(parsedVisitedSections));
  }, []);


  return (
    <>
      <Title level={2}>Games</Title>
      {games.loading && !games.loaded && !games.error ? (
        <Spinner />
      ) : games.loaded && !games.error ? (
        <>
          {showTour && (
            <Col  >
              <Tour style={{ width: '100%' }} open={true} onClose={() => setShowTour(false)} steps={steps} />
            </Col>
          )}

          <GamesModal
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


          <ReusableTable refDel={refDel} refEdit={refEdit} handleEdit={handleEdit} handleDelete={handleDelete} type={'games'} data={columnsData} />
        </>
      ) : (
        <ErrorComponent message={games.message} />
      )
      }
    </>
  );
}
