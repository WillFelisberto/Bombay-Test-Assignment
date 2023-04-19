import React, { useEffect, useMemo } from 'react';
import { Form, Input, Modal, Select, Typography } from 'antd';
import { toast } from 'react-toastify';
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
const { Title } = Typography;

export default function UsersModal({ open, onCreate, onEdit, onCancel, valuesToEdit, isEditMode }) {
  const [form] = Form.useForm();
  const initialValues = useMemo(() => {
    return {
      first_name: valuesToEdit ? valuesToEdit.first_name : '',
      last_name: valuesToEdit ? valuesToEdit.last_name : '',
      email: valuesToEdit ? valuesToEdit.email : '',
      street: valuesToEdit ? valuesToEdit.user_data.street : '',
      state: valuesToEdit ? valuesToEdit.user_data.state : '',
      city: valuesToEdit ? valuesToEdit.user_data.city : '',
      country: valuesToEdit ? valuesToEdit.user_data.country : '',
      zipCode: valuesToEdit ? valuesToEdit.user_data.zipCode : '',
    }
  }, [valuesToEdit]);

  countries.registerLocale(enLocale);
  var countriesObj = countries.getNames('en', { select: 'official' });

  var countriesSelectOptions = Object.entries(countriesObj).map(([value]) => {
    return {
      label: value,
      value: value
    }
  })

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  useEffect(() => {
    if (form && open) {
      form.resetFields();
    }
  }, [form, open]);

  return (
    <Modal
      open={open}
      title={isEditMode ? `Editing ${valuesToEdit.name}` : "Create a new user"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            isEditMode ? onEdit(values, valuesToEdit.id) : onCreate(values);
          })
          .catch(() => {
            toast.error('Failed save')
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
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please insert your first name.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please insert your last name.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please insert a valid email.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Title level={5}>Address</Title>
        <Form.Item
          label="Street"
          name="street"
          rules={[
            {
              required: true,
              message: 'Please insert a street name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ZipCode"
          name="zipCode"
          rules={[
            {
              required: true,
              message: 'Please insert your zipCode name.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: 'Please insert your city name.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[
            {
              required: true,
              message: 'Please insert your state name.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
              message: 'Please insert your country name.',
            },
          ]}
        >
          <Select
            required
            showSearch
            options={countriesSelectOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
