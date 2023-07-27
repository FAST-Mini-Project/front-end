import style from './AdminAnnual.module.scss';
import { dummyData2 } from '@/dummy/DummyData';
import { useState } from "react";

type Data = {
  statusCode: number;
  data: {
    annualId: number;
    name: string;
    employeeNumber: string;
    date: string;
    status: string;
  }[];
};

const AdminAnnual = () => {
  const [data, setData] = useState<Data>({
    statusCode: 200,
    data: dummyData2.data});

  const handleApprove = (annualId) => {
    console.log(`승인 버튼 클릭: ${annualId}`);
  };

  const handleReject = (annualId) => {
    console.log(`거부 버튼 클릭: ${annualId}`);
  };

  return (
    <section className={style.container}>
      <div className={style.contentWrapper}>
        <h2>신청 목록</h2>
        <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>사원명</th>
              <th>신청 날짜</th>
              <th>승인/거부</th>
            </tr>
          </thead>
          <tbody>
            {data.data
              .filter((item) => item.status === 'UNAPPROVED')
              .map((employee) => (
                <tr key={employee.annualId}>
                  <td>
                    {employee.name} {employee.employeeNumber}
                  </td>
                  <td>{employee.date}</td>
                  <td>
                    <button
                      className={style.approve}
                      onClick={() => handleApprove(employee.annualId)}
                    >
                      승인
                    </button>
                    <button
                      className={style.delete}
                      onClick={() => handleReject(employee.annualId)}
                    >
                      거부
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>

        <h2>취소 신청 목록</h2>
        <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>사원명</th>
              <th>신청 날짜</th>
              <th>승인/거부</th>
            </tr>
          </thead>
          <tbody>
            {data.data
              .filter((item) => item.status === 'CANCELED')
              .map((employee) => (
                <tr key={employee.annualId}>
                  <td>
                    {employee.name} {employee.employeeNumber}
                  </td>
                  <td>{employee.date}</td>
                  <td>
                    <button
                      className={style.approve}
                      onClick={() => handleApprove(employee.annualId)}
                    >
                      승인
                    </button>
                    <button
                      className={style.delete}
                      onClick={() => handleReject(employee.annualId)}
                    >
                      거부
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
};

export default AdminAnnual;
