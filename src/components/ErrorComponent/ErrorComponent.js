import { Button, Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;

export default function ErrorComponent({ message }) {
  return (
    <Result
      status="error"
      title={message || "Error accessing a page"}
      extra={[
        <Button key='refresh' onClick={() => window.location.reload(true)} >Try Again</Button>,
      ]}
    >
      <div className="desc">
        <Paragraph style={{
          textAlign: 'center',
        }} >
          <Text
            strong
            style={{
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            If the problem persist, please contact the system administrator.
          </Text>
        </Paragraph>

      </div>
    </Result >
  )

}