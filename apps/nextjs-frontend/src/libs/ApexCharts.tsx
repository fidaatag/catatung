import dynamic from 'next/dynamic';

const Chart = dynamic(async () => import('react-apexcharts'), {ssr: false});

export default Chart;
