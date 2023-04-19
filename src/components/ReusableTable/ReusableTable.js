import { Button, Input, DatePicker, Popconfirm, Space, Table } from 'antd';
import { useState, useRef } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import styles from '@/components/ReusableTable/ReusableTable.module.css';

export default function ReusableTable({ refDel, refEdit, type, data, handleDelete, handleEdit }) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex, clearFilters) => {
    if (selectedKeys[0] === null) {
      clearFilters();
      setSearchText('');
      confirm();
    } else {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    }
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const getColumnSearchPropsByDate = (dataIndex) => ({

    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div style={{ maxWidth: '300px' }}>

          <DatePicker.RangePicker
            style={{ margin: 5 }}
            value={selectedKeys[0]}
            popupClassName={styles.responsiveRangePicker} // Definir uma classe personalizada para o dropdown
            onChange={e => setSelectedKeys(e ? [e] : [])}
            onPressEnter={() => {
              confirm(); setSearchText(selectedKeys[0]), setSearchedColumn(dataIndex);
            }} />

          <Space style={{ margin: 5 }}>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex, clearFilters)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
          </Space>
        </div>

      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const formatDate = (date) => moment(new Date(date), "DD/MM/YYYY")
      const dateNow = formatDate(record[dataIndex]);
      const dataInicio = formatDate(value[0]);
      const dataFim = formatDate(value[1]);
      return record[dataIndex] ? moment(dateNow).isBetween(dataInicio, dataFim, 'days', true) : false
    },
  });


  const columns = (type, dataSource) => {
    switch (type) {
      case 'games':
        return [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: '20%',
            filters: [
              { value: 'Action', text: 'Action' },
              { value: 'Action-adventure', text: 'Action-adventure' },
              { value: 'Role-playing', text: 'Role-playing' },
              { value: 'Simulation', text: 'Simulation' },
              { value: 'Strategy', text: 'Strategy' },
              { value: 'Sports', text: 'Sports' },
            ],
            onFilter: (value, record) => record.category.indexOf(value) === 0,
          },
          {
            title: 'Created date',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnSearchPropsByDate('created_at'),
            render: text => moment(text).format("DD/MM/YYYY")
          },
          {
            title: 'Actions',
            width: '10%',
            render: (_, record) =>
              dataSource.length >= 1 ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly'
                    }}>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                      <Button ref={refDel} type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button ref={refEdit} onClick={() => handleEdit(record.key)} type='primary' icon={<EditOutlined />} />
                  </div>
                </>
              ) : null
          },
        ];
        break;
      case 'users':
        return [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address')
          }, {
            title: 'Actions',
            width: '10%',

            render: (_, record) =>
              dataSource.length >= 1 ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly'
                    }}>

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                      <Button ref={refDel} type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button ref={refEdit} onClick={() => handleEdit(record.key)} type='primary' icon={<EditOutlined />} />
                  </div>
                </>
              ) : null
          },
        ];
      default:
        break;
    }

  }

  return (
    <Table pagination={{ pageSize: 5 }} style={{ overflowX: 'auto' }} columns={columns(type, data)} dataSource={data} />
  )
};