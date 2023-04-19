import { useEffect, useMemo } from 'react';
import StatisticCard from '@/components/Statistic/Statistic';
import { Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '@/store/dashboard/actions';
import Spinner from '@/components/Spinner/Spinner';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';

const { Title } = Typography;
export default function Dashboard() {
  const dataDashboard = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  const cardData = useMemo(() => {
    if (dataDashboard.data.totals) {
      const { totals } = dataDashboard.data;
      const processedArray = Object.entries(totals).map(([name, quantity]) => {
        return { name: `${name}`, quantity };
      });
      return processedArray;
    }
  }, [dataDashboard]);

  if (!dataDashboard.loaded && dataDashboard.loading && dataDashboard.data === 0) {
    return <Spin />;
  }

  return (
    <>
      <Title level={2}>Dashboard</Title>
      {dataDashboard.loading && !dataDashboard.loaded && !dataDashboard.error ? (
        <Spinner />
      ) : dataDashboard.loaded && !dataDashboard.error ? (
        <StatisticCard data={cardData} />
      ) : (
        <ErrorComponent message={dataDashboard.message} />
      )}
    </>
  )
};
