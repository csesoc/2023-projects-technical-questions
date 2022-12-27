/* eslint-disable react/jsx-key */

import { useState } from 'react';
import AlertModal from '../AlertModal';
import styles from './Table.module.css';

interface AlertOccurance {
  date: string,
  anomaly: string
}

interface Alert {
  alertType: string,
  alertText: string,
  alertOccurence: AlertOccurance[]
}

export interface TableContents {
  columnTitles: string[],
  rowContents: Alert[]
}

export default function Table() {
  const [contents, useContents] = useState<TableContents>({
    columnTitles: ['Alert', 'Issue', 'Occurences'],
    rowContents: [
      {
        alertType: 'food',
        alertText: 'good!',
        alertOccurence: []
      },
      {
        alertType: 'water',
        alertText: 'low',
        alertOccurence: [{anomaly: 'dropped to 10% below normal', date: '11/11/2022'}]
      },
      {
        alertType: 'shelter',
        alertText: 'terrible :(',
        alertOccurence: [{anomaly: 'slept on cold ground', date: '11/11/2022'}, {anomaly: 'slept on hard concrete', date: '13/11/2022'}]
      },
      {
        alertType: 'Done!',
        alertText: '<YOUR NAME>',
        alertOccurence: []
      }
    ]
  })
  return (
    <>
      <AlertModal useContents={useContents}/>
      <div className={styles.myTable}>
        <div className={styles.row}>
          {contents.columnTitles.map((item) => <div className={styles.item} key={item}>{item}</div>)}
        </div>
        {contents.rowContents.map((content) => (
          <div data-testid='row' className={styles.row}>
            <div className={styles.item}>
              {content.alertType}
            </div>
            <div className={styles.item}>
              {content.alertText}
            </div>
            <div className={styles.item}>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
