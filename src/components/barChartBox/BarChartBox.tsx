import './barChartBox.scss'
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
  title: string
  color: string
  dataKey: string
  chartData: object[]
}
const BarChartBox = (props:Props) => {
  return (
    <div className='barChartBox'>
          <h1>{props.title}</h1>
      <div className="chart">
      <ResponsiveContainer width="99%" height={150}>
        <BarChart data={props.chartData}>
          <Tooltip 
            contentStyle={{borderRadius : "5px" , backgroundColor : "#2a3447" }}
            labelStyle={{display : "none"}}
            cursor={{fill : "transparent"}}
            />
          <Bar dataKey={props.dataKey} fill={props.color} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartBox