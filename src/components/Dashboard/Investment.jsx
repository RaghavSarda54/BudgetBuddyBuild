import React from 'react';
import Dropdown from "./Dropdown";
import Custom from "./custom";
import styles from "./dashboard.module.css";
const Investment = (props) => {
  const current = new Date();
  const curdate = `${current.getFullYear()}-${current.getMonth()+1>'9'?current.getMonth()+1:'0'+(current.getMonth()+1)}-${current.getDate()>'9'?current.getDate():'0'+(current.getDate())}`;
  return (
    <div className={props.state === 3 ? styles.segment_active : styles.segment}>
              <form action="">
                <div className={styles.fields}>
                  <div className={styles.label_field}>
                    <label htmlFor="">From</label>
                    <Dropdown></Dropdown>
                  </div>
                  <div className={styles.input}>
                    <input
                      required
                      min="0.01"
                      step="0.01"
                      type="number"
                      className={styles.my_input}
                    />
                    <div className={styles.smalldrop}>
                      <Dropdown></Dropdown>
                    </div>
                  </div>
                </div>
                <div className={styles.transaction_grid}>
                  <div className={styles.transaction_grid_wide}>
                    <label htmlFor="tags">To</label>
                    <div className={styles.tags}>
                    <Dropdown></Dropdown>
                    </div>
                    <div className={styles.note}>
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Note"
                        className={styles.my_input}
                      />
                    </div>
                  </div>
                  <div className={styles.transaction_grid_narrow}>
                  <div className={styles.input}>
                    <input
                      required
                      min="0.01"
                      step="0.01"
                      type="number"
                      className={styles.my_input}
                    />
                    <div className={styles.smalldrop}>
                      <Dropdown></Dropdown>
                    </div>
                  </div>
                    <div className={styles.date_input}>
                      <input
                        type="date"
                        name="date_input"
                        value={curdate}
                        className={styles.my_input}
                      />
                    </div>
                    <div className={styles.add_expense}>
                      <button className={styles.add_expense_button}>
                        Add Income
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              </div>
  )
}

export default Investment