import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Spinner() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Spin size='large' indicator={<LoadingOutlined
        style={{
          fontSize: 42,
        }}
        spin
      />} />
    </div>
  )

}