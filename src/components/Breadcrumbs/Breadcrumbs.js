import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Breadcrumbs() {
  const router = useRouter().route;
  const finalRoute = router.replace(/\//g, "");
  return (
    <Breadcrumb style={{ textTransform: 'capitalize' }}
      items={[
        {
          title: <Link href="/">Home</Link>,
        },
        {
          title: finalRoute,
        }
      ]}
    />
  )

}