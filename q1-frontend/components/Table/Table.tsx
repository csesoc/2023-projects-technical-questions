/* eslint-disable react/jsx-key */

import { useState } from 'react';
import AlertModal from '../AlertModal';
import styles from './Table.module.css';
// !!!!!!!!!!!!!!!!!!!!
// TODO is at line 68 !
// !!!!!!!!!!!!!!!!!!!!

interface AlertOccurrance {
  date: string,
  anomaly: string
}

interface Alert {
  alert: string,
  status: string,
  updates: AlertOccurrance[]
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
        alert: 'food',
        status: 'good!',
        updates: []
      },
      {
        alert: 'water',
        status: 'low',
        updates: [{anomaly: 'dropped to 10% below normal', date: '11/11/2022'}]
      },
      {
        alert: 'shelter',
        status: 'terrible :(',
        updates: [{anomaly: 'slept on cold ground', date: '11/11/2022'}, {anomaly: 'slept on hard concrete', date: '13/11/2022'}]
      },
      {
        alert: 'Done!',
        status: '<YOUR NAME>',
        updates: []
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
              {content.alert}
            </div>
            <div className={styles.item}>
              {content.status}
            </div>
            <div className={styles.item}>
              {/*TODO: add occurances*/}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
