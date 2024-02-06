import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import './react-calendar-heatmap.css';
import { Tooltip } from 'react-tooltip';


const SubmissionCalender = ({submissionsDate}) => {
  return (
    <div className='w-full shadow-md shadow-black'>
    <CalendarHeatmap
  startDate={new Date('2023-12-31')}
  endDate={new Date('2024-12-31')}
  values={submissionsDate}
  showWeekdayLabels={true}
  monthLabels = {[" JAN", " FEB", " MARCH", " APRIL", " MAY" , " JUNE", " JULY", " AUG", " SEP", " OCT", " NOV", " DEC"]}
  weekdayLabels ={ ["S", "M", "T", "W", "T", "F", "S"]}
  tooltipDataAttrs={(value) => ({
        'data-tip': `${value.date}: ${value.count} contributions`,
      })}
  classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if(value.count > 4){
            return `color-github-${4}`;
          }
          return `color-github-${value.count}`;
        }}
        // showOutOfRangeDays = {true}
/>
{/* <Tooltip/> */}
    </div>
  )
}

export default SubmissionCalender