import { Card, Col, Row, Statistic } from 'antd';
import Icon, { UserOutlined } from '@ant-design/icons';
import JoystickSVG from '@/assets/svg/joystick-icon.svg'

export default function StatisticCard({ data }) {
  const JoystickIcon = (props) => <Icon component={JoystickSVG} {...props} />;

  const icon = type => {
    switch (type) {
      case 'games':
        return <JoystickIcon />;
      case 'users':
        return <UserOutlined />;
      default:
        break;
    }
  };

  return (
    <Row gutter={16}>
      {data && data.map(el => (
        <Col key={el.name} span={12}>
          <Card bordered={true}>
            <Statistic
              style={{ textTransform: 'capitalize' }}
              title={`Active ${el.name}`}
              value={el.quantity}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={icon(el.name)}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
