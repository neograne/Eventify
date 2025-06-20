import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function Report() {
  const componentRef = useRef();

  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("id");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleDownloadPDF = () => {
    const element = componentRef.current;
    
    const scale = 2;
    
    html2canvas(element, { scale }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      
      const x = (pdfWidth - newWidth) / 2;
      const y = (pdfHeight - newHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', x, y, newWidth, newHeight);
      pdf.save(`report_${eventId}.pdf`);
    });
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/get_event_report/${eventId}`, { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }
        const data = await response.json();
        setReportData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchReport();
    }
  }, [eventId]);

  if (loading) {
    return <div style={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div style={styles.error}>Ошибка: {error}</div>;
  }

  if (!reportData) {
    return <div style={styles.error}>Нет данных для отображения</div>;
  }

  const { gender, age, course, direction, attendance, how_learned, rating } = reportData;

  // Calculate gender percentages
  const femalePercent = gender.total_participants > 0 
    ? Math.round((gender.female_count / gender.total_participants) * 100) 
    : 0;
  const malePercent = gender.total_participants > 0 
    ? Math.round((gender.male_count / gender.total_participants) * 100) 
    : 0;

  // Calculate age bar heights
  const ageGroups = [
    { male: age.under_18_male, female: age.under_18_female },
    { male: age.age_17_19_male, female: age.age_17_19_female },
    { male: age.age_20_22_male, female: age.age_20_22_female },
    { male: age.age_23_25_male, female: age.age_23_25_female },
    { male: age.age_26_28_male, female: age.age_26_28_female },
    { male: age.over_28_male, female: age.over_28_female }
  ];
  const maxAgeCount = Math.max(...ageGroups.flatMap(g => [g.male, g.female]));
  const ageBarStyles = ageGroups.map(group => ({
    male: { ...styles.barMale, height: maxAgeCount > 0 ? `${(group.male / maxAgeCount) * 70}%` : '0%' },
    female: { ...styles.barFemale, height: maxAgeCount > 0 ? `${(group.female / maxAgeCount) * 70}%` : '0%' }
  }));

  // Calculate course percentages
  const courseData = [
    { male: course.course_1_male, female: course.course_1_female },
    { male: course.course_2_male, female: course.course_2_female },
    { male: course.course_3_male, female: course.course_3_female },
    { male: course.course_4_male, female: course.course_4_female },
    { male: course.course_5_male, female: course.course_5_female }
  ];
  const coursePercentages = courseData.map(c => ({
    percent: gender.total_participants > 0 
      ? Math.round(((c.male + c.female) / gender.total_participants) * 100) 
      : 0,
    male: c.male,
    female: c.female
  }));

  // Calculate how_learned percentages
  const totalLearned = Object.values(how_learned).reduce((sum, count) => sum + count, 0);
  const learnedPercentages = {
    tg: totalLearned > 0 ? Math.round((how_learned.tg_channel_count / totalLearned) * 100) : 0,
    vk: totalLearned > 0 ? Math.round((how_learned.vk_group_count / totalLearned) * 100) : 0
  };

  return (
    <div style={styles.container} ref={componentRef}>
      <h2 style={styles.title}>Отчёт по мероприятию ID: {eventId}</h2>
      <div style={styles.flexContainer}>
        {/* Gender */}
        <div style={styles.section}>
          <h3>Пол</h3>
          <div style={styles.chartContainer}>
            <div style={{ ...styles.pieChart, background: `conic-gradient(#4285f4 0% ${malePercent}%, #db4437 ${malePercent}% 100%)` }}>
              <div style={styles.pieChartText}>{gender.female_count} {femalePercent}%</div>
            </div>
          </div>
          <p><span style={styles.textFemale}>Женщины</span> {gender.female_count} {femalePercent}%</p>
          <p><span style={styles.textMale}>Мужчины</span> {gender.male_count} {malePercent}%</p>
        </div>

        {/* Age */}
        <div style={styles.section}>
          <h3>Возраст</h3>
          <div style={styles.barChartContainer}>
            {ageBarStyles.map((bar, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                <div style={bar.male}></div>
                <div style={bar.female}></div>
              </div>
            ))}
          </div>
          <div style={styles.ageLabels}>
            <span>до 18</span><span>18-20</span><span>20-22</span><span>22-25</span><span>26-28</span><span>28+</span>
          </div>
          <p><span style={styles.textFemale}>Женщины</span></p>
          <p><span style={styles.textMale}>Мужчины</span></p>
        </div>

        {/* Course */}
        <div style={styles.section}>
          <h3>Курс обучения</h3>
          <table style={styles.table}>
            <tbody>
              {coursePercentages.map((c, index) => (
                <tr key={index}>
                  <td>{index + 1} курс</td>
                  <td>{c.percent}%</td>
                  <td>{c.male} чел.</td>
                  <td>{c.female} чел.</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><span style={styles.textFemale}>Женщины</span></p>
          <p><span style={styles.textMale}>Мужчины</span></p>
        </div>
      </div>

      <div style={{ ...styles.flexContainer, marginTop: '20px' }}>
        {/* Direction */}
        <div style={styles.section}>
          <h3>Направление</h3>
          <p>09 {direction.direction_09_percent}% {Math.round(direction.direction_09_percent * gender.total_participants / 100)} чел.</p>
          <p>02 {direction.direction_02_percent}% {Math.round(direction.direction_02_percent * gender.total_participants / 100)} чел.</p>
          <p>27 {direction.direction_27_percent}% {Math.round(direction.direction_27_percent * gender.total_participants / 100)} чел.</p>
          <p>52 {direction.direction_52_percent}% {Math.round(direction.direction_52_percent * gender.total_participants / 100)} чел.</p>
          <p>11 {direction.direction_11_percent}% {Math.round(direction.direction_11_percent * gender.total_participants / 100)} чел.</p>
        </div>

        {/* Attendance */}
        <div style={styles.section}>
          <h3>Процент явки</h3>
          <p>Зарегистрировались {attendance.registered} чел.</p>
          <p>Пришли {attendance.attended} чел.</p>
        </div>

        {/* How Learned */}
        <div style={styles.section}>
          <h3>Как узнали?</h3>
          <div style={styles.chartContainer}>
            <div style={{ ...styles.pieChart, background: `conic-gradient(#f1c40f 0% ${learnedPercentages.tg}%, #3498db ${learnedPercentages.tg}% 100%)` }}>
              <div style={styles.pieChartText}>{how_learned.tg_channel_count} {learnedPercentages.tg}%</div>
            </div>
          </div>
          <p><span style={styles.textHardLuck}>ТГ канал</span> {how_learned.tg_channel_count} {learnedPercentages.tg}%</p>
          <p><span style={styles.textEasyLuck}>ВК группа</span> {how_learned.vk_group_count} {learnedPercentages.vk}%</p>
        </div>
      </div>

      <div style={{ ...styles.flexContainer, marginTop: '20px' }}>
        {/* Rating */}
        <div style={styles.section}>
          <h3>Оценка участников</h3>
          <p>Проголосовали {rating.voted_count} чел.</p>
          <p>Средняя оценка {rating.average_rating.toFixed(1)}/10</p>
        </div>

        {/* Participants / Comments */}
        <div style={styles.section}>
          <button style={styles.button}>Участники</button>
          <button style={styles.buttonNoMargin}>Комментарии</button>
          <button onClick={handleDownloadPDF} style={{ marginTop: '20px' }}>
            Сохранить в PDF
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    border: '3px solid #20516F',
    borderRadius: '40px',
  },
  title: {
    textAlign: 'center',
    color: '#1a73e8'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  section: {
    flex: '1 1 200px',
    border: '1px solid #20516F',
    padding: '10px',
    borderRadius: '40px',
    textAlign: 'center'
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px'
  },
  pieChart: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    position: 'relative'
  },
  pieChartText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#333'
  },
  barChartContainer: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  ageLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  button: {
    marginRight: '10px',
    padding: '5px 10px',
    background: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  },
  buttonNoMargin: {
    padding: '5px 10px',
    background: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  },
  textFemale: {
    color: '#db4437'
  },
  textMale: {
    color: '#4285f4'
  },
  textHardLuck: {
    color: '#f1c40f'
  },
  textEasyLuck: {
    color: '#3498db'
  },
  error: {
    color: '#db4437',
    textAlign: 'center'
  },
  loading: {
    textAlign: 'center',
    color: '#666'
  }
};

export default Report;