/* eslint-disable react/jsx-key */

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

interface TableContents {
  columnTitles: string[],
  rowContents: Alert[]
}

interface TableProps {
  contents: TableContents
}

export default function Table({ contents }: TableProps) {
  return (
    <div className={styles.myTable}>
      <div className={styles.row}>
        {contents.columnTitles.map((item) => <div className={styles.item} key={item}>{item}</div>)}
      </div>
      {contents.rowContents.map((content) => (
        <div className={styles.row}>
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
  )
}
