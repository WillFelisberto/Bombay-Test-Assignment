import React, { useEffect, useMemo } from 'react';
import { Checkbox, Form, Input, Modal, Select, Typography } from 'antd';
import { toast } from 'react-toastify';
const { Title } = Typography;

export default function GamesModal({ open, onCreate, onEdit, onCancel, valuesToEdit, isEditMode }) {
  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    return {
      name: valuesToEdit ? valuesToEdit.name : '',
      category: valuesToEdit ? valuesToEdit.category : '',
      language: valuesToEdit ? valuesToEdit.game_config.language : '',
      sound: valuesToEdit ? valuesToEdit.game_config.sound : false,
      created_at: valuesToEdit ? valuesToEdit.created_at : '',
    }
  }, [valuesToEdit]);


  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues, valuesToEdit]);

  return (
    <Modal
      open={open}
      title={isEditMode ? `Editing ${valuesToEdit.name}` : "Create a new game"}
      cancelText="Cancel"
      onCancel={onCancel}
      getContainer={false}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            isEditMode ? onEdit(values, valuesToEdit.id) : onCreate(values);
          })
          .catch(() => {
            toast.error('Failed to insert a new game!')
          });
      }}
    >
      <Form
        name="basic"
        form={form}
        initialValues={initialValues}
        onFinish={onCreate}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please insert the game name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please select a category!',
            },
          ]}
        >
          <Select
            required
            initialvalues="action"
            options={[
              { value: 'Action', label: 'Action' },
              { value: 'Action-adventure', label: 'Action-adventure' },
              { value: 'Role-playing', label: 'Role-playing' },
              { value: 'Simulation', label: 'Simulation' },
              { value: 'Strategy', label: 'Strategy' },
              { value: 'Sports', label: 'Sports' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Language"
          name="language"
          rules={[
            {
              required: true,
              message: 'Please select a language!',
            },
          ]}
        >
          <Select
            required
            initialvalues="action"
            options={[
              { value: 'Portuguese', label: 'Portuguese' },
              { value: 'English', label: 'English' },
              { value: 'Spanish', label: 'Spanish' },
              { value: 'Chinese', label: 'Chinese' },
            ]}
          />
        </Form.Item>
        <Title level={5}>Game Configs</Title>
        <Form.Item
          valuePropName="checked"
          label="Sound"
          name="sound"
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
};