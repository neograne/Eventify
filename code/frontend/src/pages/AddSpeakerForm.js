import React from "react";

const AddSpeaker = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    console.log("Создание митинга:", {  });
    // Здесь можно добавить логику для отправки данных на сервер
  };

  return (
    <div style={styles.container}>
      <h2>Добавление участников</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Организатор:
          </label>
          <input
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Спикер:
          </label>
          <input
            style={styles.input}
            required
          />
          </div>
        <button type="submit" style={styles.button}>
          Создать
        </button>

        
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    width: "95%",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AddSpeaker;