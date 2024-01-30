import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import './react-calendar-heatmap.css';



const SubmissionCalender = () => {
  return (
    <div className='w-full shadow-md shadow-black'>
    <CalendarHeatmap
  startDate={new Date('2023-12-31')}
  endDate={new Date('2024-12-31')}
  values={[
    { date: '2024-01-01', count: 2 },
    { date: '2024-01-02', count: 1 },
    { date: '2024-01-03', count: 3 },
    { date: '2024-01-04', count: 3 },
    { date: '2024-01-05', count: 2 },
    { date: '2024-01-07', count: 2 },
    { date: '2024-01-12', count: 3 },
    { date: '2024-01-30', count: 4 },
    { date: '2024-12-30', count: 4 },
  ]}
//   showWeekdayLabels={true}
  monthLabels = {[" JAN", " FEB", " MARCH", " APRIL", " MAY" , " JUNE", " JULY", " AUG", " SEP", " OCT", " NOV", " DEC"]}
//   weekdayLabels ={ ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]}
  tooltipDataAttrs={{'data-tooltip' : 'tooltip'}}
  classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        // showOutOfRangeDays = {true}
/>
{/* <ReactTooltip/> */}
    </div>
  )
}

export default SubmissionCalender